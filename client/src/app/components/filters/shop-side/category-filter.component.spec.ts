import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSideComponent } from './category-filter.component';

describe('ShopSideComponent', () => {
  let component: ShopSideComponent;
  let fixture: ComponentFixture<ShopSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopSideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
