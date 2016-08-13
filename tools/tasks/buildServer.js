import browserify from 'browserify';
import fs from 'fs';

async function build() {
  const browserify_opts = {
    bare: true,
    browserField: false,
    bundleExternal: false
  };

  const babelify_opts = {
    presets: ["node5"],
    babelrc: false /* stops using .babelrc or package.json settings */
  }

  await browserify("./server/app.js", browserify_opts)
    .transform("babelify", babelify_opts)
    .bundle()
    .pipe(fs.createWriteStream("./build/server.js"));
}

export default build;
