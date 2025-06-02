'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const Svg_1 = __importDefault(require("./icons/Svg"));
const Package_1 = __importDefault(require("./Package"));
const navigation_1 = require("next/navigation");
const Texts_1 = require("./texts/Texts");
const ThemeButton_1 = __importDefault(require("./ThemeButton"));
function Aside() {
    const pathname = (0, navigation_1.usePathname)();
    const router = (0, navigation_1.useRouter)();
    const [page, setPage] = (0, react_1.useState)('');
    async function push(page) {
        setPage(page);
        router.push(`/auth/${page}`);
    }
    function selectMenu() {
        if (!window || typeof window == "undefined")
            return;
        const path = window.location.pathname.replace('/auth/', '') || '';
        setPage(path);
    }
    (0, react_1.useEffect)(() => {
        selectMenu();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("aside", { className: 'pt-16 pb-3 px-3 gap-8 h-full hidden flex-col md:flex relative border border-y-0 border-l-0 bg-background-2 dark:bg-background-2-dark dark:border-dark dark:border-y-0 dark:border-l-0', children: [(0, jsx_runtime_1.jsxs)("section", { onClick: () => push(''), className: 'button relative gap-3 flex justify-start items-center cursor-pointer', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.House, { className: `w-6 h-6 ${page == '' ? 'fill-primary' : 'fill-color-1 dark:fill-color-1-dark'}` }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: `mt-1 ${page == '' ? 'text-primary' : ''}`, children: "Home" }), (0, jsx_runtime_1.jsx)("span", { className: `absolute -right-4 w-[.3rem] h-[160%] bg-primary rounded-lg ${page == '' ? '' : 'hidden'}` })] }), (0, jsx_runtime_1.jsxs)("section", { onClick: () => push('dashboard'), className: 'button relative gap-3 flex justify-start items-center cursor-pointer', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.ChartLine, { className: `w-6 h-6 ${page == 'dashboard' ? 'fill-primary' : 'fill-color-1 dark:fill-color-1-dark'}` }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: `mt-1 ${page == 'dashboard' ? 'text-primary' : ''}`, children: "Dashboard" }), (0, jsx_runtime_1.jsx)("span", { className: `absolute -right-4 w-[.3rem] h-[160%] bg-primary rounded-lg ${page == 'dashboard' ? '' : 'hidden'}` })] }), (0, jsx_runtime_1.jsxs)("section", { onClick: () => push('atendimentos'), className: 'button relative gap-3 flex justify-start items-center cursor-pointer', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.List, { className: `w-6 h-6 ${page == 'atendimentos' ? 'fill-primary' : 'fill-color-1 dark:fill-color-1-dark'}` }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: `mt-1 ${page == 'atendimentos' ? 'text-primary' : ''}`, children: "Atendimentos" }), (0, jsx_runtime_1.jsx)("span", { className: `absolute -right-4 w-[.3rem] h-[160%] bg-primary rounded-lg ${page == 'atendimentos' ? '' : 'hidden'}` })] }), (0, jsx_runtime_1.jsxs)("section", { onClick: () => push('estoque'), className: 'button relative gap-3 flex justify-start items-center cursor-pointer', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.Boxes, { className: `w-6 h-6 ${page == 'estoque' ? 'fill-primary' : 'fill-color-1 dark:fill-color-1-dark'}` }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: `mt-1 ${page == 'estoque' ? 'text-primary' : ''}`, children: "Estoque" }), (0, jsx_runtime_1.jsx)("span", { className: `absolute -right-4 w-[.3rem] h-[160%] bg-primary rounded-lg ${page == 'estoque' ? '' : 'hidden'}` })] }), (0, jsx_runtime_1.jsx)(ThemeButton_1.default, { className: "mt-auto mx-auto" }), (0, jsx_runtime_1.jsxs)("section", { onClick: () => push('configuracoes'), className: 'gap-2 flex justify-center items-center', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.Gear, { className: `w-4 h-4 button ${page == 'configuracoes' ? 'fill-primary' : 'fill-color-1 dark:fill-color-1-dark'}` }), (0, jsx_runtime_1.jsxs)(Texts_1.Label, { className: '', children: ["vers\u00E3o ", (0, jsx_runtime_1.jsx)("b", { className: 'text-primary', children: Package_1.default.version })] })] })] }));
}
exports.default = (0, react_1.memo)(Aside);
