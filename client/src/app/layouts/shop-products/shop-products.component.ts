import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces/product';
import { ProductRequestsService } from '../../services/http-requests/product-requests/product-requests.service';
import { MainProductCardComponent } from '../../components/cards/product-cards/main-product-card/main-product-card.component';
import { OutlinedButtonComponent } from '../../components/buttons/outlined-button/outlined-button.component';

@Component({
  selector: 'app-shop-products',
  standalone: true,
  imports: [MainProductCardComponent, OutlinedButtonComponent],
  templateUrl: './shop-products.component.html',
  styleUrl: './shop-products.component.css',
})
export class ShopProductsComponent {
  products!: Product[];
  private subscription!: Subscription;

  constructor(private productRequestsService: ProductRequestsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.subscription = this.productRequestsService
        .getProducts()
        .subscribe((prods) => {
          this.products = prods;
        });
    }, 1000);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
