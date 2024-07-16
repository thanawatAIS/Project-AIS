import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalIdComponent } from './rental-id.component';

describe('RentalIdComponent', () => {
  let component: RentalIdComponent;
  let fixture: ComponentFixture<RentalIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
