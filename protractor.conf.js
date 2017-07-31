require('ts-node/register');
var helpers = require('./config/helpers');

exports.config = {
  baseUrl: 'http://localhost:3000/',

  // use `npm run e2e`
  specs: [helpers.root('src/**/**.e2e.ts'), helpers.root('src/**/*.e2e.ts')],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      // args: [
      //   '--headless',
      //   '--disable-gpu',
      //   '--window-size=1280x800',
      //   '--no-sandbox'
      // ]
      args: ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  /**
   * Angular configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any Angular apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true
};
