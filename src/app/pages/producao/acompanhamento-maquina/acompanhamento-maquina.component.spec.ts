import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanhamentoMaquinaComponent } from './acompanhamento-maquina.component';

describe('AcompanhamentoMaquinaComponent', () => {
  let component: AcompanhamentoMaquinaComponent;
  let fixture: ComponentFixture<AcompanhamentoMaquinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcompanhamentoMaquinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcompanhamentoMaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
