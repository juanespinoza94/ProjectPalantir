import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPagoComponentComponent } from './formulario-pago-component.component';

describe('FormularioPagoComponentComponent', () => {
  let component: FormularioPagoComponentComponent;
  let fixture: ComponentFixture<FormularioPagoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPagoComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioPagoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
