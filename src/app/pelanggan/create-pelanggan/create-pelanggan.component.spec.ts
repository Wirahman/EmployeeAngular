import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePelangganComponent } from './create-pelanggan.component';

describe('CreatePelangganComponent', () => {
  let component: CreatePelangganComponent;
  let fixture: ComponentFixture<CreatePelangganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePelangganComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePelangganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
