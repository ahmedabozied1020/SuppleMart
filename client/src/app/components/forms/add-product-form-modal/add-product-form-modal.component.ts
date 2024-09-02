import { Component, Input, SimpleChanges } from '@angular/core';
import { RegisterButtonComponent } from '../../buttons/register-button/register-button.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AddProductButtonComponent } from '../../buttons/add-product-button/add-product-button.component';
import { AdminProductRequestsService } from '../../../services/http-requests/admin-product-requests/admin-product-requests.service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-add-product-form-modal',
  standalone: true,
  imports: [
    RegisterButtonComponent,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    RegisterButtonComponent,
    AddProductButtonComponent,
  ],
  templateUrl: './add-product-form-modal.component.html',
  styleUrl: './add-product-form-modal.component.css',
})
export class AddProductFormModalComponent {
  @Input() productToEdit!: Product | null;
  addProductForm!: FormGroup;
  submitted: boolean = false;
  noMatch: boolean = false;
  errorMessage!: string;
  selectedFile!: File;
  selectedFiles: any[] = [];
  categories: string[] = [
    'whey protein',
    'sports nutrition',
    'well-being',
    'weight loss',
    'food & drink',
    'vitamins',
    'vegan products',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private addProductRequestService: AdminProductRequestsService,
    private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm(product?: Product) {
    this.addProductForm = this.formBuilder.group({
      title: [product?.title || '', [Validators.required]],
      description: [
        product?.description || '',
        [Validators.required, Validators.maxLength(500)],
      ],
      price: [product?.price || '', [Validators.required, Validators.min(0)]],
      count: [product?.count || '', [Validators.required, Validators.min(0)]],
      categories: this.formBuilder.array(
        this.categories.map((category) =>
          product?.categories.includes(category) ? category : false
        )
      ),
      thumbnail: [null, product ? [] : [Validators.required]],
      images: [[], product ? [] : [Validators.required]],
    });
  }

  // Function to handle changes to the productToEdit input and initialize the form
  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit'] && this.productToEdit) {
      this.initializeForm(this.productToEdit);
    }
  }

  // Function to reset the form and clear productToEdit
  resetForm() {
    this.addProductForm.reset();
    this.categoriesArray.clear();
    this.categories.forEach(() =>
      this.categoriesArray.push(new FormControl(false))
    );
    this.productToEdit = null;
  }

  get title() {
    return this.addProductForm.get('title');
  }
  get description() {
    return this.addProductForm.get('description');
  }
  get price() {
    return this.addProductForm.get('price');
  }
  get count() {
    return this.addProductForm.get('count');
  }
  get categoriesArray() {
    return this.addProductForm.get('categories') as FormArray;
  }
  get thumbnailControl() {
    return this.addProductForm.get('thumbnail');
  }
  get imagesArray() {
    return this.addProductForm.get('images') as FormArray;
  }

  // Function to handle checkbox changes for categories
  onCheckboxChange(event: any) {
    const categoriesArray: FormArray = this.categoriesArray;
    const index = this.categories.indexOf(event.target.value);
    if (event.target.checked) {
      categoriesArray.at(index).setValue(event.target.value);
    } else {
      categoriesArray.at(index).setValue(false);
    }
  }

  // Function to get selected categories as an array of strings
  getSelectedCategories(): string[] {
    return this.categoriesArray.value.filter((value: any) => value);
  }

  // Function to handle single file selection for thumbnail
  onSingleFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Function to handle multiple file selection for images
  onMultipleFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  addProduct() {
    const formData = this.createFormData();
    this.addProductRequestService
      .addProduct(formData)
      .pipe(
        tap((msg) => {
          // if (msg?.success) {
          //   this.router.navigate(['/']);
          // }
        }),
        catchError((error) => {
          this.errorMessage =
            error?.error?.error ||
            'An error occurred while adding product, please try again';
          return of(null);
        })
      )
      .subscribe();
  }

  // Function to create FormData from form values
  createFormData(): FormData {
    const formData = new FormData();
    formData.append('title', this.title?.value);
    formData.append('description', this.description?.value);
    formData.append('price', this.price?.value);
    formData.append('count', this.count?.value);

    const categories = this.getSelectedCategories();
    for (let i = 0; i < categories.length; i++) {
      formData.append('categories[]', categories[i]);
    }

    if (this.selectedFile) {
      formData.append('thumbnail', this.selectedFile, this.selectedFile?.name);
    }

    if (this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append(
          'images',
          this.selectedFiles[i],
          this.selectedFiles[i].name
        );
      }
    }
    return formData;
  }

  editProduct() {
    if (!this.productToEdit) {
      console.error('No product to edit');
      return;
    }

    const formData = this.createFormData();

    this.addProductRequestService
      .editProduct(this.productToEdit._id, formData)
      .pipe(
        tap((msg) => {
          if (msg?.success) {
            this.router.navigate(['/products']);
          }
        }),
        catchError((error) => {
          this.errorMessage =
            error?.error?.error ||
            'An error occurred while editing product, please try again';
          return of(null);
        })
      )
      .subscribe();
  }

  handleSubmit() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }

    if (this.productToEdit) {
      this.editProduct();
    } else {
      this.addProduct();
    }
  }
}
