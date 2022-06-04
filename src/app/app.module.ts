import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CharListComponent } from './char-list/char-list.component';
import { FavoriteCharactersComponent } from './favorite-characters/favorite-characters.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CharListComponent,
    FavoriteCharactersComponent,
    NavbarComponent,
    PaginationComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
