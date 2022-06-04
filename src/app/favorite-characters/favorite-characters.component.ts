import { Component, OnInit, OnDestroy } from '@angular/core';
import { character } from '../Interfaces';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-favorite-characters',
  templateUrl: './favorite-characters.component.html',
  styleUrls: ['./favorite-characters.component.css'],
})
export class FavoriteCharactersComponent implements OnInit {
  favoriteCharactersList!: character[];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    if (this.sharedService.getSaveFavoriteCharacters()) {
      this.favoriteCharactersList =
        this.sharedService.getSaveFavoriteCharacters();
    }
    this.sharedService.getFavoriteCharacterObs().subscribe((data) => {
      this.favoriteCharactersList.push(data);
      this.sharedService.putSaveFavoriteCharacters(this.favoriteCharactersList);
    });
  }
}
