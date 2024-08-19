import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutineButtonComponent } from './outine-button.component';

describe('OutineButtonComponent', () => {
  let component: OutineButtonComponent;
  let fixture: ComponentFixture<OutineButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutineButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutineButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
