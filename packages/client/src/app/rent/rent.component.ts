import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RentalService } from '../api/rental.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';
import { RentalAllComponent } from "../rental-all/rental-all.component";

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NavBarComponent,
    FooterComponent,
    RouterModule,
    RentalAllComponent
],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss',
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
      userId: ['', Validators.required], // Ensure this matches the form control in the HTML
    });
  }

  onSubmit() {
    if (this.rentForm.valid) {
      const { rentalId, userId } = this.rentForm.value;
      this.rentalService.rentBook(rentalId, { user: userId }).subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'Book has been rented successfully.',
            icon: 'success',
            confirmButtonColor: '#08b02f',
          }).then(() => {
            // Uncomment and adjust as needed
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
