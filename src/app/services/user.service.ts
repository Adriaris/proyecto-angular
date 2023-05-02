import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
    public url: string;
    public identity?: User | null;
    public token?: string | null;
    

    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
    }

    register(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register', params, { headers: headers });
    }
    signup(user: any, gettoken?: boolean): Observable<any>{
        if (gettoken ?? false) {
            user.gettoken = true;
        }
    
        let json = JSON.stringify(user);
        let params = 'json=' + json;
    
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    getIdentity(){
        let identity = localStorage.getItem('identity');
    
        if(identity && identity !== 'undefined'){
            this.identity = JSON.parse(identity);
        } else {
            this.identity = null;
        }
    
        return this.identity;
    }
    
    getToken(){
        let token = localStorage.getItem('token');
        

        if(token && token != 'undefined'){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }

    logout(): Observable<any> {
        console.log('logout');
        this.getToken();
        let headers = {
          'Authorization': `Bearer ${this.token}`
        };
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        return this._http.delete(`${this.url}logout`, { headers });
    }
    
    sendContact(formData: any): Observable<any>{
        let json = JSON.stringify(formData);
        let params = 'json=' + json;
      
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'contact', params, { headers: headers });
      }

      getAllUsers(): Observable<any[]> {
        return this._http.get<any[]>(this.url +`getallusers`);
      }
      




}
