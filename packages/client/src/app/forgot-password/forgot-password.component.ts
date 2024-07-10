import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, LoginComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

}
