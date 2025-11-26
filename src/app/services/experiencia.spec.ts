import { TestBed } from '@angular/core/testing';

import { Experiencia } from './experiencia';

describe('Experiencia', () => {
  let service: Experiencia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Experiencia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
