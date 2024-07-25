import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../api/book.service';
import { Book, Category } from '../models/book.model';
import Swal from 'sweetalert2';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.scss'
})
export class UpdateBookComponent implements OnInit {
  bookID: string = '';
  book: Partial<Book> = {
    _id: '',
    title: '',
    description: '',
    author: '',
    price: 0,
    category: Category.ADVENTURE
  };

  categories = Object.values(Category);

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBook();

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      Swal.fire({
        title: 'Access Denied',
        text: 'You do not have permission to update book.',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        
      }).then(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  fetchBook(): void {
    if (this.bookID) {
      this.bookService.findBookById(this.bookID).subscribe((book: Book) => {
        this.book = book;
      }, (error) => {
        Swal.fire('Error', 'Book not found!', 'error');
      });
    }
  }

  onSubmit(): void {
    if (this.book._id) {
      this.bookService.updateBookById(this.book._id, this.book).subscribe(
        () => {
          Swal.fire('Success', 'Book updated successfully!', 'success');
          // this.router.navigate(['/home']);
        },
        (error) => {
          Swal.fire('Error', 'Failed to update book!', 'error');
        }
      );
    }
  }
}
