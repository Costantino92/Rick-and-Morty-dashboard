import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { apiResponse, character } from '../Interfaces';
import { ApiServService } from '../services/api-serv.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  constructor(
    private apiService: ApiServService,
    private sharedService: SharedService
  ) {}

  numberOfPages!: number;
  pages: string[] = [];
  responseApi!: apiResponse;
  favoriteCharactersList: character[] = [];

  @Output() sendPages: EventEmitter<string[]> = new EventEmitter();

  ngOnInit(): void {
    this.apiService.getList().subscribe((data) => {
      this.numberOfPages = data.info.pages;
      this.responseApi = data;
      for (let i = 0; i < this.numberOfPages; i++) {
        this.pages.push(
          `https://rickandmortyapi.com/api/character/?page=${i + 1}`
        );
      }
      this.pagination(this.pages[0]);
      this.sendPages.emit(this.pages);
    });

    this.sharedService
      .getFavoriteCharacterObs()
      .subscribe((data) => this.favoriteCharactersList.push(data));
  }

  pagination(page: any) {
    this.apiService.getPage(page).subscribe((data) => {
      this.responseApi = data;
      if (this.favoriteCharactersList) {
        if (
          this.responseApi.results.length != 0 &&
          this.favoriteCharactersList.length != 0
        ) {
          for (let i = 0; i < this.responseApi.results.length; i++) {
            for (let j = 0; j < this.favoriteCharactersList.length; j++) {
              if (
                this.responseApi.results[i].name ==
                this.favoriteCharactersList[j].name
              ) {
                this.responseApi.results[i].disabled = true;
              }
            }
          }
        }
      }
      this.sharedService.getChangePageObs().next(this.responseApi);
    });
  }

  prev(param: any) {
    if (this.responseApi.info.prev == null) {
      this.pagination(this.pages[41]);
    } else {
      this.pagination(param);
      this.sharedService.getChangePageObs().next(this.responseApi);
    }
  }

  next(param: any) {
    if (this.responseApi.info.next == null) {
      this.pagination(this.pages[0]);
    } else {
      this.pagination(param);
      this.sharedService.getChangePageObs().next(this.responseApi);
    }
  }
}
