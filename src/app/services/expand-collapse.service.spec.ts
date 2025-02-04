import { TestBed } from '@angular/core/testing';

import { ExpandCollapseService } from './expand-collapse.service';

describe('ExpandCollapseService', () => {
  let service: ExpandCollapseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpandCollapseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
