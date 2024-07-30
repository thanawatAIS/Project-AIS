import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RentalService } from '../api/rental.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rental-delete',
  standalone: true,
  imports: [
    RouterModule,
    NavBarComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './rental-delete.component.html',
  styleUrl: './rental-delete.component.scss',
})
export class RentalDeleteComponent {
  rentalId: string = '';

  constructor(
    private rentalService: RentalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      Swal.fire({
        title: 'Access Denied',
        text: 'You do not have permission to delete rentals.',
        icon: 'error',
        confirmButtonColor: '#d33',
      }).then(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  deleteRental(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.role === 'admin') {
      if (!this.rentalId) {
        Swal.fire({
          title: 'Error',
          text: 'Please provide a rental ID.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
        return;
      }

      this.rentalService.deleteRentalById(this.rentalId).subscribe(
        () => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Rental has been deleted.',
            icon: 'success',
            confirmButtonColor: '#08b02f',
          }).then(() => {
            this.router.navigate(['/home']);
          });
        },
        (error) => {
          console.error('Error deleting rental:', error);
          Swal.fire({
            title: 'Error',
            text: 'There was an error deleting the rental. Please try again.',
            icon: 'error',
            confirmButtonColor: '#d33',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Access Denied',
        text: 'You do not have permission to delete rentals.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  }
}