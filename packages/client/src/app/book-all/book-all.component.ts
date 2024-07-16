import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-book-all',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './book-all.component.html',
  styleUrl: './book-all.component.scss'
})
export class BookAllComponent {

}
