import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstruturaOrganizacionalComponent } from './estrutura-organizacional.component';

describe('EstruturaOrganizacionalComponent', () => {
  let component: EstruturaOrganizacionalComponent;
  let fixture: ComponentFixture<EstruturaOrganizacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstruturaOrganizacionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstruturaOrganizacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
