import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { BookService } from '../api/book.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [
    RouterModule,
    NavBarComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.scss',
})
export class DeleteBookComponent {
  bookId: string = '';

  constructor(private bookService: BookService, private router: Router) {}

  deleteBook(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.role === 'admin') {
      if (!this.bookId) {
        Swal.fire({
          title: 'Error',
          text: 'Please provide a book ID.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
        return;
      }

      this.bookService.deleteBookById(this.bookId).subscribe(
        () => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Book has been deleted.',
            icon: 'success',
            confirmButtonColor: '#08b02f',
          }).then(() => {
            // this.router.navigate(['/home']);
          });
        },
        (error) => {
          console.error('Error deleting book:', error);
          Swal.fire({
            title: 'Error',
            text: 'There was an error deleting the book. Please try again.',
            icon: 'error',
            confirmButtonColor: '#d33',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Access Denied',
        text: 'You do not have permission to delete books.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  }
}
