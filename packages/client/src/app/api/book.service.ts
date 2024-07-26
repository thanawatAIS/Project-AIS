import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000';

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

  createBook(
    book: Omit<Book, '_id' | 'user' | 'createdAt' | 'updatedAt'>
  ): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books/create`, book);
  }

  searchBooks(query: any): Observable<Book[]> {
    console.log('Query being sent:', query);
    let params = new HttpParams();

    if (query._id) params = params.set('_id', query._id);
    if (query.title) params = params.set('title', query.title);
    if (query.author) params = params.set('author', query.author);
    if (query.category) params = params.set('category', query.category);

    return this.http.get<Book[]>(`${this.apiUrl}/books/search`, { params });
  }

  // Fetch a book by ID
  findBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/search/${id}`);
  }

  // Update a book by ID
  updateBookById(id: string, updatedBook: Partial<Book>): Observable<Book> {
    console.log(
      `Updating book with ID: ${id} at URL: ${this.apiUrl}/books/update/${id}`
    );
    return this.http
      .put<Book>(`${this.apiUrl}/books/update/${id}`, updatedBook)
      .pipe(
        catchError((error) => {
          console.error('Update failed', error);
          return throwError(error);
        })
      );
  }

  // Delete a book by ID
  deleteBookById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/delete/${id}`);
  }
}
