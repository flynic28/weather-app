import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE, CURRENT_CONDITIONS_API, DEFAULT_QUERY_PARAMS, FORCASTS_API } from './api.constant';
import { Observable, catchError, map, of } from 'rxjs';
import { NotificationService } from './notification.service';

export interface CurrentCondition {
  LocalObservationDateTime: Date;
  EpochTime:                number;
  WeatherText:              string;
  WeatherIcon:              number;
  HasPrecipitation:         boolean;
  PrecipitationType:        string;
  IsDayTime:                boolean;
  Temperature:              Temperature;
  MobileLink:               string;
  Link:                     string;
}

export interface Temperature {
  Metric:   Imperial;
  Imperial: Imperial;
}

export interface Imperial {
  Value:    number;
  Unit:     string;
  UnitType: number;
}

export interface DailyForcast {
  Headline:       Headline;
  DailyForecasts: DailyForecast[];
}

export interface DailyForecast {
  Date:        Date;
  EpochDate:   number;
  Temperature: Temperature;
  Day:         Day;
  Night:       Day;
  Sources:     string[];
  MobileLink:  string;
  Link:        string;
}

export interface Day {
  Icon:                    number;
  IconPhrase:              string;
  HasPrecipitation:        boolean;
  PrecipitationType?:      string;
  PrecipitationIntensity?: string;
}

export interface Temperature {
  Minimum: Imum;
  Maximum: Imum;
}

export interface Imum {
  Value:    number;
  Unit:     Unit;
  UnitType: number;
}

export interface Headline {
  EffectiveDate:      Date;
  EffectiveEpochDate: number;
  Severity:           number;
  Text:               string;
  Category:           string;
  EndDate:            Date;
  EndEpochDate:       number;
  MobileLink:         string;
  Link:               string;
}

export interface HourlyForcast {
  DateTime:                 Date;
  EpochDateTime:            number;
  WeatherIcon:              number;
  IconPhrase:               IconPhrase;
  HasPrecipitation:         boolean;
  IsDaylight:               boolean;
  Temperature:              Temperature;
  PrecipitationProbability: number;
  MobileLink:               string;
  Link:                     string;
}

export enum IconPhrase {
  Clear = "Clear",
  MostlyClear = "Mostly clear",
  MostlySunny = "Mostly sunny",
}

export interface Temperature {
  Value:    number;
  Unit:     Unit;
  UnitType: number;
}

export enum Unit {
  F = "F",
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) { }

  public getDailyForcast(dayCount: '1' | '5' | '10', locationKey: string) {
    return this.httpClient.get(`${API_BASE}/${FORCASTS_API}/daily/${dayCount}day/${locationKey}${DEFAULT_QUERY_PARAMS}`).pipe(
      map((res) => res as DailyForcast),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.notificationService.openErrorSnackbar(error.message)
        return of();
      })
    )
  }

  public getHourlyForcast(hourCount: '1' | '12' | '24' | '120' | '72', locationKey: string) {
    return this.httpClient.get(`${API_BASE}/${FORCASTS_API}/hourly/${hourCount}hour/${locationKey}${DEFAULT_QUERY_PARAMS}`).pipe(
      map((res) => res as HourlyForcast[]),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.notificationService.openErrorSnackbar(error.message)
        return of();
      })
    )
  }

  public getCurrentConditions(locationKey: string) {
    return this.httpClient.get(`${API_BASE}/${CURRENT_CONDITIONS_API}/${locationKey}${DEFAULT_QUERY_PARAMS}`).pipe(
      map((res) => res as CurrentCondition[]),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.notificationService.openErrorSnackbar(error.message)
        return of();
      })
    )
  }

}
