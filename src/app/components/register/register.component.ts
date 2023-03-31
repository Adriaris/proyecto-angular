import { Component, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})


export class RegisterComponent {

  pageTitle: string = 'Register';
  public user: User;
  public status?: string;

  @ViewChild('ngForm', { static: false }) myForm?: NgForm;

  constructor(
    private _userService: UserService
  ) { //    name-age-nat-desc-email-passwd-avail-ch1-ch2-ch3-amb-sr-tr-rank
    this.user = new User();
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {

    // Here you can define the form submission logic
    this.user.id_first_character = this.selectedCharacters[0];
    this.user.id_second_character = this.selectedCharacters[1];
    this.user.id_third_character = this.selectedCharacters[2];
    
    this._userService.register(this.user).subscribe(
      response =>{
        if(response.status == 'success'){
          this.status = 'success';
          if (this.myForm) {
            this.myForm.reset();
          }
          
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error)
      }
    )

    console.log(this.user); // For example, log the user object to the console
  }


  currentSection = 0;

  nextSection() {
    this.currentSection++;
  }
  previousSection() {
    this.currentSection--;
  }

  


  selectedCharacters: number[] = [];
  showError: boolean = false;

  updateSelectedCharacters(event: any, idCharacter: number) {
    //debugger
    if (event.target.checked) {
      // Agregar el id del personaje seleccionado al array
      this.selectedCharacters.push(idCharacter);
      // Si el usuario seleccionó más de 3 personajes, mostrar un mensaje de error
      if (this.selectedCharacters.length > 3) {
        this.showError = true;
        // Desmarcar el checkbox seleccionado
        event.target.checked = false;
        // Eliminar el id del personaje seleccionado del array
        this.selectedCharacters.pop();
      }
    } else {
      // Eliminar el id del personaje deseleccionado del array
      const index = this.selectedCharacters.indexOf(idCharacter);
      if (index !== -1) {
        this.selectedCharacters.splice(index, 1);
      }
      // Ocultar el mensaje de error si el usuario seleccionó menos de 4 personajes
      if (this.showError && this.selectedCharacters.length <= 3) {
        this.showError = false;
      }
    }
  }

  clearErrorMessages() {
    this.showError = false;
  }









  ambitions = [
    { id: 1, name: 'Unrated' },
    { id: 2, name: 'Competitive' },
    { id: 3, name: 'Online Tournaments' },
    { id: 4, name: 'Local LANs' },
    { id: 5, name: 'International LANs' }
  ];

  ranks = [
    { id: 1, name: 'Iron', level: 1 },
    { id: 2, name: 'Iron', level: 2 },
    { id: 3, name: 'Iron', level: 3 },
    { id: 4, name: 'Bronze', level: 1 },
    { id: 5, name: 'Bronze', level: 2 },
    { id: 6, name: 'Bronze', level: 3 },
    { id: 7, name: 'Silver', level: 1 },
    { id: 8, name: 'Silver', level: 2 },
    { id: 9, name: 'Silver', level: 3 },
    { id: 10, name: 'Gold', level: 1 },
    { id: 11, name: 'Gold', level: 2 },
    { id: 12, name: 'Gold', level: 3 },
    { id: 13, name: 'Platinum', level: 1 },
    { id: 14, name: 'Platinum', level: 2 },
    { id: 15, name: 'Platinum', level: 3 },
    { id: 16, name: 'Diamond', level: 1 },
    { id: 17, name: 'Diamond', level: 2 },
    { id: 18, name: 'Diamond', level: 3 },
    { id: 19, name: 'Ascendant', level: 1 },
    { id: 20, name: 'Ascendant', level: 2 },
    { id: 21, name: 'Ascendant', level: 3 },
    { id: 22, name: 'Immortal', level: 1 },
    { id: 23, name: 'Immortal', level: 2 },
    { id: 24, name: 'Immortal', level: 3 },
    { id: 25, name: 'Radiant', level: 1 },
  ];

  teamRoles = [
    { id_trole: 1, trole: 'Leader'},
    { id_trole: 2, trole: 'Strategist'},
  ];
  soloRoles = [
    { id_srole: 1, srole: 'Entry'},
    { id_srole: 2, srole: 'Operator'},
    { id_srole: 3, srole: 'Support'},
    { id_srole: 4, srole: 'Passive'},
    { id_srole: 5, srole: 'Initiator'},
    { id_srole: 6, srole: 'Duelist'},
    { id_srole: 7, srole: 'Sentinel'},
    { id_srole: 8, srole: 'Controller'},
  ];

  characters = [
    { id_character: 1, display_name: 'Astra', img_character: 'https://i.imgur.com/PLhc00t.png' },
    { id_character: 2, display_name: 'Breach', img_character: 'https://i.imgur.com/k1nBv8f.png' },
    { id_character: 3, display_name: 'Brimstone', img_character: 'https://i.imgur.com/GCpJvz1.png' },
    { id_character: 4, display_name: 'Chamber', img_character: 'https://i.imgur.com/ih5VfyJ.png' },
    { id_character: 5, display_name: 'Cypher', img_character: 'https://i.imgur.com/JCt0a7t.png' },
    { id_character: 6, display_name: 'Fade', img_character: 'https://i.imgur.com/7ALpYMo.png' },
    { id_character: 7, display_name: 'Gekko', img_character: 'https://i.imgur.com/v35PyZn.png' },
    { id_character: 8, display_name: 'Harbor', img_character: 'https://i.imgur.com/puCPvAn.png' },
    { id_character: 9, display_name: 'Jett', img_character: 'https://i.imgur.com/gR9kMB6.png' },
    { id_character: 10, display_name: 'KAY/O', img_character: 'https://i.imgur.com/EN9D9Xx.png' },
    { id_character: 11, display_name: 'Killjoy', img_character: 'https://i.imgur.com/mc1MC9B.png' },
    { id_character: 12, display_name: 'Neon', img_character: 'https://i.imgur.com/Ym94H33.png' },
    { id_character: 13, display_name: 'Omen', img_character: 'https://i.imgur.com/omunMhj.png' },
    { id_character: 14, display_name: 'Phoenix', img_character: 'https://i.imgur.com/62wWJMW.png' },
    { id_character: 15, display_name: 'Raze', img_character: 'https://i.imgur.com/UJcdZi7.png' },
    { id_character: 16, display_name: 'Reyna', img_character: 'https://i.imgur.com/QVgZzSJ.png' },
    { id_character: 17, display_name: 'Sage', img_character: 'https://i.imgur.com/HdRH7lt.png' },
    { id_character: 18, display_name: 'Skye', img_character: 'https://i.imgur.com/4DBtEG4.png' },
    { id_character: 19, display_name: 'Sova', img_character: 'https://i.imgur.com/XsqF7ue.png' },
    { id_character: 20, display_name: 'Viper', img_character: 'https://i.imgur.com/6UvzM6W.png' },
    { id_character: 21, display_name: 'Yoru', img_character: 'https://i.imgur.com/kHf2nkX.png' }
  ];






}
