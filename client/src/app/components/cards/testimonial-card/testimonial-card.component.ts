import { StarReviewCustomersComponent } from '../star-review-customers/star-review-customers.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [StarReviewCustomersComponent],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.css',
})
export class TestimonialCardComponent {}
