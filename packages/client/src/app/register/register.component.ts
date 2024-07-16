import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../login/login.component';
import Swal from 'sweetalert2';
import { AuthService } from '../api/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.name || !this.email || !this.password) {
      this.showValidationAlert();
      return;
    }

    this.authService
      .signUp({ name: this.name, email: this.email, password: this.password })
      .subscribe(
        (response: { token: string }) => {
          localStorage.setItem('token', response.token);
          // this.router.navigate(['/login']);
          this.showWelcomeRegis();
        },
        (error: any) => {
          this.showNotWelcomeRegis();
        }
      );
  }

  showWelcomeRegis() {
    Swal.fire({
      title: 'Thank You For Registration.',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#08b02f',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }

  showNotWelcomeRegis() {
    Swal.fire({
      title: 'You need to fill out everything.',
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#d33',
    });
  }

  showValidationAlert() {
    Swal.fire({
      title: 'Please enter email and password.',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#d33',
    });
  }
}
