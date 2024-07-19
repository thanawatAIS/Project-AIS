import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../api/book.service';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-all',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, HttpClientModule, CommonModule],
  templateUrl: './book-all.component.html',
  styleUrl: './book-all.component.scss'
})
export class BookAllComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private bookService: BookService) {
    this.books$ = new Observable<Book[]>();
  }

  ngOnInit(): void {
    // Fetch all books without any filters
    this.books$ = this.bookService.getAllBooks();
  }

}
