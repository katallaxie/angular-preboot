import { ApplicationRef, enableProdMode } from '@angular/core';
import { disableDebugTools, enableDebugTools } from '@angular/platform-browser';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/master/TOOLS.md
export let decorateModuleRef = <T>(value: T): T => value;

if (__PROD__) {
  enableProdMode();

  // ofline
  OfflinePluginRuntime.install({
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating');
    },
    onUpdateReady: () => {
      console.log('SW Event:', 'onUpdateReady');
      // Tells to new SW to take control immediately
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: () => {
      console.log('SW Event:', 'onUpdated');
      // Reload the webpage to load into the new version
      window.location.reload();
    },

    onUpdateFailed: () => {
      console.log('SW Event:', 'onUpdateFailed');
    }
  });

  // enable production
  decorateModuleRef = (modRef: any) => {
    disableDebugTools();
    return modRef;
  };

} else {
  decorateModuleRef = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    // enable debug tools
    enableDebugTools(cmpRef);  // try ng.profiler.timeChangeDetection()
    return modRef;
  };
}

// dom operations
export function bootstrapDomReady(main): void {
  document.addEventListener('DOMContentLoaded', () => main());
}

export function bootstrapDomLoading(main): void {
  switch (document.readyState) {
    case 'loading':
      bootstrapDomReady(main);
      break;
    case 'complete':
    case 'interactive':
    default:
      main();
  }
}
