import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../api/book.service';
import { Book } from '../models/book.model';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-all',
  standalone: true,
  imports: [
    RouterModule,
    NavBarComponent,
    FooterComponent,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './book-all.component.html',
  styleUrls: ['./book-all.component.scss'],
})
export class BookAllComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private bookService: BookService) {
    this.books$ = of([]);
  }

  ngOnInit(): void {
    this.showLoadingAlert();
  }

  private showLoadingAlert(): void {
    Swal.fire({
      title: 'Loading Books...',
      html: 'Please wait while we fetch the books.',
      timer: 800,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {},
    }).then(() => {
      this.loadBooks();
    });
  }

  private loadBooks(): void {
    this.books$ = this.bookService.getAllBooks();
  }
}
