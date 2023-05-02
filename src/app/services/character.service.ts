import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
    public url: string;

    constructor(
        public http: HttpClient
    ) {
        this.url = global.url;
    }

  getAllCharacters() {
    return this.http.get<any>(this.url +'api/characters');
  }

  getCharacterById(id: number) {
    return this.http.get<any>(this.url +`api/characters/${id}`);
  }
}
