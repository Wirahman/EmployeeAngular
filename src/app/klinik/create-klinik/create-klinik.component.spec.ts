import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKlinikComponent } from './create-klinik.component';

describe('CreateKlinikComponent', () => {
  let component: CreateKlinikComponent;
  let fixture: ComponentFixture<CreateKlinikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKlinikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKlinikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
