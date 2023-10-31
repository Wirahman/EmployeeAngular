import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLogActivitiesComponent } from './delete-log-activities.component';

describe('DeleteLogActivitiesComponent', () => {
  let component: DeleteLogActivitiesComponent;
  let fixture: ComponentFixture<DeleteLogActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLogActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLogActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
