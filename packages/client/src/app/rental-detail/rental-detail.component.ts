import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../api/rental.service';
import { Rental } from '../models/rental.model';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rental-detail',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './rental-detail.component.html',
  styleUrl: './rental-detail.component.scss'
})
export class RentalDetailComponent implements OnInit {
  rental: Rental | undefined;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    const rentalId = this.route.snapshot.paramMap.get('id');
    if (rentalId) {
      this.rentalService.getRentalById(rentalId).subscribe((rental) => {
        this.rental = rental;
      });
    }
  }
}
