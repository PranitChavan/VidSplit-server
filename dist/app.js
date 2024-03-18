"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
(0, init_1.init)();
// if (cluster.isPrimary) {
//   for (let i = 0; i < os.cpus().length; i++) {
//     cluster.fork();
//   }
//   cluster.on('exit', (worker, code) => {
//     if (code !== 0 && !worker.exitedAfterDisconnect) {
//       cluster.fork();
//     }
//   });
// } else {
//   init();
// }
//# sourceMappingURL=app.js.map