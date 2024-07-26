import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { BookService } from '../api/book.service';
import { Book, Category } from '../models/book.model';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-search-filter',
  standalone: true,
  imports: [
    RouterModule,
    NavBarComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './book-search-filter.component.html',
  styleUrls: ['./book-search-filter.component.scss'],
})
export class BookSearchFilterComponent implements OnInit {
  bookID: string = '';
  title: string = '';
  author: string = '';
  category: string = '';
  books: Book[] = [];
  showCategoryDropdown = false;

  categories = Object.values(Category);

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  searchBooks(form: any) {
    if (form.valid) {
      if (this.bookID) {
        // Specific search by ID
        this.bookService.findBookById(this.bookID.trim()).subscribe(
          (book) => {
            this.books = book ? [book] : [];
            this.showResultsToast(this.books.length > 0);
          },
          (error) => {
            console.error('Error fetching book by ID:', error);
            this.books = [];
            this.showResultsToast(false);
          }
        );
      } else {
        // General search by other fields
        const query: any = {};
        if (this.title) query.title = this.title.trim();
        if (this.author) query.author = this.author.trim();
        if (this.category) query.category = this.category.trim();

        this.bookService.searchBooks(query).subscribe(
          (books) => {
            this.books = books;
            this.showResultsToast(books.length > 0);
          },
          (error) => {
            console.error('Error fetching books:', error);
            this.books = [];
            this.showResultsToast(false);
          }
        );
      }
    }
  }

  showResultsToast(hasResults: boolean) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      title: hasResults ? 'Books Found!' : 'No books found!',
      icon: hasResults ? 'success' : 'error',
    });
  }

  toggleCategoryDropdown() {
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

  selectCategory(category: string) {
    this.category = category;
    this.showCategoryDropdown = false;
  }
}
