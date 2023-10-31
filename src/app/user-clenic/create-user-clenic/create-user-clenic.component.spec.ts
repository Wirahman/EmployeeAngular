import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserClenicComponent } from './create-user-clenic.component';

describe('CreateUserClenicComponent', () => {
  let component: CreateUserClenicComponent;
  let fixture: ComponentFixture<CreateUserClenicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserClenicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserClenicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
