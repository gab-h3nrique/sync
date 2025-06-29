"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Svg_1 = __importDefault(require("../components/elements/Svg"));
const Table_1 = require("../components/elements/Table");
const useNotaification_1 = require("../hooks/useNotaification");
const Texts_1 = require("../components/elements/Texts");
const react_router_1 = require("react-router");
const Button_1 = __importDefault(require("../components/elements/Button"));
const Loading_1 = __importDefault(require("../components/elements/Loading"));
const http_1 = __importDefault(require("../libs/http"));
const format_1 = __importDefault(require("../../utils/format"));
const Status_1 = __importDefault(require("../components/elements/Status"));
function ProjecstPage() {
    let navigate = (0, react_router_1.useNavigate)();
    const notification = (0, useNotaification_1.useNotification)();
    const [paginate, setPaginate] = (0, react_1.useState)({ page: 1, limit: 10, total: 0, loading: false, input: '' });
    const [array, setArray] = (0, react_1.useState)([]);
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
    async function getPaginated(page, search = false) {
        try {
            setPaginate({ ...paginate, loading: true });
            const { data, success, message } = await http_1.default.get("projects", { page, limit: paginate.limit, search: paginate.input });
            if (!success)
                notification({ type: 'warning', title: 'Warning', description: message });
            setPaginate({ ...paginate, total: data.total, page: page });
            notification({ type: 'success', description: 'Projects load successfully', time: 1000 });
            if (search)
                return setArray(data);
            setArray(prev => ([...prev, ...data]));
        }
        catch (error) {
            console.error(error);
            notification({ type: 'error', title: 'Ops!', description: error?.message });
        }
        finally {
            setPaginate({ ...paginate, loading: false });
        }
    }
    (0, react_1.useEffect)(() => {
        getPaginated(1, true);
    }, []);
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(Loading_1.default, {}), children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col gap-4 p-4", children: [(0, jsx_runtime_1.jsxs)("section", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)(Texts_1.Title, { className: 'font-semibold', children: "Projects" }), (0, jsx_runtime_1.jsxs)(Texts_1.Description, { onClick: () => navigate(-1), className: 'flex gap-1 cursor-pointer w-fit', children: [(0, jsx_runtime_1.jsx)(Svg_1.default, { name: "angle", className: 'w-4 h-4 fill-color-1 -rotate-90 mt-[.25rem]' }), "go back"] })] }), (0, jsx_runtime_1.jsx)("section", { className: "flex gap-4 justify-end items-center", children: (0, jsx_runtime_1.jsxs)(Button_1.default, { onClick: () => navigate(`/projects/project`), children: [(0, jsx_runtime_1.jsx)(Svg_1.default, { name: "plus", className: 'w-5 h-5 fill-color-1' }), (0, jsx_runtime_1.jsx)(Texts_1.Subtitle, { className: 'text-color-1', children: "New project" })] }) }), (0, jsx_runtime_1.jsxs)(Table_1.Table, { className: 'w-full', children: [(0, jsx_runtime_1.jsxs)(Table_1.Tr, { children: [(0, jsx_runtime_1.jsx)(Table_1.Th, { className: 'subtitle max-w-20 min-w-20', children: "Id" }), (0, jsx_runtime_1.jsx)(Table_1.Th, { className: 'subtitle truncate w-full', children: "Name" }), (0, jsx_runtime_1.jsx)(Table_1.Th, { className: 'subtitle hidden md:flex truncate w-full', children: "url" }), (0, jsx_runtime_1.jsx)(Table_1.Th, { className: 'subtitle hidden md:flex max-w-36 min-w-36', children: "branch" }), (0, jsx_runtime_1.jsx)(Table_1.Th, { className: 'subtitle hidden md:flex max-w-30 min-w-30', children: "status" }), (0, jsx_runtime_1.jsx)(Table_1.Th, { className: 'subtitle hidden md:flex max-w-52 min-w-52', children: "date" })] }), array.map((item, i) => ((0, jsx_runtime_1.jsxs)(Table_1.Tr, { className: 'duration-150 hover:scale-x-[1.005] cursor-pointer', onClick: () => navigate(`/projects/project?id=${item.id}`), children: [(0, jsx_runtime_1.jsx)(Table_1.Td, { className: 'paragraph max-w-20 min-w-20', children: item.id }), (0, jsx_runtime_1.jsx)(Table_1.Td, { className: 'paragraph truncate w-full', children: (0, jsx_runtime_1.jsx)(Texts_1.Paragraph, { className: 'truncate', children: item.name }) }), (0, jsx_runtime_1.jsx)(Table_1.Td, { className: 'paragraph hidden md:flex truncate w-full', children: (0, jsx_runtime_1.jsx)(Texts_1.Paragraph, { className: 'truncate', children: item.url }) }), (0, jsx_runtime_1.jsx)(Table_1.Td, { className: 'paragraph hidden md:flex max-w-36 min-w-36', children: item.branch || 'main' }), (0, jsx_runtime_1.jsx)(Table_1.Td, { className: 'paragraph hidden md:flex max-w-30 min-w-30', children: (0, jsx_runtime_1.jsx)(Status_1.default, { type: handlerStatus(item.status), value: item.status }) }), (0, jsx_runtime_1.jsx)(Table_1.Td, { className: 'paragraph hidden md:flex max-w-52 min-w-52 cursor-pointer', title: format_1.default.date(item.updatedAt), children: format_1.default.creationTime(item.updatedAt) })] }, `id-${i}`)))] })] }) }));
}
exports.default = ProjecstPage;
