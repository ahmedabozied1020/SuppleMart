import { Component } from '@angular/core';

@Component({
  selector: 'app-sec-product-details',
  standalone: true,
  imports: [],
  templateUrl: './sec-product-details.component.html',
  styleUrl: './sec-product-details.component.css',
})
export class SecProductDetailsComponent {
  count: number = 1;
  increase() {
    this.count++;
  }
  decrease() {
    this.count--;
    if (this.count < 1) {
      this.count = 1;
    } 
  }
}
