import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioEquipamentoComponent } from './equipamento.component';

describe('ProntuarioEquipamentoComponent', () => {
  let component: ProntuarioEquipamentoComponent;
  let fixture: ComponentFixture<ProntuarioEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProntuarioEquipamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProntuarioEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
