'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Svg_1 = __importDefault(require("../icons/Svg"));
const Texts_1 = require("./Texts");
const react_router_1 = require("react-router");
function Tab() {
    let navigate = (0, react_router_1.useNavigate)();
    // const router = useRouter()
    const [page, setPage] = (0, react_1.useState)('');
    async function push(page) {
        // router.push(`/auth/${page}`)
        // redirect(`/${page}`)
        navigate(`/${page}`);
        setPage(page);
    }
    return ((0, jsx_runtime_1.jsxs)("nav", { className: 'p-3 gap-8 w-full h-fit justify-center flex md:hidden relative border border-x-0 border-b-0 dark:border-dark dark:border-x-0 dark:border-b-0 bg-background-2 dark:bg-background-2-dark overflow-auto', children: [(0, jsx_runtime_1.jsxs)("section", { onClick: () => push(''), className: 'button relative gap-1 flex flex-col justify-start items-center cursor-pointer', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.House, { className: `w-6 h-6 ${page == '' ? 'fill-primary' : 'fill-color-1 dark:fill-color-1-dark'}` }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: `mt-1 ${page == '' ? 'text-primary' : ''}`, children: "Home" })] }), (0, jsx_runtime_1.jsxs)("section", { onClick: () => push('projects'), className: 'button relative gap-1 flex flex-col justify-start items-center cursor-pointer', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.ChartLine, { className: `w-6 h-6 ${page == 'dashboard' ? 'fill-primary' : 'fill-color-1 dark:fill-color-1-dark'}` }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: `mt-1 ${page == 'dashboard' ? 'text-primary' : ''}`, children: "Dashboard" })] }), (0, jsx_runtime_1.jsxs)("section", { onClick: () => push('atendimentos'), className: 'button relative gap-1 flex flex-col justify-start items-center cursor-pointer', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.List, { className: `w-6 h-6 ${page == 'atendimentos' ? 'fill-primary' : 'fill-color-1 dark:fill-color-1-dark'}` }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: `mt-1 ${page == 'atendimentos' ? 'text-primary' : ''}`, children: "Atendimentos" })] }), (0, jsx_runtime_1.jsxs)("section", { onClick: () => push('estoque'), className: 'button relative gap-1 flex flex-col justify-start items-center cursor-pointer', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.Boxes, { className: `w-6 h-6 ${page == 'estoque' ? 'fill-primary' : 'fill-color-1 dark:fill-color-1-dark'}` }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: `mt-1 ${page == 'estoque' ? 'text-primary' : ''}`, children: "Estoque" })] }), (0, jsx_runtime_1.jsxs)("section", { onClick: () => push('configuracoes'), className: 'button relative gap-1 flex flex-col justify-start items-center cursor-pointer', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.Gear, { className: `w-6 h-6 ${page == 'configuracoes' ? 'fill-primary' : 'fill-color-1 dark:fill-color-1-dark'}` }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: `mt-1 ${page == 'configuracoes' ? 'text-primary' : ''}`, children: "Configura\u00E7\u00E3o" })] })] }));
}
exports.default = (0, react_1.memo)(Tab);
