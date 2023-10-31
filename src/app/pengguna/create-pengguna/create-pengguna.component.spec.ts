import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePenggunaComponent } from './create-pengguna.component';

describe('CreatePenggunaComponent', () => {
  let component: CreatePenggunaComponent;
  let fixture: ComponentFixture<CreatePenggunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePenggunaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePenggunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
