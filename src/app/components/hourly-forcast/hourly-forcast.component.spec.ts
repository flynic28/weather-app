import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyForcastComponent } from './hourly-forcast.component';

describe('HourlyForcastComponent', () => {
  let component: HourlyForcastComponent;
  let fixture: ComponentFixture<HourlyForcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyForcastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
