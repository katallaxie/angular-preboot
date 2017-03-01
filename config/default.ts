/*** DO NOT TOUCH ***/
import { root } from './helpers';
import {
  DllPlugin,
  ContextReplacementPlugin,
  DefinePlugin,
  DllReferencePlugin,
  ProgressPlugin,
} from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';
import { HtmlHeadElementsPlugin } from 'html-head-webpack-plugin';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

// optimization
import * as CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import * as CompressionPlugin from 'compression-webpack-plugin';
import * as NamedModulesPlugin from 'webpack/lib/NamedModulesPlugin';
import * as UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import * as OptimizeJsPlugin from 'optimize-js-plugin';

import {
  CustomHeadTags,
  CustomCopyFolders,
} from './custom';

export const DefaultCopyFolders = [
  { from: 'src/static', ignore: ['favicon.ico'] },
  { from: 'src/static/icon/favicon.ico' },
  { from: 'src/meta' },
];

// sourcemaps
export const ExcludeSourceMaps = [
  // these packages have problems with their sourcemaps
  root('node_modules/@angular'),
  root('node_modules/rxjs'),
];

export const loader: DefaultLoaders = {
  tsLintLoader: {
    enforce: 'pre',
    test: /\.ts$/,
    use: [{
      loader: 'tslint-loader',
      options: {
        typeCheck: true
      }
    }]
  },
  sourceMapLoader: {
    test: /\.js$/,
    use: 'source-map-loader',
    exclude: [ExcludeSourceMaps]
  },
  tsLoader: (aot = false) => ({
    test: /\.ts$/,
    use: [
      { //
        loader: 'ng-router-loader',
        options: {
          loader: 'async-system',
          genDir: 'aot',
          aot
        }
      },
      {
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'tsconfig.es2015.json'
        }
      },
      'angular2-template-loader',
    ],
    exclude: [/\.(spec|e2e)\.ts$/],
  }),
  cssLoader: {
    test: /\.css$/,
    use: [
      'to-string-loader',
      'css-loader',
      'postcss-loader'
    ],
  }, htmlLoader: {
    test: /\.html$/,
    use: 'raw-loader',
    exclude: [root('src/index.html')],
  },
  fileLoader: {
    test: /\.(jpg|png|gif)$/,
    use: 'file-loader',
  }
};

export const DefaultCommonConfig = ({ isDev }): DefaultConfig => {
  return {
    rules: [
      loader.cssLoader,
      loader.htmlLoader,
      loader.fileLoader,
    ],
    plugins: [
      new ProgressPlugin(),
      new CheckerPlugin(),
      new TsConfigPathsPlugin(),
      new DefinePlugin({
        __DEV__: isDev,
        __PROD__: !isDev
      }),
      new NamedModulesPlugin(),
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        root(`src`)
      ),
      new HtmlHeadElementsPlugin({
        link: CustomHeadTags.link,
        meta: CustomHeadTags.meta
      }),
    ]
  }
};

export const DefaultDevConfig = ({ isAoT }): DefaultConfig => {
  return {
    rules: [
      loader.tsLintLoader,
      loader.tsLoader(isAoT),
    ],
    plugins: [
      new DllReferencePlugin({
        context: '.',
        manifest: require('../dll/polyfills-manifest.json'),
      }),
      new DllReferencePlugin({
        context: '.',
        manifest: require('../dll/vendor-manifest.json'),
      }),
      new HtmlWebpackPlugin({
        inject: 'head',
        template: 'src/index.html',
        title: CustomHeadTags.title
      }),
      new CopyWebpackPlugin([
        ...DefaultCopyFolders,
        ...CustomCopyFolders,
        { from: 'dll', ignore: ['*.json'] }
      ]),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),
    ]
  }
};

export const DefaultProdConfig = ({ isAoT }): DefaultConfig => {
  return {
    rules: [
      loader.tsLoader(isAoT),
    ],
    plugins: [
      new OptimizeJsPlugin({
        sourceMap: false
      }),
      // new NoEmitOnErrorsPlugin(), // quality
      // This enables tree shaking of the vendor modules
      new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: (module) => /node_modules/.test(module.resource)
      }),
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor', 'rxjs'].reverse(),
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 2 * 1024,
        minRatio: 0.8,
      }),
      new CopyWebpackPlugin([
        ...DefaultCopyFolders,
        ...CustomCopyFolders
      ]),
      new HtmlWebpackPlugin({
        inject: 'head',
        template: 'src/index.html',
        title: CustomHeadTags.title,
        minify: {
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        }
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),
      new UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          comparisons: true,
          conditionals: true,
          dead_code: true,
          drop_console: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false, // we need this for lazy v8
          screw_ie8: true,
          sequences: true,
          unused: true,
          warnings: false
        },
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        }
      }),
    ]
  }
};

export const DefaultDllConfig = (): DefaultConfig => {
  return {
    rules: [],
    plugins: [
      new DllPlugin({
        name: '__[name]',
        path: root('dll/[name]-manifest.json'),
      }),
    ]
  }
}
