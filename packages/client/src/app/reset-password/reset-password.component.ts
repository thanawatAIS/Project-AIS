import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  constructor(private router: Router) {}

  askResetPassword() {
    Swal.fire({
      title: 'Reset the password?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#08b02f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Changed!',
          text: 'Your password has been changed.',
          icon: 'success',
          confirmButtonColor: '#08b02f',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
