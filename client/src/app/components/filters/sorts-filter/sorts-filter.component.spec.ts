import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortsFilterComponent } from './sorts-filter.component';

describe('SortsFilterComponent', () => {
  let component: SortsFilterComponent;
  let fixture: ComponentFixture<SortsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortsFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
