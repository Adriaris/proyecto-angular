import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  providers: [UserService]
})
export class AppComponent implements OnInit{
  title = 'proyecto-angular';
  public identity: User | null = null;
  public token?: string | null;
  

  constructor(
    private _userService: UserService
  ){
    
  }
  ngOnInit():void{
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity() ?? null;
    this.token = this._userService.getToken() ?? null;
  }
}
