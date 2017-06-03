/*
 * Angular decorators and services
 */
import { ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public name = 'Angular Preboot';
  public logo = '/img/angular.png';

  public ngOnInit() {
    console.log(`Initializing 'AppComponent'`);
  }
}
