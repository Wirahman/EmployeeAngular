import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContractDetailComponent } from './update-contract-detail.component';

describe('UpdateContractDetailComponent', () => {
  let component: UpdateContractDetailComponent;
  let fixture: ComponentFixture<UpdateContractDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContractDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContractDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
