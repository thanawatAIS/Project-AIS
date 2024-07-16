import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAllComponent } from './book-all.component';

describe('BookAllComponent', () => {
  let component: BookAllComponent;
  let fixture: ComponentFixture<BookAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
