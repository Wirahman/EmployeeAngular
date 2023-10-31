import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlinikComponent } from './klinik.component';

describe('KlinikComponent', () => {
  let component: KlinikComponent;
  let fixture: ComponentFixture<KlinikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlinikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlinikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
