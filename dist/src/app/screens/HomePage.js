"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Table_1 = require("../components/elements/Table");
const useNotaification_1 = require("../hooks/useNotaification");
function HomePage() {
    const notification = (0, useNotaification_1.useNotification)();
    const [icon, setIcon] = (0, react_1.useState)('star');
    const [classs, setClasss] = (0, react_1.useState)("");
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex flex-col justify-center items-center gap-4", children: (0, jsx_runtime_1.jsxs)(Table_1.Table, { className: 'w-full', children: [(0, jsx_runtime_1.jsxs)(Table_1.Tr, { children: [(0, jsx_runtime_1.jsx)(Table_1.Th, { className: 'max-w-36 subtitle', children: "C\u00F3digo" }), (0, jsx_runtime_1.jsx)(Table_1.Th, { className: 'max-w-36 subtitle', children: "Nome" }), (0, jsx_runtime_1.jsx)(Table_1.Th, { className: 'max-w-36 subtitle', children: "Estoque" }), (0, jsx_runtime_1.jsx)(Table_1.Th, { className: 'max-w-36 subtitle', children: "Valor" })] }), (0, jsx_runtime_1.jsxs)(Table_1.Tr, { children: [(0, jsx_runtime_1.jsx)(Table_1.Td, { className: 'max-w-36 paragraph', children: "2134" }), (0, jsx_runtime_1.jsx)(Table_1.Td, { className: 'paragraph', children: "Bicicleta" }), (0, jsx_runtime_1.jsx)(Table_1.Td, { className: 'paragraph', onClick: () => notification({ time: 100000, type: 'error', title: 'Atenção', description: 'Nenhum dado foi encontrado', }), children: "234" }), (0, jsx_runtime_1.jsx)(Table_1.Td, { className: 'paragraph', onClick: () => notification({ time: 100000, type: 'error', title: 'Atenção', description: 'Nenhum dado foi encontrado. por causa do erro, Nenhum dado foi encontrado. por causa do erro', }), children: "4.533,45" })] })] }) }));
}
exports.default = HomePage;
