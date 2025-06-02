"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./api/routes"));
const path_1 = __importDefault(require("path"));
const port = parseInt(process.env.PORT || '3000', 10);
const app = (0, express_1.default)();
app.use('/app', express_1.default.static(path_1.default.join(__dirname, 'public/app')));
app.get('/app/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public/app/index.html'));
});
app.use(express_1.default.json());
(0, routes_1.default)(app);
app.listen(port, () => console.log(`Server listening at http://localhost:${port} as ${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}`));
