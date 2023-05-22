import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  public url: string;

  constructor(public http: HttpClient) {
    this.url = global.url;
  }

  addFriend(friend: any) {

    let json = JSON.stringify(friend);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + 'friends', params, { headers: headers });
  }

  checkFriendship(idUser2: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.http.get<any>(this.url + `friends/check/${idUser2}`, { headers });
    } else {
      return of(null);
    }
  }

  listFriends(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.http.get<any[]>(`${this.url}friends/list`, { headers });
    } else {
      return of(null);
    }
  }


  getPendingFriendRequests(): Observable<any> {
    const token = localStorage.getItem('token');
    //console.log(token)
    if (token) {
      //let headers = new HttpHeaders().set('Authorization', token);
      //return this.http.get<any>(`${this.url}friends/pending`, { headers });
      let headers = new HttpHeaders().set('Authorization', token);
      return this.http.get<any[]>(this.url + 'friends/pending', { headers });
    } else {
      return of(null);
    }
  }

  updateFriendshipStatus(id: number, status: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.http.put(`${this.url}friends/${id}/status/${status}`, {}, { headers });
    } else {
      return of(null);
    }
  }


}
