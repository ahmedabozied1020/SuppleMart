import { Component } from '@angular/core';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { HeroSectionComponent } from '../../layouts/hero-section/hero-section.component';
import { CategoriesComponent } from '../../layouts/categories/categories.component';
import { SalesCardsComponent } from '../../layouts/sales-cards/sales-cards.component';
import { ReviewRealCustomersComponent } from '../../layouts/testimonials/review-real-customers.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { ProductsComponent } from '../../layouts/products/products.component';
import { MainProductCardComponent } from "../../components/cards/product-cards/main-product-card/main-product-card.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    CategoriesComponent,
    ProductsComponent,
    SalesCardsComponent,
    ReviewRealCustomersComponent,
    FooterComponent,
    MainProductCardComponent,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
