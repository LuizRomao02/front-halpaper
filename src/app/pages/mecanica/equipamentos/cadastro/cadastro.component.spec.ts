import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEqComponent } from './cadastro.component';

describe('CadastroEqComponent', () => {
  let component: CadastroEqComponent;
  let fixture: ComponentFixture<CadastroEqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
