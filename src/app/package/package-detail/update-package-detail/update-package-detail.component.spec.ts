import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePackageDetailComponent } from './update-package-detail.component';

describe('UpdatePackageDetailComponent', () => {
  let component: UpdatePackageDetailComponent;
  let fixture: ComponentFixture<UpdatePackageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePackageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePackageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
