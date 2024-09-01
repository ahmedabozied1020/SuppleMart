import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { EditButtonComponent } from '../buttons/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../buttons/delete-button/delete-button.component';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { AdminDeleteProductService } from '../../services/http-requests/admin-delete-product/admin-delete-product.service';

@Component({
  selector: 'app-admin-products-table',
  standalone: true,
  imports: [EditButtonComponent, DeleteButtonComponent],
  templateUrl: './admin-products-table.component.html',
  styleUrl: './admin-products-table.component.css',
})
export class AdminProductsTableComponent {
  @Input() paginatedProducts: Product[] | undefined;
  deletedProductId!: string;

  errorMessage: any;
  my_modal_2: any;

  constructor(
    private adminDeleteProductService: AdminDeleteProductService,
    private router: Router
  ) {}

  handleDelete(id: string) {
    this.deletedProductId = id;
  }

  onSubmit = () => {
    this.adminDeleteProductService
      .deleteProduct(this.deletedProductId)
      .pipe(
        tap((msg) => {
          if (msg?.success) {
            // this.router.navigate(['/']);
          }
        }),
        catchError((error) => {
          this.errorMessage =
            error?.error?.error ||
            'An error occurred while deleting product, please try again';
          return of(null);
        })
      )
      .subscribe();
  };
}
