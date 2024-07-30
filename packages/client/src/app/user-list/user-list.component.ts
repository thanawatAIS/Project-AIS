import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent, FooterComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
}
