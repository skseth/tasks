'use strict';

import tinyLr from 'tiny-lr'
import child_process from 'child_process'
import chokidar from 'chokidar';
import {FsWatcher} from 'chokidar';
import Rx from 'rxjs';
import { EventEmitter } from 'events';

// build steps
import buildServer from './tasks/buildServer';
import buildClient from './tasks/buildClient';


class LiveReloadServer extends EventEmitter {

  constructor(port = 35729) {
    super();
    this._instance = null
    this._port = port
    const publicdir = '../client/build'
    this._watcher = chokidar.watch(publicdir, {
      persistent: true,
      ignoreInitial: true,
      followSymlinks : false
    })
    .on('all', (event, path) => {
      console.log(`${event} - ${path}`)
        this.changed(path.slice(publicdir.length))
    })
    this._start()
  }

  changed(filepath) {
    console.log(`lrserver ${filepath}`)
    this._instance.changed({
        body: {
          files: [ filepath ]
        }
    });
  }

  stop() {
    this._watcher.close()
    this._instance.close()
  }

  async _start() {
    this._instance = tinyLr();
    await this._instance.listen(this._port);
    this.emit('started')
  }
}

class WebServer extends EventEmitter {

  constructor(port = 3000) {
    super();
    this._instance = null
    this._port = port
    this._start()
  }

  stop() {
    return new Promise((resolve, reject) => {
      if( this._instance.connected ) {
        this._registerExit()
        this._kill()
      }
      this.emit('stopped')
      resolve()
    });
  }

  restart( event ) {
    return this.stop()
      .then(this._start())
      .then(this.emit('restarted'))
  }

  async _start() {
      this._instance = await child_process.fork( 'server.js', {
        silent: true,
        env: { NODE_ENV: 'development', PORT: this._port },
        cwd: '../server/build'
      });
      this._instance.stdout.pipe( process.stdout );
      this._instance.stderr.pipe( process.stderr );
      console.log( `web server ( PID: ${this._instance.pid} )` );
  }

  _registerExit() {
    this._instance.on( 'exit', () => {
      console.log(`STOPPED web server ( PID: ${this._instance.pid} )` );
    });
  }

  _kill() {
    try {
      this._instance.kill( 'SIGINT' );
    }
    catch(err) {
      console.log(`ERROR STOPPING express server ( PID: ${this._instance.pid}): ${err}`);
    }
  }
}

class ClientBuilder extends EventEmitter {
  constructor() {
    super();
    this._watcher = chokidar.watch('../client/src', {
      persistent: true,
      ignoreInitial: true,
      followSymlinks : false
    })
    .on('all', (event, path) => {this._build(path)})
  }

  stop() {
    this._watcher.close()
  }

  _build(path) {
    buildClient()
    .then(this.emit('done'))
  }
}

class ServerBuilder extends EventEmitter {
  constructor() {
    super();
    this._watcher = chokidar.watch('../server/src', {
      persistent: true,
      ignoreInitial: true,
      followSymlinks : false
    })
    .on('all', (event, path) => {this._build(path)})
  }

  stop() {
    this._watcher.close()
  }

  _build(path) {
    buildServer()
    .then(this.emit('done'))
  }
}

class DevServer {
  constructor() {
    this._livereload = new LiveReloadServer()
    this._webserver = new WebServer()
    this._clientbuilder = new ClientBuilder()
    this._serverbuilder = new ServerBuilder()

    this._serverBuildSubscription = Rx.Observable.fromEvent(this._serverbuilder, 'done')
      .subscribe(() => this._webserver.restart())

    this._serverRestartSubscription = Rx.Observable.fromEvent(this._webserver, 'restarted')
      .subscribe(() => this._livereload.changed('index.html'))
  }

  stop() {
    this._livereload.stop()
    this._webserver.stop()
    this._clientbuilder.stop()
    this._serverbuilder.stop()
  }
}

const devserver = new DevServer()

process.on('SIGINT', function(e) {
  console.log('\nStopping ...');
  devserver.stop()
});

process.on('uncaughtException', function(e) {
  console.log(`\nStopping Uncaught Exception ${e}`);
  console.log(e.stack)
  devserver.stop()
});
