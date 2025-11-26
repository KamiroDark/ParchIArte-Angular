import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisExperiencias } from './mis-experiencias';

describe('MisExperiencias', () => {
  let component: MisExperiencias;
  let fixture: ComponentFixture<MisExperiencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisExperiencias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisExperiencias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
