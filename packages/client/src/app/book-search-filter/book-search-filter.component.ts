import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { BookService } from '../api/book.service';
import { Book } from '../models/book.model';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-search-filter',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, FormsModule, CommonModule],
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

  categories = [
    'Adventure',
    'Classics',
    'Crime',
    'Fantasy',
    'Horror',
    'Romance',
    'Comedy',
    'Food',
    'History',
    'Biography',
    'Science',
    'Self Help',
    'Thriller',
    'Mystery',
    'Children',
    'Science Fiction',
    'Poetry',
    'Drama',
    'Religion'
  ];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  searchBooks(form: any) {
    if (form.valid) {
      // Build the query object based on provided filters
      const query: any = {};
      if (this.bookID) query._id = this.bookID;
      if (this.title) query.title = this.title;
      if (this.author) query.author = this.author;
      if (this.category) query.category = this.category;

      this.bookService.searchBooks(query).subscribe(
        (books) => {
          this.books = books;
          if (books.length > 0) {
            this.showToast();
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              title: 'No books found!',
              icon: 'info',
            });
          }
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    }
  }

  showToast() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      title: 'Books Found!',
      icon: 'success',
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
