import { Component } from '@angular/core';
import { Favorite, FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
})
export class HomeComponent {
  destroy$ = new Subject();

  favorites$: Observable<Favorite[]>

  constructor(
    public favoriteService: FavoriteService
  ) {
    this.favorites$ = this.favoriteService.favorites$.pipe(
      takeUntil(this.destroy$),
      tap((_favorites) => {
        // console.log(_favorites)
      })
    )    
  }
}
