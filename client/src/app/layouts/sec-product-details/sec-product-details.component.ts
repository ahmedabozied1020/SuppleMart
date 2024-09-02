import { of, tap, catchError, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../../interfaces/product';
import { Component, Input } from '@angular/core';
import { ProductRequestsService } from '../../services/http-requests/product-requests/product-requests.service';

@Component({
  selector: 'app-sec-product-details',
  standalone: true,
  imports: [],
  templateUrl: './sec-product-details.component.html',
  styleUrl: './sec-product-details.component.css',
})
export class SecProductDetailsComponent {
  constructor(
    private productRequestService: ProductRequestsService,

    private route: ActivatedRoute
  ) {}
  private subscription!: Subscription;
  product!: Product;
  errorMessage: any;
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

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const productId = params['id'];
      this.getProductById(productId);
    });
  }

  getProductById(productId: string) {
    this.subscription = this.productRequestService
      .getProductById(productId)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.product = response.product;
            console.log('Product updated:', this.product);
          } else {
            this.errorMessage =
              response.error || 'Failed to fetch product details';
            console.error('Error:', this.errorMessage);
          }
        }),
        catchError((error) => {
          this.errorMessage =
            error?.message ||
            'An error occurred while fetching product details, please try again';
          console.error('Error:', this.errorMessage);
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
