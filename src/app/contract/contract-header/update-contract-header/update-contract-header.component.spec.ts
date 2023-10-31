import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContractHeaderComponent } from './update-contract-header.component';

describe('UpdateContractHeaderComponent', () => {
  let component: UpdateContractHeaderComponent;
  let fixture: ComponentFixture<UpdateContractHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContractHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContractHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
