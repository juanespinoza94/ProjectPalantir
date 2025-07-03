import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEncargadoAdquisicionesComponent } from './home-encargado-adquisiciones.component';

describe('HomeEncargadoAdquisicionesComponent', () => {
  let component: HomeEncargadoAdquisicionesComponent;
  let fixture: ComponentFixture<HomeEncargadoAdquisicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEncargadoAdquisicionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeEncargadoAdquisicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
