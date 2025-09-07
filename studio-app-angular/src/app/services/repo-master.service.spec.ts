import { TestBed } from '@angular/core/testing';

import { RepoMasterService } from './repo-master.service';

describe('RepoMasterService', () => {
  let service: RepoMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepoMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
