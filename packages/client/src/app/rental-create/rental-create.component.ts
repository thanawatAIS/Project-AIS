import { Component } from '@angular/core';
import { RentalService } from '../api/rental.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rental-create',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './rental-create.component.html',
  styleUrl: './rental-create.component.scss'
})
export class RentalCreateComponent {
  bookID: string = '';
  rentDate: string = 'YYYY-MM-DD';
  returnDate: string = 'YYYY-MM-DD';

  constructor(private rentalService: RentalService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      Swal.fire({
        title: 'Access Denied',
        text: 'You do not have permission to create rentals.',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  onSubmit() {
    if (!this.bookID || !this.rentDate || !this.returnDate) {
      this.showValidationAlert();
      return;
    }

    const rentalData = {
      bookID: this.bookID,
      rentDate: this.rentDate,
      returnDate: this.returnDate
    };

    this.rentalService.createRental(rentalData).subscribe(
      response => {
        this.showRentalSuccess();
      },
      error => {
        this.showRentalError();
      }
    );
  }

  showRentalSuccess() {
    Swal.fire({
      title: 'Rental Created Successfully!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#08b02f',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.router.navigate(['/home']);
      }
    });
  }

  showRentalError() {
    Swal.fire({
      title: 'Error Creating Rental',
      text: 'Please try again.',
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#d33',
    });
  }

  showValidationAlert() {
    Swal.fire({
      title: 'Please fill in all fields.',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#d33',
    });
  }
}
