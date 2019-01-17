import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGenreModalComponent } from './add-genre-modal.component';

describe('AddModalComponent', () => {
  let component: AddGenreModalComponent;
  let fixture: ComponentFixture<AddGenreModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGenreModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGenreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
