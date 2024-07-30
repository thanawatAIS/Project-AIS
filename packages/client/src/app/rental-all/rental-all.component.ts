import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { RentalService } from '../api/rental.service';
import { Rental } from '../models/rental.model';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-rental-all',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './rental-all.component.html',
  styleUrl: './rental-all.component.scss'
})
export class RentalAllComponent implements OnInit {
  rentals$: Observable<Rental[]> = of([]);

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.showLoadingAlert();
  }

  private showLoadingAlert(): void {
    Swal.fire({
      title: 'Loading Rentals...',
      html: 'Please wait while we fetch the rentals.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {},
    }).then(() => {
      this.loadRentals();
    });
  }

  private loadRentals(): void {
    this.rentals$ = this.rentalService.getAllRentals();
  }
}