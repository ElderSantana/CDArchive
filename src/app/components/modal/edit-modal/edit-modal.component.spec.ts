import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { editModalComponent } from './edit-modal.component';

describe('editModalComponent', () => {
  let component: editModalComponent;
  let fixture: ComponentFixture<editModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ editModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(editModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
