import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';
import { AuthService } from '../api/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.showValidationAlert();
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (response: { token: string }) => {
        localStorage.setItem('token', response.token);
        this.showWelcomeLogin();
      },
      (error: any) => {
        this.showNotWelcomeLogin();
      }
    );
  }

  showWelcomeLogin() {
    Swal.fire({
      title: 'Login Successful!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#08b02f',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/profile']);
      }
    });
  }

  showNotWelcomeLogin() {
    Swal.fire({
      title: 'Incorrect Password',
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
