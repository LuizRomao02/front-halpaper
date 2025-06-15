import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEqComponent } from './lista.component';

describe('ListaEqComponent', () => {
  let component: ListaEqComponent;
  let fixture: ComponentFixture<ListaEqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
