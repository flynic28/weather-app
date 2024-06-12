import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LocationComponent } from './features/location/location.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    }, {
        path: 'location/:id',
        component: LocationComponent
    }, {
        path: '**',
        redirectTo: 'home',
    }
];
