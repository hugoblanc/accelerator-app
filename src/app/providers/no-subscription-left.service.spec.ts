import { TestBed } from '@angular/core/testing';

import { NoSubscriptionLeftService } from './no-subscription-left.service';

describe('NoSubscriptionLeftService', () => {
  let service: NoSubscriptionLeftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoSubscriptionLeftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
