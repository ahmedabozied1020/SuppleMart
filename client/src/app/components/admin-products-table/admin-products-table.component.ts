import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { EditButtonComponent } from '../buttons/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../buttons/delete-button/delete-button.component';

@Component({
  selector: 'app-admin-products-table',
  standalone: true,
  imports: [EditButtonComponent, DeleteButtonComponent],
  templateUrl: './admin-products-table.component.html',
  styleUrl: './admin-products-table.component.css',
})
export class AdminProductsTableComponent {
  @Input() paginatedProducts: Product[] | undefined;

  ngOnInit() {}
}
