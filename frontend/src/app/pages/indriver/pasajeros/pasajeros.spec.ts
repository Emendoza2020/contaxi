import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pasajeros } from './pasajeros';

describe('Pasajeros', () => {
  let component: Pasajeros;
  let fixture: ComponentFixture<Pasajeros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pasajeros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pasajeros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
