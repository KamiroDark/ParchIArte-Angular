import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaList } from './experiencia-list';

describe('ExperienciaList', () => {
  let component: ExperienciaList;
  let fixture: ComponentFixture<ExperienciaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienciaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
