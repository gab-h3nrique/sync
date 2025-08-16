"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
const handler_1 = __importDefault(require("../utils/handler"));
const failController_1 = __importDefault(require("./failController"));
const projectController_1 = __importDefault(require("./projectController"));
function routes(app) {
    app.get('/api/fail', handler_1.default.error(failController_1.default.get));
    app.post('/api/fail', handler_1.default.error(failController_1.default.post));
    app.delete('/api/fail', handler_1.default.error(failController_1.default.delete));
    app.get('/api/project', handler_1.default.error(projectController_1.default.get));
    app.post('/api/project', handler_1.default.error(projectController_1.default.post));
    app.delete('/api/project', handler_1.default.error(projectController_1.default.delete));
    app.get('/api/project/:id/start', handler_1.default.error(projectController_1.default.start));
    app.get('/api/project/:id/stop', handler_1.default.error(projectController_1.default.stop));
    // app.get('/api/projects/:id/start', projectController.start)
    // app.get('/api/projects/:id/restart', projectController.restart)
    // app.get('/api/projects/:id/stop', projectController.stop)
}
