import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-role',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './assign-role.component.html',
  styleUrl: './assign-role.component.scss'
})
export class AssignRoleComponent {
  constructor(private router: Router) {}

  askRole() {
    Swal.fire({
      title: 'Assign Role to this User?',
      text: "Please make sure you assign the correct user.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#08b02f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, assign!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Assigned!',
          text: 'User role has been changed.',
          icon: 'success',
          confirmButtonColor: '#08b02f',
        }).then(() => {
          // this.router.navigate(['/']);
        });
      }
    });
  }
}
