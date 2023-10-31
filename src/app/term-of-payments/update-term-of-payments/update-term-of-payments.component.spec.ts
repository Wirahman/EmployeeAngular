import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTermOfPaymentsComponent } from './update-term-of-payments.component';

describe('UpdateTermOfPaymentsComponent', () => {
  let component: UpdateTermOfPaymentsComponent;
  let fixture: ComponentFixture<UpdateTermOfPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTermOfPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTermOfPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
