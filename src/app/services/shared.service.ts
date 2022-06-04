import { Injectable } from '@angular/core';
import { ApiServService } from './api-serv.service';
import { apiResponse, character } from '../Interfaces';
import { Subject } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private apiService: ApiServService) {}

  numberOfPages!: number;
  responseApi!: apiResponse;
  pages: string[] = [];

  searchObs: Subject<any> = new Subject<any>();
  changePageObs: Subject<any> = new Subject<any>();
  favoriteCharactersObs: Subject<character> = new Subject();
  saveFavoriteCharacters: character[] = [];

  getResponseApi() {
    return this.responseApi;
  }
  getSearchObs() {
    return this.searchObs;
  }
  getChangePageObs() {
    return this.changePageObs;
  }
  getFavoriteCharacterObs() {
    return this.favoriteCharactersObs;
  }
  putSaveFavoriteCharacters(param: any) {
    param = this.saveFavoriteCharacters;
  }
  getSaveFavoriteCharacters() {
    return this.saveFavoriteCharacters;
  }
}
