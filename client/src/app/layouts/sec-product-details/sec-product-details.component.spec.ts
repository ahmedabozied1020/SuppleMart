import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecProductDetailsComponent } from './sec-product-details.component';

describe('SecProductDetailsComponent', () => {
  let component: SecProductDetailsComponent;
  let fixture: ComponentFixture<SecProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecProductDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
