/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { run } from './tasks/run'

if (require.main === module && process.argv.length > 2) {
  delete require.cache[__filename]; // eslint-disable-line no-underscore-dangle
  const module = require(`./tasks/${process.argv[2]}.js`).default;
  run(module).catch(err => { console.error(err.stack); process.exit(1); });
}
