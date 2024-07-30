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