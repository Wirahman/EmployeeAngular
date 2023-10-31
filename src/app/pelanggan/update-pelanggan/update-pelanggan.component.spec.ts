import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePelangganComponent } from './update-pelanggan.component';

describe('UpdatePelangganComponent', () => {
  let component: UpdatePelangganComponent;
  let fixture: ComponentFixture<UpdatePelangganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePelangganComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePelangganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
