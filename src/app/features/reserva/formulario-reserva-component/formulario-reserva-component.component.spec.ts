import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReservaComponentComponent } from './formulario-reserva-component.component';

describe('FormularioReservaComponentComponent', () => {
  let component: FormularioReservaComponentComponent;
  let fixture: ComponentFixture<FormularioReservaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReservaComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioReservaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
