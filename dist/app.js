"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const init_1 = require("./init");
if (cluster_1.default.isPrimary) {
    for (let i = 0; i < os_1.default.cpus().length; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            cluster_1.default.fork();
        }
    });
}
else {
    (0, init_1.init)();
}
//# sourceMappingURL=app.js.map