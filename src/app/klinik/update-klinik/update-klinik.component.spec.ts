import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKlinikComponent } from './update-klinik.component';

describe('UpdateKlinikComponent', () => {
  let component: UpdateKlinikComponent;
  let fixture: ComponentFixture<UpdateKlinikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateKlinikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateKlinikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
