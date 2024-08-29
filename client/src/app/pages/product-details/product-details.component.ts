import { NavbarComponent } from './../../layouts/navbar/navbar.component';
import { FooterComponent } from './../../layouts/footer/footer.component';
import { SecProductDetailsComponent } from './../../layouts/sec-product-details/sec-product-details.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [SecProductDetailsComponent, FooterComponent, NavbarComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {}
