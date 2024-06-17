import { Component } from '@angular/core';
import { Favorite, FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { Observable, Subject,  forkJoin, map,  mergeMap, takeUntil, tap } from 'rxjs';
import { DailyForcast, WeatherService } from '../../services/weather.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DailyForcastComponent } from '../../components/daily-forcast/daily-forcast.component';
import { MatButtonModule } from '@angular/material/button';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    DailyForcastComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
})
export class HomeComponent {
  destroy$ = new Subject();

  favorites$: Observable<Array<DailyForcast | any>>
  isMobile$ = this.layoutService.isMobile().pipe(
    tap((data) => console.log('isMobile', data))
  )

  constructor(
    public favoriteService: FavoriteService,
    public weatherService: WeatherService,
    private layoutService: LayoutService
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

  removeFavorite(locationKey: string) {
    this.favoriteService.removeFavorite(locationKey)
  }
}
