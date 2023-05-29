import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiBaseUrl = global.url;

  constructor(private http: HttpClient) { }

  getMessages(senderId: number, receiverId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      let headers = new HttpHeaders().set('Authorization', token);
      return this.http.get(`${this.apiBaseUrl}message/${senderId}/${receiverId}`, { headers });
    } else {
      return of(null);
    }
  }


  sendMessage(senderId: number, receiverId: number, message: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      let headers = new HttpHeaders().set('Authorization', token);
      return this.http.post(`${this.apiBaseUrl}message`, {
        sender_id: senderId,
        receiver_id: receiverId,
        message: message,
      }, { headers });
    } else {
      return of(null);
    }
  }


}
