import handler from "../utils/handler";
import failsController from "./failController";

export default function routes(app) {

        
    app.get('/api/fails', handler.error(failsController.get));
    app.post('/api/fails', handler.error(failsController.post));
    app.delete('/api/fails', handler.error(failsController.delete));


}
