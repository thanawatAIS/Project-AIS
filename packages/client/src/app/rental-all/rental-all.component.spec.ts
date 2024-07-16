import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalAllComponent } from './rental-all.component';

describe('RentalAllComponent', () => {
  let component: RentalAllComponent;
  let fixture: ComponentFixture<RentalAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
