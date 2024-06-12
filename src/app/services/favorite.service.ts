import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Favorite {
  locationKey: string,
  friendlyName: string
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favoritesSub = new BehaviorSubject<Favorite[]>([]);
  favorites$ = this.favoritesSub.asObservable()

  constructor() { }

  public addFavorite(locationKey: string, friendlyName: string) {
    const prevValue = [...this.favoritesSub.getValue(), { locationKey, friendlyName }];
    this.favoritesSub.next(
      [...new Set(prevValue)]
    )
  }

  public removeFavorite(locationKey: string) {
    const prevValue = this.favoritesSub.getValue();
    this.favoritesSub.next(
      prevValue.filter((val) => val.locationKey !== locationKey)
    )
  }

}
