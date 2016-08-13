/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Promise from 'bluebird';
import path from 'path';
import gaze from 'gaze';
import fs from 'fs';
/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */

function ensureBuildFolderExists() {
  return new Promise(function(resolve, reject){
		fs.mkdir('build', function(err){
			if (err && err.code != 'EEXIST') {
        console.log(err)
				reject(err);
			} else {
				resolve()
			}
		});
  });
}

function copyFiles() {
  const ncp = Promise.promisify(require('ncp'));
  return Promise.all([
    ncp('client', 'build/public')
    .then(console.log('done copying'))
    .catch(err => console.log(err))
  ]);
}

export async function copy({ watch } = {}) {
  await ensureBuildFolderExists()
    .then(copyFiles())
}

export async function copyWatch() {
  await copy({ watch : true})
}
