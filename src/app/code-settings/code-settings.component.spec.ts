import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSettingsComponent } from './code-settings.component';

describe('CodeSettingsComponent', () => {
  let component: CodeSettingsComponent;
  let fixture: ComponentFixture<CodeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
