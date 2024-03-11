import cluster from 'cluster';
import os from 'os';
import { init } from './init';

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      cluster.fork();
    }
  });
} else {
  init();
}
