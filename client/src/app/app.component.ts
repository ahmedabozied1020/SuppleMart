import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ShopSideComponent } from './components/filters/category-filter/category-filter.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, ShopSideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
