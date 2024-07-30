import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental.model';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.apiUrl}/rental/all`);
  }

  createRental(rental: { bookID: string; rentDate: string; returnDate?: string }): Observable<Rental> {
    return this.http.post<Rental>(`${this.apiUrl}/rental/create`, rental);
  }

  getRentalById(id: string): Observable<Rental> {
    return this.http.get<Rental>(`${this.apiUrl}/rental/${id}`);
  }

  rentBook(rentalId: string, rentalDto: { user: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/rental/rent/${rentalId}`, rentalDto);
  }

  returnBook(returnId: string, rentalDto: { user: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/rental/return/${returnId}`, rentalDto);
  }
}
