import { Component } from '@angular/core';
import { Favorite, FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { Observable, Subject,  forkJoin, map,  mergeMap, takeUntil } from 'rxjs';
import { DailyForcast, WeatherService } from '../../services/weather.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DailyForcastComponent } from '../../components/daily-forcast/daily-forcast.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    DailyForcastComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
})
export class HomeComponent {
  destroy$ = new Subject();

  favorites$: Observable<Array<DailyForcast | any>>

  constructor(
    public favoriteService: FavoriteService,
    public weatherService: WeatherService
  ) {
    this.favorites$ = this.favoriteService.favorites$.pipe(
      takeUntil(this.destroy$),
      mergeMap((favorites: Favorite[]) =>
        forkJoin(
          favorites.map((f: Favorite) =>
            this.weatherService.getDailyForcast('5', f.locationKey).pipe(map((forcast) => ({ ...f, ...forcast })))
          )
        )
      )
    )    
  }
}
