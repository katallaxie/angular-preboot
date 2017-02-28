import {
  ApplicationRef,
  enableProdMode
} from '@angular/core';
import {
  disableDebugTools,
  enableDebugTools
} from '@angular/platform-browser';

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/master/TOOLS.md
export let decorateModuleRef = <T>(value: T): T => { return value; };

if (__PROD__) {
  enableProdMode();

  // Production
  decorateModuleRef = (modRef: any) => {
    disableDebugTools();

    return modRef;
  };

} else {

  decorateModuleRef = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    let _ng = (<any> window).ng;
    enableDebugTools(cmpRef); // try ng.profiler.timeChangeDetection()
    (<any> window).ng.probe = _ng.probe;
    (<any> window).ng.coreTokens = _ng.coreTokens;
    return modRef;
  };

}

// dom operations
export function bootstrapDomReady(main): void {
  document.addEventListener('DOMContentLoaded', () => main());
};

export function bootstrapDomLoading (main): void {
  switch (document.readyState) {
    case 'loading':
      bootstrapDomReady(main);
      break;
    case 'complete':
    case 'interactive':
    default:
      main();
  }
};
