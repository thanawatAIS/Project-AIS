import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../api/auth.service';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-role',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
    NavBarComponent,
    FooterComponent,
    FormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss'],
})
export class AssignRoleComponent {
  userId: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  askRole() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.role === 'admin') {
      Swal.fire({
        title: 'Assign Role to this User?',
        text: 'Please make sure you assign the correct user.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#08b02f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, assign!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.assignRole(this.userId, this.role);
        }
      });
    } else {
      Swal.fire({
        title: 'Access Denied',
        text: 'You do not have permission to assign roles.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  }

  private assignRole(userId: string, role: string) {
    this.authService.assignRole(userId, role).subscribe(
      () => {
        Swal.fire({
          title: 'Assigned!',
          text: 'User role has been changed.',
          icon: 'success',
          confirmButtonColor: '#08b02f',
        }).then(() => {
          // this.router.navigate(['/']);
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'There was an error assigning the role. Please try again.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      }
    );
  }
}
