"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_1 = require("react-router");
require("./globals.css");
const Tab_1 = __importDefault(require("./components/elements/Tab"));
const Content_1 = __importDefault(require("./components/elements/Content"));
const ProjectPage_1 = __importDefault(require("./screens/ProjectPage"));
const ProjectsPage_1 = __importDefault(require("./screens/ProjectsPage"));
function App() {
    return ((0, jsx_runtime_1.jsx)(react_router_1.BrowserRouter, { basename: "/app", children: (0, jsx_runtime_1.jsxs)(Content_1.default, { className: 'flex w-full h-full flex-col bg-background-1', children: [(0, jsx_runtime_1.jsx)(Tab_1.default, {}), (0, jsx_runtime_1.jsx)("main", { className: 'flex w-full h-full overflow-hidden relative', children: (0, jsx_runtime_1.jsxs)(react_router_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(ProjectsPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_1.Route, { path: "/projects", element: (0, jsx_runtime_1.jsx)(ProjectsPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_1.Route, { path: "/projects/project", element: (0, jsx_runtime_1.jsx)(ProjectPage_1.default, {}) })] }) }), (0, jsx_runtime_1.jsx)(Tab_1.default, {})] }) }));
}
