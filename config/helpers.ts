import * as path from 'path';

export const root = path.join.bind(path, path.resolve(__dirname, '..'));

export const hasProcessFlag = flag => process.argv.join('').indexOf(flag) > -1;
export const isWebpackDevServer = () =>
  process.argv[1] && !!/webpack-dev-server/.exec(process.argv[1]);

export const toSpawn = (cb, task) => {
  try {
    cb();
  } catch (e) {
    const spawn: any = require('cross-spawn');
    spawn.sync('npm', ['run', task], { stdio: 'inherit' });
    return true;
  }
};
