import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  pageTitle: string = 'Contact';
  
  contactData = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted!');
    }
  }
}
