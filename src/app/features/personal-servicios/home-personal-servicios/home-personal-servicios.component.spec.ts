import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePersonalServiciosComponent } from './home-personal-servicios.component';

describe('HomePersonalServiciosComponent', () => {
  let component: HomePersonalServiciosComponent;
  let fixture: ComponentFixture<HomePersonalServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePersonalServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePersonalServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
