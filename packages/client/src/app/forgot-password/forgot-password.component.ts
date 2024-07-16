import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { LoginComponent } from '../login/login.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, LoginComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  constructor(private router: Router) {}

  showEmailSent() {
    Swal.fire({
      title: 'Email sent!',
      text: 'A reset token has been sent to your provided email.',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#08b02f'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/reset-password']);
      }
    });
  }
}
