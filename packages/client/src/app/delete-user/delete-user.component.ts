import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
    NavBarComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
  userId: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  deleteUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.role === 'admin') {
      if (!this.userId) {
        Swal.fire({
          title: 'Error',
          text: 'Please provide a user ID.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
        return;
      }

      this.authService.deleteUserById(this.userId).subscribe(
        () => {
          Swal.fire({
            title: 'Deleted!',
            text: 'User has been deleted.',
            icon: 'success',
            confirmButtonColor: '#08b02f',
          }).then(() => {
            this.router.navigate(['/delete-user']);
          });
        },
        (error) => {
          console.error('Error deleting user:', error);
          Swal.fire({
            title: 'Error',
            text: 'There was an error deleting the user. Please try again.',
            icon: 'error',
            confirmButtonColor: '#d33',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Access Denied',
        text: 'You do not have permission to delete users.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  }
}
