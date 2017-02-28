/**
 *
 * - imports
 * - custom
 * - config
 * - common
 * - dev
 * - dll
 * - prod
 * - webpack
 */

// node
import * as process from 'process';
import 'reflect-metadata';

import { NgcWebpackPlugin } from 'ngc-webpack';
import * as webpackMerge from 'webpack-merge';

// helpers
import {
  isWebpackDevServer,
  root,
  tryDll,
} from './config/helpers';

// dll's
import {
  polyfills,
  rxjs,
  vendor,
} from './config/dll';

// defaults
import {
  DefaultCommonConfig,
  DefaultDevConfig,
  DefaultDllConfig,
  DefaultProdConfig
} from './config/default';

// custom
import {
  CustomCommonConfig,
  CustomDevConfig,
  CustomProdConfig,
  DevServerConfig
} from './config/custom';

// config
const EVENT = process.env.npm_lifecycle_event;
const ENV = process.env.NODE_ENV || 'development';

const envConfig = {
  isDev:  EVENT.includes('dev'),
  isDll:  EVENT.includes('dll'),
  isAoT:  !EVENT.includes('dev'),
  port:   process.env.PORT ||
    ENV === 'development' ? DevServerConfig.port : 8080,
  host:   process.env.HOST || 'localhost'
};

// is dll
if (!envConfig.isDll && envConfig.isDev) {
  tryDll(['polyfills', 'vendor', 'rxjs']);
}

// common
const commonConfig = () => {
  const config: WebpackConfig = <WebpackConfig> {};

  config.module = {
    rules: [
      ...DefaultCommonConfig(envConfig).rules,
      ...CustomCommonConfig.rules,
    ],
  };

  config.plugins = [
    ...DefaultCommonConfig(envConfig).plugins,
    ...CustomCommonConfig.plugins,
  ];

  config.node = {
    Buffer: false,
    clearImmediate: false,
    clearTimeout: true,
    crypto: true,
    global: true,
    module: false,
    process: true,
    setImmediate: false,
    setTimeout: true,
  };

  return config;
};

// dev
const devConfig = () => {
  const config: WebpackConfig = <WebpackConfig> {};

  config.devtool = 'eval-source-map';

  config.module = {
    rules: [
      ...DefaultDevConfig(envConfig).rules,
      ...CustomDevConfig.rules
    ]
  };

  config.plugins = [
    ...DefaultDevConfig(envConfig).plugins,
    ...CustomDevConfig.plugins,
  ];

  config.resolve = {
    modules: [root(`src`), `node_modules`],
  };

  config.entry = {
    main: [].concat(polyfills(envConfig), './src/browser', rxjs()),
  };

  config.output = {
    path: root(`public`),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js',
  };

  if (isWebpackDevServer) {
    config.devServer = {
      contentBase: root(`src`),
      historyApiFallback: true,
      host: envConfig.host,
      port: envConfig.port,

      ...DevServerConfig.options
    };
  }

  return config;
};

// dll
const dllConfig = () => {

  const config: WebpackConfig = <WebpackConfig> {};

  config.entry = {
    polyfills: polyfills(envConfig.isDev),
    rxjs: rxjs(),
    vendor: vendor(),
  };

  config.output = {
    path: root(`dll`),
    filename: '[name].dll.js',
    sourceMapFilename: '[name].dll.map',
    library: '__[name]',
  };

  config.plugins = [
    ...DefaultDllConfig().plugins
  ];

  return config;

};

// prod
const prodConfig = () => {

  const config: WebpackConfig = <WebpackConfig> {};

  config.devtool = 'source-map';

  config.module = {
    rules: [
      ...DefaultProdConfig(envConfig).rules,
      ...CustomProdConfig.rules
    ]
  };

  config.performance = {
    hints: 'warning'
  };

  config.entry = {
    main: './src/browser.aot',
    polyfills: polyfills(envConfig),
    rxjs: rxjs(),
  };

  config.output = {
    path: root(`public`),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js',
  };

  config.plugins = [
    ...DefaultProdConfig(envConfig).plugins,
    ...CustomProdConfig.plugins,
  ];

  if (envConfig.isAoT) {
    config.plugins.unshift(
      new NgcWebpackPlugin({
        disabled: !envConfig.isAoT,
        tsConfig: root('tsconfig.es2015.json'),
        resourceOverride: ''
      }));
  }

  return config;
};

// default
const defaultConfig = () => {
  const config: WebpackConfig = <WebpackConfig> {};

  config.resolve = {
    extensions: ['.ts', '.js', '.json'],
  };

  return config;
};

// webpack
switch (ENV) {
  case 'prod':
  case 'production':
    module.exports = webpackMerge({}, defaultConfig(), prodConfig(), commonConfig());
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = envConfig.isDll
      ? webpackMerge({}, defaultConfig(), commonConfig(), dllConfig())
      : webpackMerge({}, defaultConfig(), commonConfig(), devConfig());
}
