import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { FriendService } from 'src/app/services/friend.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { CharacterService } from 'src/app/services/character.service';
import { RankService } from 'src/app/services/rank.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, FriendService]
})
export class HomeComponent implements OnInit {
  pageTitle: string = 'Home';
  selectedUser: any = null;
  users: any[] = [];
  isFriendRequestSent = false;
  isFriend = false;
  loading = true;
  profileImage = "";
  public user: User;
  filterForm!: FormGroup;
  characters: any[] = [];
  ranks: any[] = [];
  nationalities: any[] = [];
  filteredUsers: User[] = [];
  showFilteredUsers = false;
  currentPage: number = 1;   // Almacena la página actual.
  totalPages: number = 1;        // Almacena el número total de páginas.
  isPrevDisabled: boolean = true;   // Controla si el botón "Anterior" debe estar deshabilitado.
  isNextDisabled: boolean = true;   // Controla si el botón "Siguiente" debe estar deshabilitado.
  page: number = 1;          // El número de página que se pasará al método getAllUsers().
  pageSize: number = 12;
  public loadingUsers = true;
  description: string = "";
  showReportArea: boolean = false;
  reporterId: number = 0;
  reportedId: number = 0;
  reportSent = false;


  constructor(
    private userService: UserService,
    private friendService: FriendService,
    private http: HttpClient,
    private characterService: CharacterService,
    private rankService: RankService,
    private formBuilder: FormBuilder,
  ) {
    this.filterForm = this.formBuilder.group({
      nationality: [''],
      availability: [''],
      character: [''],
      sRole: [''],
      tRole: [''],
      rank: ['']
    });
    this.user = new User();
  }

  ngOnInit() {

    this.loadUsers();

    this.userService.getUserByToken().subscribe(
      response => {
        if (response) {
          this.user = response;
          console.log(this.user)
        } else {
          console.log('Error: no se pudo obtener el usuario.');
        }
      },
      error => {
        console.log(error);
      }
    );

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

  applyFilters() {
    this.page = 1; // Vuelve a la primera página cuando se aplican nuevos filtros
    this.loadUsers();
  }


  loadUsers() {
    const filters = this.filterForm.value;
    this.loadingUsers = true;

    this.userService.getAllUsers(this.page, this.pageSize, filters).subscribe(response => {
      this.users = response.data.map(user => {
        
        return {
          ...user,
          profileImg: user.profileImg ? 'http://localhost:8000/uploads/profile-img/' + user.profileImg : 'http://localhost:8000/uploads/profile-img/default.png'
        };
        
      });
      console.log(this.users)
      this.loadingUsers = false;
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;

      this.updateButtons();
    });
  }

  updateButtons(): void {
    this.isPrevDisabled = this.currentPage === 1;
    this.isNextDisabled = this.currentPage === this.totalPages;
  }


  prevPage(): void {
    if (this.currentPage > 1) {
      this.page--;
      this.loadUsers();
      window.scrollTo(0, 0);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.page++;
      this.loadUsers();
      window.scrollTo(0, 0);
    }
  }

  onCardClick(userCLicked: User) {
    this.selectedUser = userCLicked;
    this.loading = true;
    this.isFriend = false;
    this.isFriendRequestSent = false;
    this.showReportArea = false;
    this.reportSent = false;


    // Verificar si el usuario seleccionado es amigo
    this.friendService.checkFriendship(this.selectedUser.id).subscribe(
      response => {
        console.log(response);
        if (response.status == "friends") {
          this.isFriend = true;
          this.isFriendRequestSent = false;
        } else if (response.status == "pending") {
          this.isFriend = false;
          this.isFriendRequestSent = true;
        } else {
          this.isFriend = false;
          this.isFriendRequestSent = false;
        }
        this.loading = false;

      },
      error => {
        console.log(error);
        this.loading = false;

        // Mostrar mensaje de error
      }
    );
  }

  getAge(birthdate: string): string {
    const now = new Date();
    const birth = new Date(birthdate);
    const diff = now.getTime() - birth.getTime();
    const ageDate = new Date(diff); // miliseconds from epoch
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return isNaN(age) ? '' : age.toString();
  }

  getAvailabilityTextMorning(): string {
    if (this.selectedUser.idAvailability.idAvailability === 1 || this.selectedUser.idAvailability.idAvailability === 3) {
      return 'Available';
    } else {
      return 'Morning';
    }
  }
  getAvailabilityTextAfternoon(): string {
    if (this.selectedUser.idAvailability.idAvailability === 2 || this.selectedUser.idAvailability.idAvailability === 3) {
      return 'Available';
    } else {
      return 'Afternoon';
    }
  }
  onAddFriendClick() {
    this.isFriendRequestSent = false;
    const friend = {
      userId1: this.user.id,
      userId2: this.selectedUser.id,
      user1Locked: 0,
      user2Locked: 0
    };

    this.friendService.addFriend(friend).subscribe(
      (response: any) => {
        console.log(response)
        if (response.friendshipStatus == "pending") {
          this.isFriend = false;
          this.isFriendRequestSent = true;
          console.log(response)
        }
      },
      error => {
        console.log(error);
        this.isFriendRequestSent = false;
      }
    );

  }

  onReportButtonClick() {
    // Muestra u oculta el área de informe cuando se hace clic en el botón de informe.
    this.showReportArea = !this.showReportArea;
  }

  onSubmitReportClick() {
    // Realiza el informe cuando se hace clic en el botón de enviar.
    if (this.user.id && this.selectedUser) {
      this.userService.reportUser(this.user.id, this.selectedUser.id, this.description)
        .subscribe(
          (response) => {
            if (response.status == "success") {
              this.reportSent = true;
              // Oculta el área de informe.
              this.showReportArea = false;

              // Borra la descripción del informe.
              this.description = '';
            }

          },
          (error) => {

            console.error(error);

            this.showReportArea = false;
          }
        );
    }
  }







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


}







