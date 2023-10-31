import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermOfPaymentsComponent } from './term-of-payments.component';

describe('TermOfPaymentsComponent', () => {
  let component: TermOfPaymentsComponent;
  let fixture: ComponentFixture<TermOfPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermOfPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermOfPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
