import { TestBed } from '@angular/core/testing';

import { DatosRegionalesService } from './datos-regionales.service';

describe('DatosRegionalesService', () => {
  let service: DatosRegionalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosRegionalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
