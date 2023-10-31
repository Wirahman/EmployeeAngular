import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserClenicComponent } from './update-user-clenic.component';

describe('UpdateUserClenicComponent', () => {
  let component: UpdateUserClenicComponent;
  let fixture: ComponentFixture<UpdateUserClenicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserClenicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserClenicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
