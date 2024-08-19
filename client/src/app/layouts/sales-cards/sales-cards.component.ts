import { Component } from '@angular/core';
import { BigCardComponent } from '../../components/cards/product-cards/big-card/big-card.component';
import { SalesCardComponent } from '../../components/cards/product-cards/sales-card/sales-card.component';

@Component({
  selector: 'app-sales-cards',
  standalone: true,
  imports: [SalesCardComponent, BigCardComponent],
  templateUrl: './sales-cards.component.html',
  styleUrl: './sales-cards.component.css',
})
export class SalesCardsComponent {}
