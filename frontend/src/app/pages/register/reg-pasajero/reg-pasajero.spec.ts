import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPasajero } from './reg-pasajero';

describe('RegPasajero', () => {
  let component: RegPasajero;
  let fixture: ComponentFixture<RegPasajero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegPasajero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegPasajero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
