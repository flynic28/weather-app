import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  public isMobile() {
    return this.breakpointObserver.observe('(max-width: 700px)').pipe(
      map((data) => data.matches)
    )
  }
}
