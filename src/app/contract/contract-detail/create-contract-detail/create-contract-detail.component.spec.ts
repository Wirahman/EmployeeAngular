import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractDetailComponent } from './create-contract-detail.component';

describe('CreateContractDetailComponent', () => {
  let component: CreateContractDetailComponent;
  let fixture: ComponentFixture<CreateContractDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContractDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
