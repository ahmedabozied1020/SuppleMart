import { Component } from '@angular/core';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { ReviewRealCustomersComponent } from '../../layouts/testimonials/review-real-customers.component';
import { SalesCardsComponent } from '../../layouts/sales-cards/sales-cards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ReviewRealCustomersComponent, SalesCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
