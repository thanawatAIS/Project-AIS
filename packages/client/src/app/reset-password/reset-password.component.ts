import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetToken: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.resetToken || !this.email || !this.password) {
      this.showValidationAlert();
      return;
    }

    this.authService
      .resetPassword({
        email: this.email,
        passwordResetToken: this.resetToken,
        password: this.password,
      })
      .subscribe(
        (response: { token: string }) => {
          localStorage.setItem('token', response.token);
          this.showResetPasswordSuccess();
        },
        (error: any) => {
          this.showResetPasswordError();
        }
      );
  }

  showResetPasswordSuccess() {
    Swal.fire({
      title: 'Password Reset Successful!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#08b02f',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }

  showResetPasswordError() {
    Swal.fire({
      title: 'Error resetting password.',
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
