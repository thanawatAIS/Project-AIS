import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { selectUser } from '../selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../api/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'], // Use styleUrls for multiple style files
})
export class NavBarComponent implements OnInit {
  searchTerm: string = '';
  dropdownOpen: string | null = null;
  user$: Observable<User | null>;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      // console.log('User observable emitted:', user);
      if (user) {
        // console.log('User name:', user.name);
      } else {
        // console.log('User is null');
      }
    });
  }

  search(): void {
    const trimmedSearchTerm = this.searchTerm.trim().toLowerCase();
    let route: string;

    switch (trimmedSearchTerm) {
      case 'home':
        route = '/home';
        break;
      case 'login':
        route = '/login';
        break;
      case 'register':
        route = '/register';
        break;
      case 'reset':
        route = '/reset-password';
        break;
      case 'forget':
        route = '/forgot-password';
        break;
      case 'books':
        route = '/book-all';
        break;
      case 'search':
        route = '/book-search-filter';
        break;
      case 'book':
        route = '/book-all';
        break;
      case 'assign role':
        route = '/assign-role';
        break;
      case 'delete user':
        route = '/delete-user';
        break;
      case 'create book':
        route = '/create-book';
        break;
      case 'update book':
        route = '/update-book';
        break;
      case 'delete book':
        route = '/delete-book';
        break;
      default:
        route = '/home';
        break;
    }

    this.router.navigate([route]);
  }

  toggleDropdown(type: string): void {
    this.dropdownOpen = this.dropdownOpen === type ? null : type;
  }

  logout(): void {
    Swal.fire({
      title: 'You really want to Logout?',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#08b02f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Bye :(',
          text: "You'll be redirect to Home.",
          icon: 'success',
          confirmButtonColor: '#08b02f',
        }).then(() => {
          this.router.navigate(['/home']);
          this.authService.logout();
        });
      }
    });
  }
}
