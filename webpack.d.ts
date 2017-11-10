interface WebpackConfig {
  cache?: boolean;
  target?: string;
  devtool?: string | boolean;
  entry: any;
  externals?: any;
  output: any;
  module?: any;
  plugins?: Array<any>;
  performance?:
    | boolean
    | {
        hints?: string;
        assetFilter?: string;
        maxEntrypointSize?: string;
        maxAssetSize?: string;
      };
  resolve?: {
    extensions?: Array<string>;
    modules?: Array<string>;
  };
  devServer?: {
    contentBase?: string;
    port?: number;
    historyApiFallback?: boolean;
    hot?: boolean;
    inline?: boolean;
    proxy?: any;
    host?: string;
    quiet?: boolean;
    noInfo?: boolean;
    watchOptions?: any;
  };
  node?: {
    process?: boolean;
    global?: boolean;
    Buffer?: boolean;
    crypto?: boolean;
    module?: boolean;
    clearImmediate?: boolean;
    setImmediate?: boolean;
    clearTimeout?: boolean;
    setTimeout?: boolean;
    __dirname?: boolean;
    __filename?: boolean;
  };
}

type DefaultConfig = {
  rules: any[];
  plugins: any[];
};

interface CustomConfig {
  rules: any[];
  plugins: any[];
}

interface HeadTags {
  link?: any[];
  meta?: any[];
  title?: string;
}

interface DefaultLoaders {
  tsLintLoader?: {
    enforce?: any;
    test?: any;
    use?: any;
    exclude?: any;
  };
  sourceMapLoader?: {
    enforce?: any;
    test?: any;
    use?: any;
    exclude?: any;
  };
  tsLoader?: (
    aot: boolean,
    dev: boolean
  ) => {
    enforce?: any;
    test: any;
    use: any;
    exclude?: any;
  };
  cssLoader?: {
    enforce?: any;
    test?: any;
    use?: any;
    exclude?: any;
  };
  htmlLoader?: {
    enforce?: any;
    test?: any;
    use?: any;
    exclude?: any;
  };
  fileLoader?: {
    enforce?: any;
    test?: any;
    use?: any;
    exclude?: any;
  };
}
