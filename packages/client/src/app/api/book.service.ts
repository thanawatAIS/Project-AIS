import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000'; // Base URL

  constructor(private http: HttpClient) {}

  getAllBooks(params?: any): Observable<Book[]> {
    let queryParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        queryParams = queryParams.append(key, params[key]);
      });
    }
    return this.http.get<Book[]>(`${this.apiUrl}/books/all`, {
      params: queryParams,
    });
  }

  createBook(book: Omit<Book, '_id' | 'user' | 'createdAt' | 'updatedAt'>): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books/create`, book);
  }

  //   getBookById(id: string): Observable<Book> {
  //     return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  //   }

  //   createBook(newBook: Book): Observable<Book> {
  //     return this.http.post<Book>(`${this.apiUrl}/books`, newBook);
  //   }

  //   updateBook(id: string, updatedBook: Book): Observable<Book> {
  //     return this.http.put<Book>(`${this.apiUrl}/books/${id}`, updatedBook);
  //   }

  //   deleteBook(id: string): Observable<void> {
  //     return this.http.delete<void>(`${this.apiUrl}/books/${id}`);
  //   }

  searchBooks(query: any): Observable<Book[]> {
    let params = new HttpParams();

    if (query.keyword) params = params.set('keyword', query.keyword);
    if (query.title) params = params.set('title', query.title);
    if (query.author) params = params.set('author', query.author);
    if (query.category) params = params.set('category', query.category);
    if (query.page) params = params.set('page', query.page);

    return this.http.get<Book[]>(`${this.apiUrl}/books/search`, { params });
  }

  // Fetch a book by ID
  findBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/search/${id}`);
  }

  // Update a book by ID
  updateBookById(id: string, updatedBook: Partial<Book>): Observable<Book> {
    console.log(`Updating book with ID: ${id} at URL: ${this.apiUrl}/books/update/${id}`); // Debugging log
    return this.http.put<Book>(`${this.apiUrl}/books/update/${id}`, updatedBook).pipe(
      catchError(error => {
        console.error('Update failed', error); // Log any error that occurs
        return throwError(error);
      })
    );
  }
}