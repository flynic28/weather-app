import { Component, Input } from '@angular/core';
import { HourlyForcast } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hourly-forcast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourly-forcast.component.html',
  styleUrl: './hourly-forcast.component.scss'
})
export class HourlyForcastComponent {
  @Input() hourlyForcast: HourlyForcast[] | undefined;

}
