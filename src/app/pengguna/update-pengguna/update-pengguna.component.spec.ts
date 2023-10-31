import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePenggunaComponent } from './update-pengguna.component';

describe('UpdatePenggunaComponent', () => {
  let component: UpdatePenggunaComponent;
  let fixture: ComponentFixture<UpdatePenggunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePenggunaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePenggunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
