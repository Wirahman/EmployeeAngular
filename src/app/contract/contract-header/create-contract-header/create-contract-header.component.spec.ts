import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractHeaderComponent } from './create-contract-header.component';

describe('CreateContractHeaderComponent', () => {
  let component: CreateContractHeaderComponent;
  let fixture: ComponentFixture<CreateContractHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContractHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
