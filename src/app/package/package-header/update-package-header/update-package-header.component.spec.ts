import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePackageHeaderComponent } from './update-package-header.component';

describe('UpdatePackageHeaderComponent', () => {
  let component: UpdatePackageHeaderComponent;
  let fixture: ComponentFixture<UpdatePackageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePackageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePackageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
