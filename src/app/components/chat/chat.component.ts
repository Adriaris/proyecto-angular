import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from './message';
import { UserService } from 'src/app/services/user.service';
import { FriendService } from 'src/app/services/friend.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [UserService, FriendService]
})
export class ChatComponent {
  messages: Message[] = [];
  newMessage = '';
  friends: any[] = [];
  selectedFriend: any = null;
  public user: User;
  private intervalId: any;
  private messagesSubscription: Subscription | null = null;
  autoScroll = false;
  public loadingFriends = true;



  constructor(private userService: UserService, private friendService: FriendService, private chatService: ChatService) {
    this.user = new User();
  }

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const scrollHeight = this.myScrollContainer.nativeElement.scrollHeight;
    const scrollTop = this.myScrollContainer.nativeElement.scrollTop;
    const clientHeight = this.myScrollContainer.nativeElement.clientHeight;
  
    // Si el usuario está cerca de la parte inferior, desplázate hacia abajo después de la actualización
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      this.myScrollContainer.nativeElement.scrollTop = scrollHeight;
    }
  }

  private forceScrollToBottom(): void {
    const scrollHeight = this.myScrollContainer.nativeElement.scrollHeight;
    this.myScrollContainer.nativeElement.scrollTop = scrollHeight;
  }
  
  

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Detén el polling al destruir el componente
}

  ngOnInit() {
    this.loadFriends();
    
    this.userService.getUserByToken().subscribe(
      response => {
        if (response) {
          this.user = response;
        } else {
          console.log('Error: no se pudo obtener el usuario.');
        }
      },
      error => {
        console.log(error);

      }
    );
    console.log(this.user)
  }

  startMessagePolling(): void {
    // Comienza el polling cada 5 segundos (puedes ajustar este intervalo)
    this.intervalId = setInterval(() => this.getMessages(), 5000);
}



  loadFriends() {
    this.loadingFriends = true;
    this.friendService.listFriends().subscribe(
      response => {
        this.friends = response;
        this.loadingFriends = false;
      },
      error => {
        console.log(error);
        this.loadingFriends = false;
      }
    );
  }

  selectFriend(friend: any): void {
    // Cancela la suscripción anterior, si existe
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
      this.messagesSubscription = null;
    }

    this.selectedFriend = friend;
    this.messages = []; // Vacía la lista de mensajes
    
    clearInterval(this.intervalId); // Detén el polling
    this.getMessages();

    this.autoScroll = true;

    this.startMessagePolling(); // Comienza un nuevo polling
    
  }

  getMessages(): void {
    if (this.selectedFriend && this.user && this.user.id && this.selectedFriend.id) {
      // Cancela la suscripción anterior, si existe
      if (this.messagesSubscription) {
        this.messagesSubscription.unsubscribe();
      }

      // Inicia una nueva suscripción
      this.messagesSubscription = this.chatService.getMessages(this.user.id, this.selectedFriend.id)
      .subscribe(
        messages => {
          this.messages = messages;
          if (this.autoScroll) {
            setTimeout(() => {
              this.forceScrollToBottom();
              this.autoScroll = false;
            }, 0);
          }
        },
        error => console.error('Error fetching messages', error)
      );
    }
  }

  sendMessage(): void {
    if (!this.newMessage || !this.selectedFriend || !this.user || !this.user.id) return;
    this.chatService.sendMessage(this.user.id, this.selectedFriend.id, this.newMessage)
      .subscribe(
        () => {
          this.getMessages();
          this.newMessage = '';
        },
        error => console.error('Error sending message', error)
      );
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
