import { Component } from '@angular/core';
import { AddProductFormModalComponent } from '../../forms/add-product-form-modal/add-product-form-modal.component';

@Component({
  selector: 'app-add-product-button',
  standalone: true,
  imports: [AddProductFormModalComponent],
  templateUrl: './add-product-button.component.html',
  styleUrl: './add-product-button.component.css',
})
export class AddProductButtonComponent {}
