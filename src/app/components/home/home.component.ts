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
    this.userService.getAllUsers().subscribe(data => {
      this.users = data.map(user => {
        return {
          ...user,
          profileImg: user.profileImg ? 'http://localhost:8000/uploads/profile-img/' + user.profileImg : 'http://localhost:8000/uploads/profile-img/default.png'
        };
      });
    });

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

  onCardClick(userCLicked: User) {
    this.selectedUser = userCLicked;
    this.loading = true;
    this.isFriend = false;
    this.isFriendRequestSent = false;

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

  applyFilters() {
    const filters = this.filterForm.value;
    const filteredUsers = this.users.filter(user => {
      if (filters.nationality && filters.nationality != '' && user.nationality != filters.nationality) {
        return false;
      }
      if (filters.availability && filters.availability != '' && user.idAvailability.idAvailability != filters.availability) {
        return false;
      }
      if (filters.character && filters.character !== '' &&
      !(user.idFirstCharacter?.idCharacter == filters.character ||
        user.idSecondCharacter?.idCharacter == filters.character ||
        user.idThirdCharacter?.idCharacter == filters.character)) {
      return false;
    }
    
      if (filters.sRole && filters.sRole != '' && user.idSrole.idSrole != filters.sRole) {
        return false;
      }
      if (filters.tRole && filters.tRole != '' && user.idTrole.idTrole != filters.tRole) {
        return false;
      }
      if (filters.rank && filters.rank != '' && user.idRank.idRank != filters.rank) {
        return false;
      }
      return true;
    });

    this.filteredUsers = filteredUsers;
    this.showFilteredUsers = true;
    console.log(this.filteredUsers);
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







