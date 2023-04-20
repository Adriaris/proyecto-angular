import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {

  pageTitle: string = 'Login';
  public user: User;
  public identity?: User;
  public token: string = '';
  public status?: string;

  @ViewChild('ngForm', { static: false }) myForm?: NgForm;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,

  ) {
    this.user = new User();
  }

  /* user = {
     email: '',
     password: ''
   };*/

  onSubmit(form: NgForm) {
    this._userService.signup(this.user).subscribe(
      response => {
        if (!response.status || response.status != 'error') {
          this.status = 'success';
          this.identity = response;

          //SACAR EL TOKEN
          this._userService.signup(this.user, true).subscribe(
            response => {
              if (!response.status || response.status != 'error') {
                this.token = response;
                
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                this._router.navigate(['/']);

              } else {
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            }
          );

        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  ngOnInit() {

  }



}
