import browserify from 'browserify';
import fs from 'fs';

async function build() {
  console.log('build server')

  const browserify_opts = {
    bare: true,
    browserField: false,
    bundleExternal: false,
    extensions: ['.js', '.ts']
  };

  const babelify_opts = {
    presets: ["node5"],
    babelrc: false /* stops using .babelrc or package.json settings */
  }

  const tsify_opts = {
    target: 'es6'
  }

  await browserify(["../server/src/app.ts", "../server/typings/index.d.ts"], browserify_opts)
    .plugin("tsify", tsify_opts)
    .transform("babelify", babelify_opts)
    .bundle()
    .pipe(fs.createWriteStream("../server/build/server.js"));
}

export default build;
