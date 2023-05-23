import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiBaseUrl = global.url; 

  constructor(private http: HttpClient) { }

  getMessages(senderId: number, receiverId: number): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}message/${senderId}/${receiverId}`);
  }
  

  sendMessage(senderId: number, receiverId: number, message: string): Observable<any> {
    console.log("mensaje desde service: " + message + "S: " + senderId + "R: " + receiverId)
    return this.http.post(`${this.apiBaseUrl}message`, {
      sender_id: senderId,
      receiver_id: receiverId,
      message: message
    });
  }

  deleteMessage(messageId: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}message/${messageId}`);
  }
}
