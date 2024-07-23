import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { BookService } from '../api/book.service';
import { Book, Category } from '../models/book.model'; // Import Category enum
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
})
export class CreateBookComponent implements OnInit {
  title: string = '';
  description: string = '';
  author: string = '';
  price: number = 0;
  category: Category = Category.ADVENTURE; // Set a default value from the enum

  categories = Object.values(Category); // Populate categories from enum

  constructor(private bookService: BookService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        title: 'You are not authorized to access this page!',
        icon: 'error',
      }).then(() => {
        this.router.navigate(['/home']); // Redirect to an unauthorized page
      });
    }
  }

  onSubmit() {
    if (this.title && this.description && this.author && this.price >= 0 && this.category) {
      const newBook: Omit<Book, '_id' | 'user' | 'createdAt' | 'updatedAt'> = {
        title: this.title,
        description: this.description,
        author: this.author,
        price: this.price,
        category: this.category
      };
  
      this.bookService.createBook(newBook).subscribe(
        (book: Book) => { // Explicitly type the parameter
          console.log('Book created successfully', book);
          this.showSuccessToast();
          this.title = '';
          this.description = '';
          this.author = '';
          this.price = 0;
          this.category = Category.ADVENTURE;
        },
        (error: any) => { // Explicitly type the parameter
          console.error('Error creating book:', error);
          this.showErrorToast();
        }
      );
    } else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        title: 'Please fill all fields correctly!',
        icon: 'warning',
      });
    }
  }

  showSuccessToast() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      title: 'Book Created Successfully!',
      icon: 'success',
    });
  }

  showErrorToast() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      title: 'Failed to Create Book!',
      icon: 'error',
    });
  }
}
