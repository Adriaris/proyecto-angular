import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrls: ['./profile-image-upload.component.css'],
  providers: [UserService]
})
export class ProfileImageUploadComponent {

  @Input() currentImage: string | null = null;
  @Output() imageSelected = new EventEmitter<File>();
  public user: User;
  profileImage = "default.png";

  constructor(
    private userService: UserService,
  ) {
    this.user = new User();
  }

      // Método para obtener la imagen del perfil del usuario
      getProfileImage() {
        // Realizar la llamada al backend para obtener la ruta de la imagen del usuario
        this.userService.getProfileImage().subscribe(
          (response) => {
            // Asignar la ruta de la imagen a la variable
            this.profileImage = response.profile_img;
          },
          (error) => {
            console.error('Error al obtener la imagen del perfil:', error);
          }
        );
      }

  ngOnInit(): void {

    this.getProfileImage();

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
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const userId = this.user.id ? this.user.id.toString() : ''; // Convertir a string o asignar un valor predeterminado

      this.userService.updateProfileImage(file, userId).subscribe(
        (response) => {
          // La imagen se ha subido exitosamente
          console.log('Imagen subida:', response);
        },
        (error: any) => {
          // Error al subir la imagen
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }



}
