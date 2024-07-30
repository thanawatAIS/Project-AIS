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
import { AdminGuard } from './roles/roles.guard';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { Component } from '@angular/core';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentComponent } from './rent/rent.component';
import { ReturnComponent } from './return/return.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalDeleteComponent } from './rental-delete/rental-delete.component';

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
    canActivate: [AdminGuard],
  },
  {
    path: 'rental-all',
    component: RentalAllComponent,
  },
  {
    path: 'rental/:id',
    component: RentalDetailComponent,
  },
  {
    path: 'delete-user',
    component: DeleteUserComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'create-book',
    component: CreateBookComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'update-book',
    component: UpdateBookComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'delete-book',
    component: DeleteBookComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'rent-book',
    component: RentComponent,
  },
  {
    path: 'return-book',
    component: ReturnComponent,
  },
  {
    path: 'rental-create',
    component: RentalCreateComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'rental-delete',
    component: RentalDeleteComponent,
    canActivate: [AdminGuard],
  },
];
