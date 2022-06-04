import { TestBed } from '@angular/core/testing';

import { ApiServService } from './api-serv.service';

describe('ApiServService', () => {
  let service: ApiServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
