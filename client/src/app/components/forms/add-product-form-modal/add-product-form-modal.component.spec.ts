import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductFormModalComponent } from './add-product-form-modal.component';

describe('AddProductFormModalComponent', () => {
  let component: AddProductFormModalComponent;
  let fixture: ComponentFixture<AddProductFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
