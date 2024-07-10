import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  dropdownOpen: string | null = null;

  toggleDropdown(type: string) {
    if (this.dropdownOpen === type) {
      this.dropdownOpen = null; // Close dropdown if already open
    } else {
      this.dropdownOpen = type; // Open selected dropdown
    }
  }
}
