import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CharacterService } from 'src/app/services/character.service';
import { RankService } from 'src/app/services/rank.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements OnInit {

  pageTitle: string = 'Register';
  public user: User;
  public status?: string;

  @ViewChild('ngForm', { static: false }) myForm?: NgForm;

  selectedCharacters: number[] = [];
  showError: boolean = false;
  errorMessage: string = '';
  agents: any;
  characters: any[] = [];
  ranks: any[] = [];
  nationalities: any[] = [];
  alertMessage: string | null = null;

  constructor(
    private _userService: UserService,
    private http: HttpClient,
    private characterService: CharacterService, // Agregar esta línea
    private rankService: RankService // Agregar esta línea
  ) {
    this.user = new User();
  }

  ngOnInit(): void {

    this.http.get<any>('https://flagcdn.com/en/codes.json').subscribe(data => {
      this.nationalities = Object.keys(data).map(code => {
        return {
          code: code.toLowerCase(),
          name: data[code].toLowerCase().replace(/(?:^|\s)\S/g, (firstChar: string) => firstChar.toUpperCase())
        };
      });
    });

    this.characterService.getAllCharacters().subscribe(data => {
      this.characters = data;
    });
    this.rankService.getAllRanks().subscribe(data => {
      this.ranks = data;
    });
  }

  onSubmit(): void {

    this.user.id_first_character = this.selectedCharacters[0];
    this.user.id_second_character = this.selectedCharacters[1];
    this.user.id_third_character = this.selectedCharacters[2];

    this._userService.register(this.user).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          if (this.myForm) {
            this.myForm.reset();
          }

        } else {
          this.status = 'error';
          this.errorMessage = response.message; // set the error message
          console.log(response);
        }
      },
      error => {
        this.status = 'error';
        this.errorMessage = "Unexpected error"; // set the error message
        console.log(error)
      }
    )
    window.scrollTo({ top: 0, behavior: 'smooth' });

    console.log(this.user); // For example, log the user object to the console
  }

  currentSection = 0;

  nextSection() {
    this.currentSection++;
  }
  previousSection() {
    this.currentSection--;
  }

  clearErrorMessages() {
    this.showError = false;
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  updateSelection(character: any) {
    const index = this.selectedCharacters.indexOf(character.idCharacter);
    if (index === -1 && this.selectedCharacters.length >= 3) {
      // Si ya hay 3 personajes seleccionados, muestra un mensaje de error
      this.alertMessage = 'You can only select 3 characters.';
      setTimeout(() => {
        this.alertMessage = null;
      }, 3000);
      return;
    }
  
    // Agrega o quita el personaje de la lista de personajes seleccionados
    if (index === -1) {
      this.selectedCharacters.push(character.idCharacter);
    } else {
      this.selectedCharacters.splice(index, 1);
    }
  }
  
  isSelected(character: any): boolean {
    return this.selectedCharacters.includes(character.idCharacter);
  }


//------------------------------------------------------------
availabilityOptions = [
  { id: 3, label: 'All day' },
  { id: 1, label: 'Morning (AM)' },
  { id: 2, label: 'Afternoon (PM)' },
];

ambitions = [
  { id: 1, name: 'Unrated' },
  { id: 2, name: 'Competitive' },
  { id: 3, name: 'Online Tournaments' },
  { id: 4, name: 'Local LANs' },
  { id: 5, name: 'International LANs' }
];

teamRoles = [
  { id_trole: 1, trole: 'Leader' },
  { id_trole: 2, trole: 'Strategist' },
];

soloRoles = [
  { id_srole: 1, srole: 'Entry' },
  { id_srole: 2, srole: 'Operator' },
  { id_srole: 3, srole: 'Support' },
  { id_srole: 4, srole: 'Passive' },
  { id_srole: 5, srole: 'Initiator' },
  { id_srole: 6, srole: 'Duelist' },
  { id_srole: 7, srole: 'Sentinel' },
  { id_srole: 8, srole: 'Controller' },
];

    //------------------------------------------------------------



}
