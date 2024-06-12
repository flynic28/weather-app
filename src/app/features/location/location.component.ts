import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { CurrentCondition, DailyForcast, HourlyForcast, WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { Favorite, FavoriteService } from '../../services/favorite.service';
import { CurrentConditionsComponent } from '../../components/current-conditions/current-conditions.component';
import { HourlyForcastComponent } from '../../components/hourly-forcast/hourly-forcast.component';
import { DailyForcastComponent } from '../../components/daily-forcast/daily-forcast.component';
import { MatCardModule } from '@angular/material/card';
import { Location, LocationService } from '../../services/location.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CurrentConditionsComponent,
    HourlyForcastComponent,
    DailyForcastComponent
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  destroy$ = new Subject();

  locationId$: Subject<string> = new Subject();
  currentConditions$: Observable<CurrentCondition[]> = new Observable();
  dailyForcast$: Observable<DailyForcast> = new Observable();
  hourlyForcast$: Observable<HourlyForcast[]> = new Observable();
  location$: Observable<Location> = new Observable();

  favorites$: Observable<Favorite[]> = new Observable();
  isFavorite$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private favoriteService: FavoriteService,
    private locationService: LocationService
  ) {
    this.locationId$.pipe(
      takeUntil(this.destroy$),
      tap((data) => {
        this.favorites$ = this.favoriteService.favorites$.pipe(
          takeUntil(this.destroy$),
          tap((_favorites) => {
            console.log(_favorites)
            this.isFavorite$.next(!!_favorites.find((_favorite) => _favorite.locationKey === data))
          })
        )    
        this.currentConditions$ = this.weatherService.getCurrentConditions(data)
        this.dailyForcast$ = this.weatherService.getDailyForcast('5', data)
        this.hourlyForcast$ = this.weatherService.getHourlyForcast('12', data)
        this.location$ = this.locationService.getLocationInfo(data)
      })
    ).subscribe()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.locationId$.next(params['id'])
    });
  }

  toggleFavorite(setFavorite: boolean | null, location: Location) {
    if (setFavorite) {
      this.favoriteService.removeFavorite(location.Key)
    } else {
      this.favoriteService.addFavorite(location.Key, location.LocalizedName)
    } 
  }
}
