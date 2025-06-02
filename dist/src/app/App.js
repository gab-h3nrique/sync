"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
require("./globals.css");
const HomePage_1 = __importDefault(require("./screens/HomePage"));
const ProjectsPage_1 = __importDefault(require("./screens/ProjectsPage"));
const Tab_1 = __importDefault(require("./components/Tab"));
function App() {
    return ((0, jsx_runtime_1.jsx)(react_router_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)("section", { className: 'flex w-full h-full flex-col bg-background-1', children: [(0, jsx_runtime_1.jsx)(Tab_1.default, {}), (0, jsx_runtime_1.jsx)("main", { className: 'flex w-full h-full overflow-hidden relative', children: (0, jsx_runtime_1.jsxs)(react_router_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(HomePage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_1.Route, { path: "/projects", element: (0, jsx_runtime_1.jsx)(ProjectsPage_1.default, {}) })] }) }), (0, jsx_runtime_1.jsx)(Tab_1.default, {})] }) }));
}
