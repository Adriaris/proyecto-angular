import { Component, OnInit } from '@angular/core';
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
  friends: any[] = [];
  selectedFriend: any = null;
  public user: User;
  messageThread: any[] = [];


  constructor(private userService: UserService, private friendService: FriendService) {
    this.user = new User();
  }
  ngOnInit(): void {
    this.loadFriends();
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

  onFriendClick(friend: any) {
    this.selectedFriend = friend;
    this.messageThread = []; // limpia el chat anterior
     this.loadMessages(this.selectedFriend.id); // carga los mensajes para este amigo
  }

  newMessageContent(event: any) {
    //this.messageContent = event.target.value;
  }


  /*loadMessages() {
    this.friendService.getMessages(this.selectedFriend.id).subscribe(
      response => {
        this.messageThread = response;
      },
      error => {
        console.log(error);
      }
    );*/

  loadMessages(id: number) {
    this.messageThread = [
      {
        id: 1,
        sender: {
          id: 2,
          name: 'John Doe'
        },
        content: 'Hola! ¿Cómo estás?',
        date: '2022-05-16T10:22:00Z'
      },
      {
        id: 2,
        sender: {
          id: 1,
          name: 'Jane Doe'
        },
        content: 'Estoy bien, gracias por preguntar. ¿Y tú?',
        date: '2022-05-16T10:24:00Z'
      },
      {
        id: 3,
        sender: {
          id: 2,
          name: 'John Doe'
        },
        content: 'Bien también, ¿te apetece quedar para tomar un café?',
        date: '2022-05-16T10:26:00Z'
      },
      {
        id: 4,
        sender: {
          id: 1,
          name: 'Jane Doe'
        },
        content: 'Claro, me parece bien. ¿Qué día te viene bien?',
        date: '2022-05-16T10:28:00Z'
      },
      {
        id: 5,
        sender: {
          id: 2,
          name: 'John Doe'
        },
        content: '¿Qué tal el miércoles por la tarde?',
        date: '2022-05-16T10:30:00Z'
      },
      {
        id: 6,
        sender: {
          id: 1,
          name: 'Jane Doe'
        },
        content: 'Genial, nos vemos el miércoles a las 16:00',
        date: '2022-05-16T10:32:00Z'
      }
    ];
    
  }
  sendMessage() {

  }
}
  


