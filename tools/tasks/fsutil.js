/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import fs from 'fs';

export function ensureFolderExists(dirpath) {
  return new Promise(function(resolve, reject){
    fs.mkdir(dirpath, function(err){
      if (err && err.code != 'EEXIST') {
        console.log(err)
        reject(err);
      } else {
        resolve()
      }
    });
  });
}

function fileStats(src) {
  return new Promise(function(resolve, reject) {
    fs.stat(src, function(err, stats) {
      if (err) {
        reject(err, null)
      }
      resolve(stats)
    });
  });
}


function readdir(dirname) {
  return new Promise(function(resolve, reject) {
    fs.readdir(dirname, function(err, files) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

function copyFile(srcstats, src, dst) {
  return new Promise(function(resolve, reject) {
      console.log(`copying ${src} to ${dst}`)
      const is = fs.createReadStream(src);
      const os = fs.createWriteStream(dst);

      is.pipe(os);
      os.on('close', function (err) {
        if (err) {
          reject(err);
        }
        else {
          fs.utimes(dst, srcstats.atime, srcstats.mtime, function(err) {
            if (err) {
              reject(err);
            }
            resolve()
          });
        }
      });
  });
}


export function copyFileIfChanged(srcdirname, targetdirname, filename, exclude_regex = /^$/) {

  const src = path.join(srcdirname, filename)
  const target = path.join(targetdirname, filename)


  function isExcluded() {
    return exclude_regex.test(filename)
  }

  function targetIsOlder(srcstats) {
    return new Promise(function(resolve, reject) {
      fs.stat(target, function(err, targetstats) {
        if ((err && err.code == 'ENOENT') ||
            (srcstats.mtime.getTime() > targetstats.mtime.getTime())
        ) {
          resolve(srcstats)
        }

        reject(err)
      });
    });
  }

  if (isExcluded(filename)) {
    return Promise.resolve(filename)
  }

  return fileStats(src)
    .then(srcstats => targetIsOlder(srcstats))
    .then(srcstats => copyFile(srcstats, src, target))
}

export function copyDirIfChanged(srcdirname, targetdirname, exclude_regex = /^$/ ) {
  return readdir(srcdirname)
              .then(filenames => Promise.all(filenames.map(filename =>
                copyFileIfChanged(srcdirname, targetdirname, filename, exclude_regex)
              )));
//          .map(filename => copyFileIfChanged(srcdirname, targetdirname, filename, exclude_regex)));
}
