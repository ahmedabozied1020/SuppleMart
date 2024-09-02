import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProduct } from '../../../interfaces/cart-product';

@Injectable({
  providedIn: 'root',
})
export class CartProductsService {
  private cartProducts: BehaviorSubject<CartProduct[]> = new BehaviorSubject<
    CartProduct[]
  >([]);

  constructor() {}

  getCartProducts(): Observable<CartProduct[]> {
    return this.cartProducts.asObservable();
  }

  addCartProduct(productId: string, quantity: number): void {
    const currentProducts = this.cartProducts.getValue();
    const productIndex = currentProducts.findIndex(
      (prod) => prod.productId === productId
    );

    if (productIndex === -1) {
      currentProducts.push({ productId, quantity });
    } else {
      currentProducts[productIndex].quantity += quantity;
    }

    this.cartProducts.next(currentProducts);
  }

  updateCartProductQuantity(productId: string, newQuantity: number): void {
    const currentProducts = this.cartProducts.getValue();
    const productIndex = currentProducts.findIndex(
      (prod) => prod.productId === productId
    );
    if (productIndex === -1) {
      throw new Error('this product is not in the cart');
    } else {
      currentProducts[productIndex].quantity = newQuantity;
    }

    this.cartProducts.next(currentProducts);
  }

  deleteCartProduct(productId: string): void {
    const currentProducts = this.cartProducts.getValue();
    const productIndex = currentProducts.findIndex(
      (prod) => prod.productId === productId
    );
    if (productIndex === -1) {
      throw new Error('this product is not in the cart');
    } else {
      currentProducts.splice(productIndex, 1);
    }

    this.cartProducts.next(currentProducts);
  }
}
