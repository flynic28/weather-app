import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyForcastComponent } from './daily-forcast.component';

describe('DailyForcastComponent', () => {
  let component: DailyForcastComponent;
  let fixture: ComponentFixture<DailyForcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyForcastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
