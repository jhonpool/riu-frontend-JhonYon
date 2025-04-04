import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroeComponent } from './add-hero.component';

describe('AddHeroeComponent', () => {
  let component: AddHeroeComponent;
  let fixture: ComponentFixture<AddHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeroeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
