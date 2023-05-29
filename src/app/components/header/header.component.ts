import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() identity: User | null = null;

  public user: User;
  profileImage = "";
  isOffcanvasOpen = false;


  constructor(
    private router: Router,
    private userService: UserService
  ) { this.user = new User() }

  ngOnInit(): void {
    // Realizar la llamada al backend para obtener la ruta de la imagen del usuario
    this.userService.getProfileImage().subscribe(
      (response) => {
        // Asignar la ruta de la imagen a la variable
        if (response.status == "success" || response.status == "no-registered") {
          this.profileImage = response.profile_img;
        }


      },
      (error) => {
        this.profileImage = "http://localhost:8000/uploads/profile-img/default.png";
        console.error('Error al obtener la imagen del perfil:', error);
      }
    );
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false; // Cierra el offcanvas
  }
  openOffcanvas() {
    this.isOffcanvasOpen = true; // Cierra el offcanvas
  }


  openProfileCrud() {
    this.router.navigate(['/profile']).then(() => {
      location.reload();
    });
  }


}
