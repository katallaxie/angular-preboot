import { ApplicationRef, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
// App is our top level component
import { AppComponent } from './app.component';
import { ROUTES as APP_ROUTES } from './app.routes';

// Application wide providers
const APP_PROVIDERS = [];

/**
 * `AppModule` is the main entry point into Angular's bootstraping process
 */
// import Angular's modules
// expose our Services and Providers into Angular's dependency injection
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES, { useHash: true, enableTracing: __DEV__ })
  ],
  providers: [APP_PROVIDERS]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
}
