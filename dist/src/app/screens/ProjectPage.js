"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Svg_1 = __importDefault(require("../components/elements/Svg"));
const useNotaification_1 = require("../hooks/useNotaification");
const Texts_1 = require("../components/elements/Texts");
const react_router_1 = require("react-router");
const Button_1 = __importDefault(require("../components/elements/Button"));
const Loading_1 = __importDefault(require("../components/elements/Loading"));
const http_1 = __importDefault(require("../libs/http"));
const projectType_1 = require("../../types/projectType");
const Input_1 = __importDefault(require("../components/elements/Input"));
function ProjectPage() {
    let navigate = (0, react_router_1.useNavigate)();
    const notification = (0, useNotaification_1.useNotification)();
    const [load, setLoad] = (0, react_1.useState)({ get: false, save: false, delete: false, run: false, stop: false });
    const [item, setItem] = (0, react_1.useState)(projectType_1.EMPTY_PROJECT);
    function handlerStatus(status) {
        // stopped, building, starting, restarting, running, error
        if (status == 'running')
            return 'success';
        if (status == 'stopped')
            return 'neutral';
        if (status == 'error')
            return 'error';
        if (status == 'starting')
            return 'warning';
        if (status == 'building')
            return 'warning';
        if (status == 'restarting')
            return 'warning';
        return 'neutral';
    }
    // projects?page=1&limit=10
    async function getItem() {
        try {
            setLoad({ ...load, get: true });
            const id = new URLSearchParams(window.location.search).get('id');
            const { data, success, message } = await http_1.default.get("projects", { id: id });
            if (!success)
                notification({ type: 'warning', title: 'Warning', description: message });
            // notification({ type: 'success', description: 'Projects load successfully', time: 1000 })
            setItem(data);
        }
        catch (error) {
            console.error(error);
            notification({ type: 'error', title: 'Ops!', description: error?.message });
        }
        finally {
            setLoad({ ...load, get: false });
        }
    }
    async function command(type) {
        try {
            if (!item.name)
                return notification({ type: 'warning', title: 'Warning', description: 'Project name is required' });
            if (!item.id)
                return notification({ type: 'warning', title: 'Warning', description: 'Project doesnt exist' });
            setLoad({ ...load, run: true });
            const { data, success, message } = await http_1.default.get(`projects/${item.id}/${type}`);
            if (!success)
                notification({ type: 'warning', title: 'Warning', description: message });
            notification({ type: 'success', description: 'command send successfully' });
        }
        catch (error) {
            console.error(error);
            notification({ type: 'error', title: 'Ops!', description: error?.message });
        }
        finally {
            setLoad({ ...load, run: false });
        }
    }
    async function save() {
        try {
            if (!item.name)
                return notification({ type: 'warning', title: 'Warning', description: 'Project name is required' });
            setLoad({ ...load, save: true });
            const { data, success, message } = await http_1.default.post("projects", item);
            if (!success)
                notification({ type: 'warning', title: 'Warning', description: message });
            setItem(data);
            notification({ type: 'success', description: 'data save successfully' });
        }
        catch (error) {
            console.error(error);
            notification({ type: 'error', title: 'Ops!', description: error?.message });
        }
        finally {
            setLoad({ ...load, save: false });
        }
    }
    (0, react_1.useEffect)(() => { getItem(); }, []);
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(Loading_1.default, {}), children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col gap-4 p-4", children: [(0, jsx_runtime_1.jsxs)("section", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)(Texts_1.Title, { className: 'font-semibold', children: item?.name }), (0, jsx_runtime_1.jsxs)(Texts_1.Description, { onClick: () => navigate(-1), className: 'flex gap-1 cursor-pointer w-fit', children: [(0, jsx_runtime_1.jsx)(Svg_1.default, { name: "angle", className: 'w-4 h-4 fill-color-1 -rotate-90 mt-[.25rem]' }), "go back"] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "flex gap-4 justify-end items-center", children: [(0, jsx_runtime_1.jsxs)(Button_1.default, { onClick: () => command('stop'), className: 'ml-auto', children: [load.stop ? 'Stoping...' : 'Stop', (0, jsx_runtime_1.jsx)(Svg_1.default, { name: "spinner", className: `w-5 h-5 text-color-1 animate-spin ${!load.stop ? 'hidden' : ''}` })] }), (0, jsx_runtime_1.jsxs)(Button_1.default, { onClick: () => command('start'), className: '', children: [load.run ? 'Running...' : 'Run', (0, jsx_runtime_1.jsx)(Svg_1.default, { name: "spinner", className: `w-5 h-5 text-color-1 animate-spin ${!load.run ? 'hidden' : ''}` })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: 'flex flex-wrap gap-4', children: [(0, jsx_runtime_1.jsxs)("article", { className: 'flex flex-1 flex-col gap-4 p-4 min-w-72 rounded-xl border-2 border-border bg-background-2', children: [(0, jsx_runtime_1.jsxs)(Texts_1.Subtitle, { children: ["Project Settings ", (0, jsx_runtime_1.jsx)("span", { className: 'text-red-500', children: "*" })] }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { children: "Used to identify your Project on the Dashboard, Server CLI, and in the URL of your Deployments." }), (0, jsx_runtime_1.jsxs)(Texts_1.Description, { children: ["Name ", (0, jsx_runtime_1.jsx)("span", { className: 'text-red-500', children: "*" })] }), (0, jsx_runtime_1.jsx)(Input_1.default, { className: 'flex-1 max-w-72 -mt-2', type: 'text', onChange: (e) => setItem((prev) => ({ ...prev, name: e.target.value })), value: item.name }), (0, jsx_runtime_1.jsxs)("section", { className: 'flex flex-wrap gap-4', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col flex-1 gap-2', children: [(0, jsx_runtime_1.jsxs)(Texts_1.Description, { children: ["Url ", (0, jsx_runtime_1.jsx)("span", { className: 'text-red-500', children: "*" })] }), (0, jsx_runtime_1.jsx)(Input_1.default, { className: 'flex-1 -mt-2', type: 'text', onChange: (e) => setItem((prev) => ({ ...prev, url: e.target.value })), value: item.url })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col w-40 gap-2', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { children: "Branch" }), (0, jsx_runtime_1.jsx)(Input_1.default, { className: 'flex-1 -mt-2', type: 'text', onChange: (e) => setItem((prev) => ({ ...prev, branch: e.target.value })), value: item.branch })] })] }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { children: "Envs" }), (0, jsx_runtime_1.jsx)(Input_1.default, { className: 'flex-1 -mt-2', type: 'text', onChange: (e) => setItem((prev) => ({ ...prev, envs: e.target.value })), value: item.envs }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { children: "Commands" }), (0, jsx_runtime_1.jsx)(Input_1.default, { className: 'flex-1 -mt-2', type: 'text', onChange: (e) => setItem((prev) => ({ ...prev, commands: e.target.value })), value: item.commands }), (0, jsx_runtime_1.jsxs)(Button_1.default, { onClick: save, className: 'ml-auto', children: [load.save ? 'Saving...' : 'Save', (0, jsx_runtime_1.jsx)(Svg_1.default, { name: "spinner", className: `w-5 h-5 text-color-1 animate-spin ${!load.save ? 'hidden' : ''}` })] })] }), (0, jsx_runtime_1.jsxs)("article", { className: 'flex flex-1 flex-col gap-4 p-4 min-w-72 rounded-xl border-2 border-border bg-background-2', children: [(0, jsx_runtime_1.jsx)(Texts_1.Subtitle, { children: "Deployments" }), (0, jsx_runtime_1.jsxs)(Texts_1.Description, { children: ["Automatically created for pushes to ", item.url] })] })] })] }) }));
}
exports.default = ProjectPage;
