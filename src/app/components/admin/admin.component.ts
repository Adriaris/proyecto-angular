import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [UserService]
})
export class AdminComponent implements OnInit {
  reportedUsers: any[] = [];
  public user: any = {};

  isModalOpen = false;

  constructor(private userService: UserService) {
   
  }

  ngOnInit() {
    this.userService.getReportedUsers().subscribe(
      response => {
          if (response) {
              this.reportedUsers = response.reportedUsers;
              for (let ticket of this.reportedUsers) {
                  ticket.createdAt = new Date(ticket.createdAt);
                  ticket.updatedAt = new Date(ticket.updatedAt);
              }
          } else {
              console.log('Error: No se pudo obtener la lista de usuarios reportados.');
          }
      },
      error => {
          console.log(error);
      });
  }

  filterTickets(event: any) {
    const status = event.target.value;
    if (status === 'all') {
        this.userService.getReportedUsers().subscribe(
            response => {
                if (response) {
                    this.reportedUsers = response.reportedUsers;
                    for (let ticket of this.reportedUsers) {
                        ticket.createdAt = new Date(ticket.createdAt);
                        ticket.updatedAt = new Date(ticket.updatedAt);
                    }
                } else {
                    console.log('Error: No se pudo obtener la lista de usuarios reportados.');
                }
            },
            error => {
                console.log(error);
            }
        );
    } else {
        this.userService.getReportedUsers(status).subscribe(
            response => {
                if (response) {
                    this.reportedUsers = response.reportedUsers;
                    for (let ticket of this.reportedUsers) {
                        ticket.createdAt = new Date(ticket.createdAt);
                        ticket.updatedAt = new Date(ticket.updatedAt);
                    }
                } else {
                    console.log('Error: No se pudo obtener la lista de usuarios reportados.');
                }
            },
            error => {
                console.log(error);
            }
        );
    }
}


  getUserById(userId: number): void {
    this.userService.getUserById(userId).subscribe(
        response => {
            if (response.status !== 'error') {
                this.user = response.data[0];
                this.user.profileImg = this.user.profileImg ? 'http://localhost:8000/uploads/profile-img/' + this.user.profileImg : 'http://localhost:8000/uploads/profile-img/default.png';
                this.isModalOpen = true;  // Open the modal
                console.log(this.user);
            } else {
                console.log('Error: no se pudo obtener el usuario.');
            }
        },
        error => {
            console.log(error);
        }
    );
}

solveTicket(ticket: any) {
    this.userService.solveTicket(ticket).subscribe(
        response => {
            if (response && response.status === 'success') {
                // Eliminar el ticket del array reportedUsers
                this.reportedUsers = this.reportedUsers.filter((reportedTicket) => reportedTicket.id !== ticket.id);
            } else {
                console.log('Error: No se pudo resolver el ticket.');
            }
        },
        error => {
            console.log(error);
        }
    );
}





closeModal(): void {
    this.isModalOpen = false;  // Close the modal
    
}

getAge(birthdate: string): string {
  const now = new Date();
  const birth = new Date(birthdate);
  const diff = now.getTime() - birth.getTime();
  const ageDate = new Date(diff); // miliseconds from epoch
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return isNaN(age) ? '' : age.toString();
}
}
