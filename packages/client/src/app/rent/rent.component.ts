import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RentalService } from '../api/rental.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NavBarComponent, FooterComponent],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss'
})
export class RentComponent {
  rentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rentalService: RentalService,
    private router: Router
  ) {
    this.rentForm = this.fb.group({
      rentalId: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.rentForm.valid) {
      const { rentalId, userId } = this.rentForm.value;
      this.rentalService.rentBook(rentalId, userId).subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'Book has been rented successfully.',
            icon: 'success',
            confirmButtonColor: '#08b02f',
          }).then(() => {
            // this.router.navigate(['/home']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an error renting the book. Please try again.',
            icon: 'error',
            confirmButtonColor: '#d33',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill out all required fields.',
        icon: 'warning',
        confirmButtonColor: '#d33',
      });
    }
  }
}
