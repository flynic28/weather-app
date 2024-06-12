import { Component, Input } from '@angular/core';
import { CurrentCondition } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-conditions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-conditions.component.html',
  styleUrl: './current-conditions.component.scss'
})
export class CurrentConditionsComponent {
  @Input() currentConditions: CurrentCondition[] | undefined;
}
