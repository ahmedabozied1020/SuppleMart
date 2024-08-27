import { CartComponent } from './pages/cart/cart.component';
import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { FiltersComponent } from './layouts/filters/filters.component';
import { CartComponent } from './pages/cart/cart.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, FiltersComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
