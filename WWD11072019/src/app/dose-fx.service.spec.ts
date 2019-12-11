import { TestBed } from '@angular/core/testing';

import { DoseFxService } from './dose-fx.service';

describe('DoseFxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoseFxService = TestBed.get(DoseFxService);
    expect(service).toBeTruthy();
  });
});
