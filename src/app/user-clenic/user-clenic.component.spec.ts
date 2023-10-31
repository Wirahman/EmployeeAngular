import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClenicComponent } from './user-clenic.component';

describe('UserClenicComponent', () => {
  let component: UserClenicComponent;
  let fixture: ComponentFixture<UserClenicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserClenicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClenicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
