import path from "path";
import handler from "./utils/handler";
import failsController from "./api/failController";
import projectController from "./api/projectController";
import testController from "./api/testController";

export default function routes(app) {

        
    app.get('/api/fail', handler.error(failsController.get))
    app.post('/api/fail', handler.error(failsController.post))
    app.delete('/api/fail', handler.error(failsController.delete))

    app.get('/api/test', handler.error(testController.get))

    app.get('/api/project', handler.error(projectController.get))
    app.post('/api/project', handler.error(projectController.post))
    app.delete('/api/project', handler.error(projectController.delete))

    app.get('/api/project/:query/start', handler.error(projectController.start))
    app.get('/api/project/:query/stop', handler.error(projectController.stop))

    app.post('/api/project/:query/start', handler.error(projectController.start))
    app.post('/api/project/:query/stop', handler.error(projectController.stop))

    // app.get('/api/projects/:id/start', projectController.start)
    // app.get('/api/projects/:id/restart', projectController.restart)
    // app.get('/api/projects/:id/stop', projectController.stop)

}
