import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentConditionsComponent } from './current-conditions.component';

describe('CurrentConditionsComponent', () => {
  let component: CurrentConditionsComponent;
  let fixture: ComponentFixture<CurrentConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentConditionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
