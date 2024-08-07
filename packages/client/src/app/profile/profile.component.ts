import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';
import { AuthService } from '../api/auth.service';

import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { selectUser } from '../selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

import { BookService } from '../api/book.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  ngOnInit() {
    this.user$.subscribe((user) => {
      // console.log('User observable emitted:', user);
      if (user) {
        // console.log('User name:', user.name);
      } else {
        // console.log('User is null');
      }
    });
    // Fetch the total book count
    this.bookService.getBookCount().subscribe(
      (response) => {
        this.bookCount = response.count;
      },
      (error) => {
        console.error('Error fetching book count', error);
      }
    );

    this.authService.getUserCount().subscribe(
      (response) => {
        this.userCount = response.count;
      },
      (error) => {
        console.error('Error fetching user count', error);
      }
    );
  }

  user$: Observable<User | null>;
  bookCount: number = 0;
  userCount: number = 0;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private bookService: BookService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  askLogout() {
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
