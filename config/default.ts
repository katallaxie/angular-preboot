/*** DO NOT TOUCH ***/
import { root } from './helpers';
import {
  ContextReplacementPlugin,
  DefinePlugin,
  ProgressPlugin
} from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';
import * as HtmlElementsWebpackPlugin from 'html-elements-webpack-plugin';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import * as AutoDllPlugin from 'autodll-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

// optimization
import * as BrotliPlugin from 'brotli-webpack-plugin';
import * as CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import * as CompressionPlugin from 'compression-webpack-plugin';
import * as NamedModulesPlugin from 'webpack/lib/NamedModulesPlugin';
import * as OptimizeJsPlugin from 'optimize-js-plugin';
import * as UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';

// postCss
import * as Autoprefixer from 'autoprefixer';
import * as CssNano from 'cssnano';

import { CustomHeadTags, CustomCopyFolders } from './custom';

// copy
export const DefaultCopyFolders = [
  { from: 'src/static', ignore: ['favicon.ico'] },
  { from: 'src/static/icon/favicon.ico' },
  { from: 'src/meta' }
];

// dll's
import { polyfills, vendor } from './dll';

// sourcemaps
export const ExcludeSourceMaps = [
  // these packages have problems with their sourcemaps
  root('node_modules/@angular'),
  root('node_modules/rxjs')
];

export const loader: DefaultLoaders = {
  tsLintLoader: {
    enforce: 'pre',
    test: /\.ts$/,
    use: [
      {
        loader: 'tslint-loader',
        options: {
          typeCheck: true
        }
      }
    ]
  },
  sourceMapLoader: {
    test: /\.js$/,
    use: 'source-map-loader',
    exclude: [ExcludeSourceMaps]
  },
  tsLoader: (aot = false, dev) => ({
    test: /\.ts$/,
    use: [
      {
        //
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
          configFileName: 'tsconfig.es2015.json',
          useCache: !dev
        }
      },
      'angular2-template-loader'
    ],
    exclude: [/\.(spec|e2e)\.ts$/]
  }),
  cssLoader: {
    test: /\.css$/,
    use: [
      'to-string-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [Autoprefixer(), CssNano()]
        }
      }
    ]
  },
  htmlLoader: {
    test: /\.html$/,
    use: 'raw-loader',
    exclude: [root('src/index.html')]
  },
  fileLoader: {
    test: /\.(jpg|png|gif)$/,
    use: 'file-loader'
  }
};

export const DefaultCommonConfig = ({ isDev }): DefaultConfig => {
  return {
    rules: [loader.cssLoader, loader.htmlLoader, loader.fileLoader],
    plugins: [
      new ProgressPlugin(),
      new CheckerPlugin(),
      new TsConfigPathsPlugin(),
      new DefinePlugin({
        __DEV__: isDev,
        __PROD__: !isDev
      }),
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        root(`src`)
      ),
      new HtmlElementsWebpackPlugin({
        headTags: Object.assign({}, { link: CustomHeadTags.link, meta: CustomHeadTags.meta })
      })
    ]
  };
};

export const DefaultDevConfig = ({ isAoT, isDev }): DefaultConfig => {
  return {
    rules: [loader.tsLintLoader, loader.tsLoader(isAoT, isDev)],
    plugins: [
      new AutoDllPlugin({
        context: root(),
        debug: true,
        inject: false, // will inject the DLL bundles to index.html
        filename: '[name].dll.js',
        entry: {
          polyfills: polyfills(isDev),
          vendor: vendor()
        }
      }),
      new HtmlWebpackPlugin({
        inject: 'head',
        template: 'src/index.html',
        title: CustomHeadTags.title
      }),
      new NamedModulesPlugin(),
      new CopyWebpackPlugin([...DefaultCopyFolders, ...CustomCopyFolders]),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      })
    ]
  };
};

export const DefaultProdConfig = ({ isAoT, isDev }): DefaultConfig => {
  return {
    rules: [loader.tsLoader(isAoT, isDev)],
    plugins: [
      new OptimizeJsPlugin({
        sourceMap: false
      }),
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      // new NoEmitOnErrorsPlugin(), // quality
      // This enables tree shaking of the vendor modules
      new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules/.test(module.resource)
      }),
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 2 * 1024,
        minRatio: 0.8
      }),
      new CopyWebpackPlugin([...DefaultCopyFolders, ...CustomCopyFolders]),
      new HtmlWebpackPlugin({
        inject: 'head',
        template: './src/index.html',
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
        output: {
          comments: false
        },
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
          screw_ie8: true
        }
      })
    ]
  };
};
