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
const Button_1 = __importDefault(require("@/components/elements/Button"));
const Checkbox_1 = __importDefault(require("@/components/elements/Checkbox"));
const Hr_1 = __importDefault(require("@/components/elements/Hr"));
const Input_1 = __importDefault(require("@/components/elements/Input"));
const Select_1 = __importDefault(require("@/components/elements/Select"));
const Svg_1 = __importDefault(require("@/components/icons/Svg"));
const Texts_1 = require("@/components/texts/Texts");
const useNotaification_1 = require("@/hooks/useNotaification");
const http_1 = __importDefault(require("@/providers/http"));
const productType_1 = require("@/types/productType");
const format_1 = __importDefault(require("@/utils/format"));
const react_1 = __importStar(require("react"));
function ProdctModal({ isOpen, product, onClose }) {
    const notification = (0, useNotaification_1.useNotification)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [saveLoading, setSaveLoading] = (0, react_1.useState)(false);
    const [removeLoading, setRemoveLoading] = (0, react_1.useState)(false);
    const [edited, setEdited] = (0, react_1.useState)(productType_1.EMPTY_PRODUCT);
    const [brandArray, setBrandArray] = (0, react_1.useState)();
    async function getBrands() {
        try {
            setLoading(true);
            const { data, success, message, ...rest } = await http_1.default.get('/api/auth/brands');
            if (!success)
                return notification({ type: 'error', title: 'Atenção', description: 'Nenhum dado foi encontrado.' });
            setBrandArray(data);
        }
        catch (error) {
            return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os dados.' });
        }
        finally {
            setLoading(false);
        }
    }
    async function remove() {
        try {
            if (saveLoading)
                return;
            setRemoveLoading(true);
            const { data, total, success, message, ...rest } = await http_1.default.delete('/api/auth/products', { id: edited.id });
            if (!success)
                return notification({ type: 'warning', title: 'Atenção', description: 'Nenhum dado foi excluido.' });
            notification({ type: 'success', title: 'Sucesso', description: 'Os dados foram excluidos com sucesso.' });
            onClose({ deleted: edited });
        }
        catch (error) {
            return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao excluir os produtos.' });
        }
        finally {
            setRemoveLoading(false);
        }
    }
    async function save() {
        try {
            if (saveLoading)
                return;
            setSaveLoading(true);
            const formated = {
                ...edited,
                costValue: Number(String(edited.costValue).replace(',', '.')),
                value: Number(String(edited.value).replace(',', '.'))
            };
            const { data, total, success, message, ...rest } = await http_1.default.post('/api/auth/products', formated);
            if (!success)
                return notification({ type: 'warning', title: 'Atenção', description: 'Nenhum dado foi encontrado.' });
            notification({ type: 'success', title: 'Sucesso', description: 'Os dados foram salvos com sucesso.' });
            onClose({ updated: data });
        }
        catch (error) {
            return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os produtos.' });
        }
        finally {
            setSaveLoading(false);
        }
    }
    (0, react_1.useEffect)(() => {
        if (product)
            setEdited({ ...product });
        if (!isOpen) {
            setEdited(productType_1.EMPTY_PRODUCT);
        }
    }, [isOpen]);
    (0, react_1.useEffect)(() => {
        getBrands();
    }, []);
    return ((0, jsx_runtime_1.jsx)("section", { className: `bg-background-1 dark:bg-background-1-dark flex w-full h-full ${isOpen ? 'fles' : 'hidden'}`, children: (0, jsx_runtime_1.jsx)("div", { className: 'py-12 gap-1 w-full h-full flex flex-col items-center relative', children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-12 w-full max-w-[45rem] pb-10", children: [(0, jsx_runtime_1.jsxs)("section", { onClick: () => console.log(product, edited), className: 'flex flex-col', children: [(0, jsx_runtime_1.jsx)(Texts_1.Paragraph, { children: "Produto / Servi\u00E7o" }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'text-color-3 dark:text-color-3-dark', children: "Defina as informa\u00E7\u00F5es do produto / servi\u00E7o" })] }), (0, jsx_runtime_1.jsxs)("section", { className: 'grid grid-cols-4 gap-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'col-span-4 max-w-[20rem]', children: [(0, jsx_runtime_1.jsxs)(Texts_1.Description, { className: 'mb-1 text-color-2 dark:text-color-2-dark', children: ["Nome", (0, jsx_runtime_1.jsx)("span", { className: 'ml-1 text-red-500', children: "*" })] }), (0, jsx_runtime_1.jsx)(Input_1.default, { type: 'text', onChange: (e) => setEdited(prev => ({ ...prev, name: e.target.value })), value: edited?.name })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'col-span-4 max-w-[20rem]', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1 text-color-2 dark:text-color-2-dark', children: "Marca" }), (0, jsx_runtime_1.jsx)(Select_1.default, { className: 'w-full', data: brandArray, value: edited?.brand, renderItem: (e, i) => (0, jsx_runtime_1.jsx)("div", { onClick: () => setEdited(prev => ({ ...prev, brand: e.name })), children: e.name }, i) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'col-span-4 max-w-[20rem]', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1', children: "Tipo" }), (0, jsx_runtime_1.jsxs)("div", { className: 'mb-2 flex items-center gap-3', children: [(0, jsx_runtime_1.jsx)(Checkbox_1.default, { onChange: (e) => setEdited(prev => ({ ...prev, type: 'produto' })), value: edited.type == 'produto' }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1', children: "produto" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center gap-3', children: [(0, jsx_runtime_1.jsx)(Checkbox_1.default, { onChange: (e) => setEdited(prev => ({ ...prev, type: 'serviço' })), value: edited.type == 'serviço' }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1', children: "servi\u00E7o" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: `col-span-4 max-w-[20rem] ${edited.type == 'serviço' ? 'hidden' : ''}`, children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1 text-color-2 dark:text-color-2-dark', children: "Estoque" }), (0, jsx_runtime_1.jsx)(Input_1.default, { type: 'number', onChange: (e) => setEdited(prev => ({ ...prev, stock: Number(e.target.value) })), value: edited?.stock })] })] }), (0, jsx_runtime_1.jsx)(Hr_1.default, {}), (0, jsx_runtime_1.jsxs)("section", { onClick: () => console.log(product, edited), className: 'flex flex-col', children: [(0, jsx_runtime_1.jsx)(Texts_1.Paragraph, { children: "Valores" }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'text-color-3 dark:text-color-3-dark', children: "Configure os valores de compra e venda" })] }), (0, jsx_runtime_1.jsxs)("section", { className: 'grid grid-cols-4 gap-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'col-span-4 max-w-[20rem]', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1 text-color-2 dark:text-color-2-dark', children: "Compra" }), (0, jsx_runtime_1.jsx)(Input_1.default, { type: "text", className: '', onChange: (e) => setEdited(prev => ({ ...prev, costValue: format_1.default.money(e.target.value) })), value: format_1.default.money(edited.costValue) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'col-span-4 max-w-[20rem]', children: [(0, jsx_runtime_1.jsxs)(Texts_1.Description, { className: 'mb-1 text-color-2 dark:text-color-2-dark', children: ["Venda", (0, jsx_runtime_1.jsx)("span", { className: 'ml-1 text-red-500', children: "*" })] }), (0, jsx_runtime_1.jsx)(Input_1.default, { type: "text", className: '', onChange: (e) => setEdited(prev => ({ ...prev, value: format_1.default.money(e.target.value) })), value: format_1.default.money(edited.value) })] })] }), (0, jsx_runtime_1.jsx)(Hr_1.default, {}), (0, jsx_runtime_1.jsxs)("section", { className: 'flex gap-4', children: [(0, jsx_runtime_1.jsxs)(Button_1.default, { onClick: remove, className: `justify-center text-color-2 dark:text-color-2-dark min-w-[82px] ${edited.id && edited.id != -1 ? 'flex' : 'hidden'}`, children: [(0, jsx_runtime_1.jsx)(Svg_1.default.Spinner, { className: `w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4] ${!removeLoading && 'hidden'}` }), !removeLoading ? 'Excluir' : ''] }), (0, jsx_runtime_1.jsx)(Button_1.default, { onClick: () => onClose(), className: 'ml-auto text-color-2 dark:text-color-2-dark', children: "Cancelar" }), (0, jsx_runtime_1.jsxs)(Button_1.default, { onClick: save, className: 'flex justify-center bg-primary text-background-2 dark:text-background-2-dark min-w-[82px]', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.Spinner, { className: `w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4] ${!saveLoading && 'hidden'}` }), !saveLoading ? 'Salvar' : ''] })] })] }) }) }));
}
exports.default = (0, react_1.memo)(ProdctModal);
