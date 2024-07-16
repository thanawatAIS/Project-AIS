import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { BookAllComponent } from './book-all/book-all.component';
import { BookSearchFilterComponent } from './book-search-filter/book-search-filter.component';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { RentalAllComponent } from './rental-all/rental-all.component';
import { RentalIdComponent } from './rental-id/rental-id.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'book-all',
    component: BookAllComponent,
  },
  {
    path: 'book-search-filter',
    component: BookSearchFilterComponent,
  },
  {
    path: 'assign-role',
    component: AssignRoleComponent,
  },
  {
    path: 'rental-all',
    component: RentalAllComponent,
  },
  {
    path: 'rental-id',
    component: RentalIdComponent,
  },
];
