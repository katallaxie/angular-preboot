/*
 * Angular bootstraping
 */
import {platformBrowser} from '@angular/platform-browser';

/*
 * App Module
 * our top level module that holds all of our components
 */
import {AppModuleNgFactory} from '../aot/src/app/app.module.ngfactory';

import {bootstrapDomReady, decorateModuleRef} from './bootstrap';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main() {
  return platformBrowser()
      .bootstrapModuleFactory(AppModuleNgFactory)
      .then(decorateModuleRef)
      .catch((err) => console.error(err));
}

// use bootloader in case of async tag
bootstrapDomReady(main);
