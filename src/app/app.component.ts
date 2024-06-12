import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { LocationService } from './services/location.service';
import { FavoriteService } from './services/favorite.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [FavoriteService]
})
export class AppComponent {
  title = 'weather-app';
  searchedZipCode = new FormControl(null, [Validators.min(1000), Validators.max(99999)]);
  headerForm: FormGroup = new FormGroup({
    searchedZipCode: new FormControl(null, [ Validators.pattern('^[0-9]*$'), Validators.minLength(5), Validators.maxLength(5)])
  });
  
  constructor(
    private router: Router,
    private locationService: LocationService
  ) {  }

  public goHome() {
    this.router.navigateByUrl("/home")
  }

  public submit() {
    const formValue = this.headerForm.getRawValue()
    return this.locationService.getLocations(formValue.searchedZipCode).pipe(
      take(1)
    ).subscribe((res) => {
      if (res.length) this.router.navigateByUrl(`/location/${res[0].Key}`)
    })
  }
}
