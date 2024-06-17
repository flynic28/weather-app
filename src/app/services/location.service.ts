import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { API_BASE, DEFAULT_QUERY_PARAMS, FORCASTS_API, LOCATION_API } from './api.constant';
import { NotificationService } from './notification.service';

export interface Location {
  Version:                number;
  Key:                    string;
  Type:                   string;
  Rank:                   number;
  LocalizedName:          string;
  EnglishName:            string;
  PrimaryPostalCode:      string;
  Region:                 Country;
  Country:                Country;
  AdministrativeArea:     AdministrativeArea;
  TimeZone:               TimeZone;
  GeoPosition:            GeoPosition;
  IsAlias:                boolean;
  ParentCity:             ParentCity;
  SupplementalAdminAreas: SupplementalAdminArea[];
  DataSets:               string[];
}

export interface AdministrativeArea {
  ID:            string;
  LocalizedName: string;
  EnglishName:   string;
  Level:         number;
  LocalizedType: string;
  EnglishType:   string;
  CountryID:     string;
}

export interface Country {
  ID:            string;
  LocalizedName: string;
  EnglishName:   string;
}

export interface GeoPosition {
  Latitude:  number;
  Longitude: number;
  Elevation: Elevation;
}

export interface Elevation {
  Metric:   Imperial;
  Imperial: Imperial;
}

export interface Imperial {
  Value:    number;
  Unit:     string;
  UnitType: number;
}

export interface ParentCity {
  Key:           string;
  LocalizedName: string;
  EnglishName:   string;
}

export interface SupplementalAdminArea {
  Level:         number;
  LocalizedName: string;
  EnglishName:   string;
}

export interface TimeZone {
  Code:             string;
  Name:             string;
  GmtOffset:        number;
  IsDaylightSaving: boolean;
  NextOffsetChange: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) { }

  public getLocations(zipCode: string) {
    return this.httpClient.get(`${API_BASE}/${LOCATION_API}/postalcodes/search${DEFAULT_QUERY_PARAMS}&q=${zipCode}`).pipe(
      map((res) => res as any[]),
      map((data: any[]) => {
        if (data.length === 0) throw new Error('No Locations Found');
        return data
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.notificationService.openErrorSnackbar(error.message)
        return of();
      })
    )
  }

  public getLocationInfo(locationKey: string) {
    return this.httpClient.get(`${API_BASE}/${LOCATION_API}/${locationKey}${DEFAULT_QUERY_PARAMS}`).pipe(
      map((res) => {
        return res as Location
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.notificationService.openErrorSnackbar(error.message)
        return of();
      })
    )
  }

}
