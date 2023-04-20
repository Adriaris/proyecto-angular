import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageTitle: string = 'Home';
  characters: any[] = [];

  //USUARIOS DE EJEMPLO
  users: any[] = [
    {
      nickname: 'user1',
      characters: ['char1', 'char2', 'char3'],
      nationality: 'Mexico',
      photoUrl: 'https://via.placeholder.com/300x200',
      roles: ['rol1', 'rol2'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      nickname: 'user2',
      characters: ['char4', 'char5', 'char6'],
      nationality: 'Argentina',
      photoUrl: 'https://via.placeholder.com/300x200',
      roles: ['rol3', 'rol4'],
      description: null
    },
    {
      nickname: 'user3',
      characters: ['char7', 'char8', 'char9'],
      nationality: 'España',
      photoUrl: 'https://via.placeholder.com/300x200',
      roles: ['rol1', 'rol4'],
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      nickname: 'user4',
      characters: ['char2', 'char4', 'char7'],
      nationality: 'Colombia',
      photoUrl: 'https://via.placeholder.com/300x200',
      roles: ['rol2', 'rol3'],
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ];

  agents: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://valorant-api.com/v1/agents').subscribe(data => {
      this.agents = data;
    });
  }
}
