import path from "path";
import handler from "../utils/handler";
import failsController from "./failController";
import projectController from "./projectController";

export default function routes(app) {

        
    app.get('/api/fails', handler.error(failsController.get))
    app.post('/api/fails', handler.error(failsController.post))
    app.delete('/api/fails', handler.error(failsController.delete))

    app.get('/api/projects', handler.error(projectController.get))
    app.post('/api/projects', handler.error(projectController.post))
    app.delete('/api/projects', handler.error(projectController.delete))

    app.get('/api/projects/:id/start', handler.error(projectController.start))
    app.get('/api/projects/:id/stop', handler.error(projectController.stop))

    // app.get('/api/projects/:id/start', projectController.start)
    // app.get('/api/projects/:id/restart', projectController.restart)
    // app.get('/api/projects/:id/stop', projectController.stop)

}
