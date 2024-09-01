import { Component, input } from '@angular/core';
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
  // imagesFiles!: FileList;

  constructor(
    private formBuilder: FormBuilder,
    private addProductRequestService: AdminProductRequestsService,
    private router: Router
  ) {
    this.addProductForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0)]],
      count: ['', [Validators.required, Validators.min(0)]],
      categories: this.formBuilder.array([]),
      thumbnail: [null, [Validators.required]],
      images: [[], [Validators.required]],
    });
    this.addCategoryControls();
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

  private addCategoryControls() {
    this.categories.forEach(() =>
      this.categoriesArray.push(new FormControl(false))
    );
  }

  onCheckboxChange(event: any) {
    const categoriesArray: FormArray = this.categoriesArray;
    const index = this.categories.indexOf(event.target.value);
    if (event.target.checked) {
      categoriesArray.at(index).setValue(event.target.value);
    } else {
      categoriesArray.at(index).setValue(false);
    }
  }

  getSelectedCategories(): string[] {
    return this.categoriesArray.value.filter((value: any) => value);
  }

  onSingleFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onMultipleFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      // this.addProductForm.patchValue({ images: this.selectedFiles });
    }
  }

  handleSubmit = () => {
    this.submitted = true;
    console.log(this.title?.value);
    console.log(this.description?.value);
    console.log(this.description?.value);
    if (
      !this.title?.errors &&
      !this.description?.errors &&
      !this.price?.errors &&
      !this.count?.errors &&
      !this.thumbnailControl?.errors
    ) {
      const title = this.title?.value;
      console.log(title);
      console.log(this.selectedFile);

      const description = this.description?.value;
      const price = this.price?.value;
      const count = this.count?.value;
      // const thumbnail = this.thumbnailControl?.value;
      // const images = this.images?.value;
      const categories = this.getSelectedCategories();

      const formData = new FormData();
      formData.set('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('count', count);
      formData.append('thumbnail', this.selectedFile, this.selectedFile?.name);
      // formData.append('categories', JSON.stringify(categories));

      for (let i = 0; i < categories.length; i++) {
        formData.append('categories', categories[i]);
      }

      console.log(this.selectedFiles);
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append(
          'images',
          this.selectedFiles[i],
          this.selectedFiles[i].name
        );
      }

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      this.addProductRequestService
        .addProduct(formData)
        .pipe(
          tap((msg) => {
            if (msg?.success) {
              this.router.navigate(['/']);
            }
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
  };
}
