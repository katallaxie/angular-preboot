# Angular Preboot

[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![Taylor Swift](https://img.shields.io/badge/secured%20by-taylor%20swift-brightgreen.svg)](https://twitter.com/SwiftOnSecurity)
[![Volkswagen](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)
[![Build Status](https://travis-ci.org/katallaxie/angular-preboot.svg?branch=master)](https://travis-ci.org/katallaxie/angular-preboot)
[![Greenkeeper badge](https://badges.greenkeeper.io/katallaxie/angular-preboot.svg)](https://greenkeeper.io/)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/katallaxie/katallaxie)


> An [Angular](https://angular.io) boilerplate, that has a lot of features and is driven by great spirit.

## Features

> This boilerplate is opinionated, it does not want to achieve all things possible 

* [Webpack 2](http://webpack.github.io/) + DLL Support
* [TypeScript](http://www.typescriptlang.org/)
* [@types](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&cad=rja&uact=8&ved=0ahUKEwjgjdrR7u_NAhUQ7GMKHXgpC4EQFggnMAI&url=https%3A%2F%2Fwww.npmjs.com%2F~types&usg=AFQjCNG2PFhwEo88JKo12mrw_4d0w1oNiA&sig2=N69zbO0yN8ET7v4KVCUOKA)
* [TsLint](http://palantir.github.io/tslint/)
* [PostCss](https://github.com/postcss/postcss) + [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Codelyzer](https://github.com/mgechev/codelyzer)
* [Istanbul](https://github.com/gotwarlost/istanbul)
* [Jest](https://facebook.github.io/jest)
* [Protractor](https://angular.github.io/protractor/)
* [Jasmine](https://github.com/jasmine/jasmine)
* [E2E](https://angular.github.io/protractor/#/faq#what-s-the-difference-between-karma-and-protractor-when-do-i-use-which-)
* [Docker](https://docker.io)
* [Lighthouse](https://github.com/GoogleChrome/lighthouse)
* [Prettier](https://github.com/prettier/prettier)

## Quick Start

> We support Node.js `>= 6.9.1`, NPM `>= 3.x` [Yarn](https://yarnpkg.com)
> If you downgrade to `protractor@4.9.x` you could run the boilerplate in Node `> 4.7.x`
> We recommend and support [Visual Studio Code](https://code.visualstudio.com/)
> We recommend to use [NVM](https://github.com/creationix/nvm) to manage your Node.js version and dependencies
> We highly recommend to use

```
# clone the repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/katallaxie/angular-preboot.git

# change to repo folder
cd angular-preboot

# install the repo with npm, or yarn
npm install

# start the webpack-dev-server
npm start

# if you're in China use cnpm
# https://github.com/cnpm/cnpm
```

> You can run `npm run help` to see all available scripts

Open [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your favorite Browser.

### Build and deploy your great project

> We have `npm run fmt` with `.clang-format` in place to format your code
> We have a [Firebase](https://firebase.google.com/) config in the repo

```
# build the AoT version of your project
npm run build:prod

# build a ready to ship Docker for your project
npm run build:docker
```

### Testing is import for quality products

> We have [Jest](https://facebook.github.io/jest) and [Protractor](http://www.protractortest.org/) in place

```
# run your unit tests
npm run tests

# or develop with unit tests in the loop
npm run watch:test

# run your e2e tests
npm run e2e
```

### Prettify your code

> We have [Prettier](https://github.com/prettier/prettier) in place for your
> we also recommend [Prettier for VSCode](https://github.com/prettier/prettier)

```
npm run fmt
```

# License
[MIT](/LICENSE)
