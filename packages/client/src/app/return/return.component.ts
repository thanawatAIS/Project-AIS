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

@Component({
  selector: 'app-return',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NavBarComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './return.component.html',
  styleUrl: './return.component.scss',
})
export class ReturnComponent {
  returnForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rentalService: RentalService,
    private router: Router
  ) {
    this.returnForm = this.fb.group({
      returnId: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.returnForm.valid) {
      const { returnId, userId } = this.returnForm.value;
      this.rentalService.returnBook(returnId, { user: userId }).subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'Book has been returned successfully.',
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
            text: 'There was an error returning the book. Please try again.',
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
