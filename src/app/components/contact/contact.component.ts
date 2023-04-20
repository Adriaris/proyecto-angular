import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  pageTitle: string = 'Contact';
  
  public status?: string;
  contactData = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      this.userService.sendContact(this.contactData).subscribe(
        response => {
          // La solicitud se ha enviado correctamente
          console.log(response);
          this.status = 'success';
          contactForm.reset();
        },
        error => {
          // Ha ocurrido un error durante la solicitud
          console.error(error);
          this.status = 'error';
        }
      );
    } else {
      // El formulario no es válido
      console.log("Formulario no válido");
      this.status = 'error';
    }
  }

}
