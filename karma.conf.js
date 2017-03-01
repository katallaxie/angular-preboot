const helpers = require('./config/helpers');
const path = require('path');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = config => {

  config.set({

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [],

    client: {
      captureConsole: false
    },

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [
      { pattern: './config/spec.js', watched: false },
      { pattern: './src/static/**/*', watched: false, included: false, served: true, nocache: false }
    ],

    /*
     * By default all assets are served at http://localhost:[PORT]/base/
     */
    proxies: {
      "/": "/base/src/static/",
    },

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {
      './config/spec.js': ['coverage', 'webpack', 'sourcemap']
    },

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
      },
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js$/,
            use: 'source-map-loader',
            exclude: [
              helpers.root('node_modules/rxjs'),
              helpers.root('node_modules/@angular')
            ]
          }, {
            test: /\.ts$/,
            use: [
              {
                loader: 'awesome-typescript-loader',
                options: {
                  noUnusedLocals: false,
                  noUnusedParameters: false,
                  sourceMap: false,
                  inlineSourceMap: true,
                  compilerOptions: {
                    removeComments: true
                  }
                }
              },
              'angular2-template-loader'
            ],
            exclude: [/\.e2e\.ts$/]
          }, {
            test: /\.css$/,
            use: ['to-string-loader', 'css-loader'],
            exclude: [helpers.root('src/index.html')]
          }, {
            test: /\.html$/,
            use: 'raw-loader',
            exclude: [helpers.root('src/index.html')]
          }, {
            enforce: 'post',
            test: /\.(js|ts)$/,
            use: 'istanbul-instrumenter-loader',
            include: helpers.root('src'),
            exclude: [
              /\.(e2e|spec)\.ts$/,
              /node_modules/
            ]
          }

        ]
      },

      /**
       * Add additional plugins to the compiler.
       *
       * See: http://webpack.github.io/docs/configuration.html#plugins
       */
      plugins: [
        new DefinePlugin({
          __TESTING: true
        }),
        new ContextReplacementPlugin(
          // The (\\|\/) piece accounts for path separators in *nix and Windows
          /angular(\\|\/)core(\\|\/)@angular/,
          helpers.root('src') // location of your src
        )
      ],

      /**
       * Include polyfills or mocks for various node stuff
       * Description: Node configuration
       *
       * See: https://webpack.github.io/docs/configuration.html#node
       */
      node: {
        global: true,
        process: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
      }
    },

    // Webpack please don't spam the console when running in karma!
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        // options i.e.
        chunks: false
      }
    },

    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['mocha', 'coverage', 'remap-coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: !process.env.TRAVIS
      ? ['Chrome']
      : ['ChromeTravisCi'],

    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true
  });
}
