import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTermOfPaymentsComponent } from './create-term-of-payments.component';

describe('CreateTermOfPaymentsComponent', () => {
  let component: CreateTermOfPaymentsComponent;
  let fixture: ComponentFixture<CreateTermOfPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTermOfPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTermOfPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
