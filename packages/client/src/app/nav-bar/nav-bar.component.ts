import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { selectUser } from '../selectors/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  dropdownOpen: string | null = null;

  toggleDropdown(type: string) {
    if (this.dropdownOpen === type) {
      this.dropdownOpen = null; // Close dropdown if already open
    } else {
      this.dropdownOpen = type; // Open selected dropdown
    }
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      console.log('User observable emitted:', user);
      if (user) {
        console.log('User name:', user.name);
      } else {
        console.log('User is null');
      }
    });
  }

  user$: Observable<User | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
  }
}
