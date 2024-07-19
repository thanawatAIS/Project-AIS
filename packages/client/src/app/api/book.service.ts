import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000'; // Base URL

  constructor(private http: HttpClient) {}

  getAllBooks(params?: any): Observable<Book[]> {
    let queryParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        queryParams = queryParams.append(key, params[key]);
      });
    }
    return this.http.get<Book[]>(`${this.apiUrl}/books/all`, { params: queryParams });
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
}
