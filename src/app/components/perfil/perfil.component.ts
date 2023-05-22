import { Component, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FriendService } from 'src/app/services/friend.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UserService]
})
export class PerfilComponent {
  @Input() identity: User | null = null;

  friendRequests: any[] = [];

  constructor(
    public userService: UserService,
    private router: Router,
    private friendService: FriendService
  ) { }

  ngOnInit(): void {
    const identity = localStorage.getItem('identity');
    if (identity) {
      this.identity = JSON.parse(identity);
    }

    this.friendService.getPendingFriendRequests().subscribe(
      response => {
      console.log(response)
        if (response && response.length > 0) {
          this.friendRequests = response;
        }
      },
      error => {
        console.error('Error getting friend requests: ', error);
      }
    );
  }

  logout() {
    this.userService.logout().subscribe(() => {
      console.log('logout');
      this.router.navigate(['/login']);
      location.reload();
    });
  }

  acceptFriendRequest(request: any) {
    this.friendService.updateFriendshipStatus(request.id, 'accepted').subscribe(
      response => {
        console.log(response);
        // Eliminar solicitud de la lista de solicitudes pendientes
        const index = this.friendRequests.indexOf(request);
        if (index > -1) {
          this.friendRequests.splice(index, 1);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  
  denyFriendRequest(request: any) {
    this.friendService.updateFriendshipStatus(request.id, 'denied').subscribe(
      response => {
        console.log(response);
        // Eliminar solicitud de la lista de solicitudes pendientes
        const index = this.friendRequests.indexOf(request);
        if (index > -1) {
          this.friendRequests.splice(index, 1);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  
  
  

  


  
}
