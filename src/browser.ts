/*
 * Angular bootstraping
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

/*
 * App Module
 * our top level module that holds all of our components
 */
import {AppModule} from './app';
import {bootstrapDomLoading, decorateModuleRef} from './bootstrap';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .then(decorateModuleRef)
      .catch((err) => console.error(err));
}

// use bootloader in case of async tag
bootstrapDomLoading(main);
