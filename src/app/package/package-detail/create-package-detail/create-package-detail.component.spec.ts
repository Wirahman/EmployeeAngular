import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePackageDetailComponent } from './create-package-detail.component';

describe('CreatePackageDetailComponent', () => {
  let component: CreatePackageDetailComponent;
  let fixture: ComponentFixture<CreatePackageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePackageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePackageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
