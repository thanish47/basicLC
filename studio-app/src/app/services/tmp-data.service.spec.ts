import { TestBed } from '@angular/core/testing';

import { TmpDataService } from './tmp-data.service';

describe('TmpDataService', () => {
  let service: TmpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
