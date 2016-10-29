import browserify from 'browserify';
import fs from 'fs';
import path from 'path';
import {copyDirIfChanged, ensureFolderExists } from './fsutil';

const projectdir = path.resolve('..')

const srcdirname = path.join(projectdir, 'client', 'src')
const srcappts = path.join(srcdirname, 'app.ts')
const srccustomts = path.join(srcdirname, 'custom.d.ts')
const srcmyelemts = path.join(srcdirname, 'components', 'my-element', 'index.ts')
const srcxcounterjs = path.join(srcdirname, 'x-counter.js')
const globalts = path.join(projectdir, 'client', 'typings', 'index.d.ts')
const targetdirname = path.join(projectdir, 'client', 'build')
const targetappjs = path.join(targetdirname, 'app.js')
const exclude_copy_regex = /^(app.js|app.ts|my-element.ts|custom.d.ts)$/

const browserify_opts = {
  bare: true,
  browserField: false,
  bundleExternal: true,
  extensions: ['.js', '.ts']
};

const babelify_opts = {
  presets: ["es2015"],
  babelrc: false /* stops using .babelrc or package.json settings */
}

const tsify_opts = {
  target: 'es6'
}

async function compilejs() {
  await browserify([srcappts, srccustomts, srcmyelemts, srcxcounterjs, globalts], browserify_opts)
    .plugin('tsify', tsify_opts)
    .transform("babelify", babelify_opts)
    .bundle()
    .pipe(fs.createWriteStream(targetappjs));
}

function copyfiles() {
  return copyDirIfChanged(srcdirname, targetdirname, exclude_copy_regex)
}

function build() {
  return ensureFolderExists(targetdirname)
  .then(() => Promise.all([compilejs(), copyfiles()]))
}

export default build;
