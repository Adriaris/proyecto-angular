import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from './message';
import { UserService } from 'src/app/services/user.service';
import { FriendService } from 'src/app/services/friend.service';
import { User } from 'src/app/models/user';


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

  constructor(private userService: UserService, private friendService: FriendService, private chatService: ChatService) {
    this.user = new User();
  }
  
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  private scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
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



  loadFriends() {
    this.friendService.listFriends().subscribe(
      response => {
        this.friends = response;
        console.log(response)
      },
      error => {
        console.log(error);
      }
    );
  }

  selectFriend(friend: any): void {
    this.selectedFriend = friend;
    this.getMessages();
  }

  getMessages(): void {
    if (this.selectedFriend && this.user && this.user.id && this.selectedFriend.id) {
      this.chatService.getMessages(this.user.id, this.selectedFriend.id)
        .subscribe(
          messages => this.messages = messages,
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
