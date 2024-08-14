import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainProductCardComponent } from './components/cards/product-cards/main-product-card/main-product-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
