import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCodeSettingsComponent } from './update-code-settings.component';

describe('UpdateCodeSettingsComponent', () => {
  let component: UpdateCodeSettingsComponent;
  let fixture: ComponentFixture<UpdateCodeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCodeSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCodeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
