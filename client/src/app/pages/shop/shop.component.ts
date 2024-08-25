import { Component } from '@angular/core';
import { FiltersComponent } from '../../layouts/filters/filters.component';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FiltersComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {}
