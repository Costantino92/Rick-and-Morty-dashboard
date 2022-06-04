import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  searchCharacter(param: any) {
    this.sharedService.getSearchObs().next(param);
  }
}
