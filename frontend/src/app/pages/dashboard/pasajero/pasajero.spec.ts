import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pasajero } from './pasajero';

describe('Pasajero', () => {
  let component: Pasajero;
  let fixture: ComponentFixture<Pasajero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pasajero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pasajero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
