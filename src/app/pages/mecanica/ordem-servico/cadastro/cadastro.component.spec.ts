import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroOsComponent } from './cadastro.component';

describe('CadastroOsComponent', () => {
  let component: CadastroOsComponent;
  let fixture: ComponentFixture<CadastroOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroOsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
