import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegConductor } from './reg-conductor';

describe('RegConductor', () => {
  let component: RegConductor;
  let fixture: ComponentFixture<RegConductor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegConductor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegConductor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
