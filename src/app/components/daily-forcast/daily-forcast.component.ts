import { Component, Input } from '@angular/core';
import { DailyForcast } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-forcast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-forcast.component.html',
  styleUrl: './daily-forcast.component.scss'
})
export class DailyForcastComponent {
  @Input() dailyForcast: DailyForcast | undefined;

}
