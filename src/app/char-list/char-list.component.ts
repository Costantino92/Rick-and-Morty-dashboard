import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApiServService } from '../services/api-serv.service';
import { apiResponse, character } from '../Interfaces';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-char-list',
  templateUrl: './char-list.component.html',
  styleUrls: ['./char-list.component.css'],
})
export class CharListComponent implements OnInit {
  constructor(
    private apiService: ApiServService,
    private sharedService: SharedService
  ) {}

  inputValueRecived!: string;

  info: any;
  character!: character;
  toggle = false;
  episodeName!: string;
  numberOfPages!: number;
  @Input() pages: string[] = [];
  responseApi!: apiResponse;
  allCharacters: character[] = [];
  currentResponseApi!: apiResponse;
  episodeNumber: number = 1;

  ngOnInit(): void {
    this.apiService.getList().subscribe((data: apiResponse) => {
      this.responseApi = data;
      this.currentResponseApi = { ...data };
    });

    setTimeout(() => {
      for (let i = 0; i < this.pages.length; i++) {
        this.apiService.getPage(this.pages[i]).subscribe((data) => {
          for (let i = 0; i < data.results.length; i++) {
            this.allCharacters.push(data.results[i]);
          }
        });
      }
    }, 400);

    this.sharedService.getSearchObs().subscribe((data: any) => {
      this.inputValueRecived = data.target.value;
      this.searchCharacter(this.inputValueRecived);
    });

    this.sharedService.getChangePageObs().subscribe((data) => {
      this.responseApi = data;
      for (let i = 0; i < this.responseApi.results.length; i++) {
        for (
          let j = 0;
          j < this.sharedService.getSaveFavoriteCharacters().length;
          j++
        ) {
          if (
            this.responseApi.results[i].name ==
            this.sharedService.getSaveFavoriteCharacters()[j].name
          ) {
            this.responseApi.results[i].disabled = true;
          }
        }
      }
      this.currentResponseApi = { ...data };
    });
  }

  modal(param: any) {
    this.toggle = true;
    this.episodeName = '';
    this.info = this.responseApi.results.filter((el: any) => el.name == param);
    this.character = this.info[0];
    if (this.character.episode.length > 1) {
      for (let i = 0; i < this.character.episode.length; i++) {
        this.episode(this.character.episode[i]);
      }
    } else {
      this.episode(this.character.episode[0]);
    }
  }

  closeModal() {
    this.toggle = false;
    this.episodeName = '';
    this.episodeNumber = 1;
  }

  episode(param: any) {
    this.apiService.getEpisode(param).subscribe((data) => {
      this.episodeName = this.episodeName.concat(
        `${this.episodeNumber++}. ${data.name}, ${data.episode}  \n \n`
      );
    });
  }

  searchCharacter(param: string) {
    if (param == '') {
      this.responseApi = this.currentResponseApi;
      console.log(this.responseApi, this.currentResponseApi);
    } else {
      this.responseApi.results = this.allCharacters.filter((el: character) =>
        el.name.toLowerCase().includes(param.toLowerCase())
      );
    }
  }

  addFavorite(param: any, event?: any) {
    let addButton: any = event.target;
    addButton!.textContent = 'Aggiunto';
    addButton!.disabled = true;

    this.sharedService.putSaveFavoriteCharacters(
      this.sharedService.getSaveFavoriteCharacters().push(param)
    );
  }
}
