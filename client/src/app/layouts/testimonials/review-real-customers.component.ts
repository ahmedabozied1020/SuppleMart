import { Component } from '@angular/core';
import { TestimonialCardComponent } from '../../components/cards/testimonial-card/testimonial-card.component';

@Component({
  selector: 'app-review-real-customers',
  standalone: true,
  imports: [TestimonialCardComponent],
  templateUrl: './review-real-customers.component.html',
  styleUrl: './review-real-customers.component.css',
})
export class ReviewRealCustomersComponent {}
