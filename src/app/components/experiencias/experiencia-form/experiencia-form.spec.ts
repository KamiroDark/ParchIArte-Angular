import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaForm } from './experiencia-form';

describe('ExperienciaForm', () => {
  let component: ExperienciaForm;
  let fixture: ComponentFixture<ExperienciaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienciaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
