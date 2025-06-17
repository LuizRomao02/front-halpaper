import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioTecnicoComponent } from './tecnico.component';

describe('ProntuarioTecnicoComponent', () => {
  let component: ProntuarioTecnicoComponent;
  let fixture: ComponentFixture<ProntuarioTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProntuarioTecnicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProntuarioTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
