import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePackageHeaderComponent } from './create-package-header.component';

describe('CreatePackageHeaderComponent', () => {
  let component: CreatePackageHeaderComponent;
  let fixture: ComponentFixture<CreatePackageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePackageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePackageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
