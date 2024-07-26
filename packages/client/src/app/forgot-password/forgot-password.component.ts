import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../login/login.component';
import Swal from 'sweetalert2';
import { AuthService } from '../api/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    RouterModule,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  email: string = '';
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.email) {
      this.showValidationAlert();
      return;
    }

    this.submitted = true;
    this.authService.forgotPassword(this.email).subscribe(
      () => {
        this.showResetPasswordSuccess();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 201) {
          this.showResetPasswordSuccess();
        } else {
          this.showResetPasswordError();
        }
      }
    );
  }

  showResetPasswordSuccess() {
    Swal.fire({
      title: 'Reset Password Email Sent',
      text: 'We have sent you a reset token to your email.',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#08b02f',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/reset-password']);
      }
    });
  }

  showResetPasswordError() {
    Swal.fire({
      title: 'Failed to Send Reset Token',
      text: 'Email is incorrect or there is a server error.',
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#d33',
    });
  }

  showValidationAlert() {
    Swal.fire({
      title: 'Please fill your email.',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#d33',
    });
  }
}
