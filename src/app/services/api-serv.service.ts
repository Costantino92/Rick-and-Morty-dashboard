import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiServService {
  constructor(private http: HttpClient) {}

  getList(param = 'https://rickandmortyapi.com/api/character') {
    return this.http.get<any>(param);
  }
  getEpisode(param: any) {
    return this.http.get<any>(param);
  }

  getPage(param: any) {
    return this.http.get<any>(`${param}`);
  }
}
