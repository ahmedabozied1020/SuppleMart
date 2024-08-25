import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, ShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
