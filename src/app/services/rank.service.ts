import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class RankService {

    public url: string;

    constructor(
        public http: HttpClient
    ) {
        this.url = global.url;
    }


  getAllRanks() {
    return this.http.get<any>(this.url +'api/ranks');
  }

  getRankById(id: number) {
    return this.http.get<any>(this.url +`api/ranks/${id}`);
  }
}
