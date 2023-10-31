import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodeSettingsComponent } from './create-code-settings.component';

describe('CreateCodeSettingsComponent', () => {
  let component: CreateCodeSettingsComponent;
  let fixture: ComponentFixture<CreateCodeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCodeSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCodeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
