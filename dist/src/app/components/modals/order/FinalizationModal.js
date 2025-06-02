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
const Status_1 = __importDefault(require("@/components/elements/Status"));
const Switch_1 = __importDefault(require("@/components/elements/Switch"));
const Table_1 = require("@/components/elements/Table");
const Textarea_1 = __importDefault(require("@/components/elements/Textarea"));
const Svg_1 = __importDefault(require("@/components/icons/Svg"));
const Texts_1 = require("@/components/texts/Texts");
const useNotaification_1 = require("@/hooks/useNotaification");
const http_1 = __importDefault(require("@/providers/http"));
const orderProductsType_1 = require("@/types/orderProductsType");
const orderType_1 = require("@/types/orderType");
const format_1 = __importDefault(require("@/utils/format"));
const react_1 = __importStar(require("react"));
function OrderModal({ isOpen, order, onClose }) {
    const notification = (0, useNotaification_1.useNotification)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [saveLoading, setSaveLoading] = (0, react_1.useState)(false);
    const [removeLoading, setRemoveLoading] = (0, react_1.useState)(false);
    const [clientInfo, setClientInfo] = (0, react_1.useState)(false);
    const [vehicleInfo, setVehicleInfo] = (0, react_1.useState)(false);
    const [editedOrder, setEditedOrder] = (0, react_1.useState)(orderType_1.EMPTY_ORDER);
    const [editedOrderProducts, setEditedOrderProducts] = (0, react_1.useState)(orderProductsType_1.EMPTY_ORDER_PRODUCTS);
    const [productArray, setProductArray] = (0, react_1.useState)();
    async function getProducts() {
        try {
            setLoading(true);
            const { data, success, message, ...rest } = await http_1.default.get('/api/auth/products');
            if (!success)
                return notification({ type: 'error', title: 'Atenção', description: 'Nenhum dado foi encontrado.' });
            setProductArray(data);
        }
        catch (error) {
            return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os dados.' });
        }
        finally {
            setLoading(false);
        }
    }
    function addProduct() {
        const newOrderProducts = {
            ...orderProductsType_1.EMPTY_ORDER_PRODUCTS,
            id: undefined,
            productId: -1,
            orderId: editedOrder.id || -1,
            edit: true,
        };
        const newList = editedOrder.orderProducts || [];
        newList?.push({ ...newOrderProducts });
        setEditedOrder(prev => ({
            ...prev,
            orderProducts: [...newList]
        }));
    }
    function editProduct(item, index) {
        const newList = editedOrder.orderProducts ? editedOrder.orderProducts.map((e, i) => i == index ? item : { ...e, edit: false }) : [];
        setEditedOrder(prev => ({ ...prev, orderProducts: [...newList] }));
        setEditedOrderProducts(item);
    }
    function saveEditProduct(index) {
        const newList = editedOrder.orderProducts ? editedOrder.orderProducts.map((e, i) => i == index ? { ...editedOrderProducts, edit: false } : e) : [];
        setEditedOrder(prev => ({ ...prev, orderProducts: newList }));
        setEditedOrderProducts(orderProductsType_1.EMPTY_ORDER_PRODUCTS);
    }
    function removeProduct(index) {
        // setEditedOrderProducts(null)
        const newList = editedOrder.orderProducts ? editedOrder.orderProducts.filter((e, i) => i !== index) : [];
        setEditedOrder(prev => ({
            ...prev,
            orderProducts: newList
        }));
    }
    function totalCalc() {
        if (!editedOrder.orderProducts || !editedOrder.orderProducts?.length)
            return '0.00';
        return editedOrder?.orderProducts.filter(a => a.status == 'finalizado').reduce((a, b) => a + b.value, 0);
    }
    async function remove() {
        try {
            if (saveLoading)
                return;
            setRemoveLoading(true);
            const { data, total, success, message, ...rest } = await http_1.default.delete('/api/auth/orders', { id: editedOrder.id });
            if (!success)
                return notification({ type: 'warning', title: 'Atenção', description: 'Nenhum dado foi excluido.' });
            notification({ type: 'success', title: 'Sucesso', description: 'Os dados foram excluidos com sucesso.' });
            onClose({ deleted: editedOrder });
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
            const formatedOrderProducts = editedOrder.orderProducts ? editedOrder.orderProducts.map((e) => {
                delete e.edit;
                return {
                    ...e,
                    value: Number(String(e.value).replace(',', '.'))
                };
            }) : [];
            const formatedOrder = {
                ...editedOrder,
                orderProducts: formatedOrderProducts,
            };
            const { data, total, success, message, ...rest } = await http_1.default.post('/api/auth/orders', formatedOrder);
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
        if (order)
            setEditedOrder({ ...order, orderProducts: order.orderProducts ? [...order.orderProducts] : [] });
        if (!isOpen) {
            setEditedOrder(orderType_1.EMPTY_ORDER);
            setEditedOrderProducts(orderProductsType_1.EMPTY_ORDER_PRODUCTS);
        }
    }, [isOpen]);
    (0, react_1.useEffect)(() => {
        getProducts();
    }, []);
    return ((0, jsx_runtime_1.jsx)("section", { className: `bg-background-1 dark:bg-background-1-dark flex w-full h-full ${isOpen ? 'flex' : 'hidden'}`, children: (0, jsx_runtime_1.jsx)("div", { className: 'py-12 gap-1 w-full h-full flex flex-col items-center relative', children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-12 w-full max-w-[45rem] pb-10", children: [(0, jsx_runtime_1.jsxs)("section", { onClick: () => console.log(order, editedOrder), className: 'flex flex-col', children: [(0, jsx_runtime_1.jsx)(Texts_1.Paragraph, { children: "Cliente" }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'text-color-3 dark:text-color-3-dark', children: "Informe os dados do cliente" })] }), (0, jsx_runtime_1.jsxs)("section", { className: 'grid grid-cols-4 gap-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'col-span-4 max-w-[20rem]', children: [(0, jsx_runtime_1.jsxs)(Texts_1.Description, { className: 'mb-1 text-color-2 dark:text-color-2-dark', children: ["Nome", (0, jsx_runtime_1.jsx)("span", { className: 'ml-1 text-red-500', children: "*" })] }), (0, jsx_runtime_1.jsx)(Input_1.default, { type: 'text', onChange: (e) => setEditedOrder(prev => ({ ...prev, client: { ...prev.client, name: e.target.value } })), value: editedOrder?.client?.name })] }), (0, jsx_runtime_1.jsxs)("div", { className: `col-span-4 max-w-[25rem] ${!clientInfo ? 'hidden' : ''}`, children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1 text-color-2 dark:text-color-2-dark', children: "Email" }), (0, jsx_runtime_1.jsx)(Input_1.default, { type: 'email', onChange: (e) => setEditedOrder((prev) => ({ ...prev, client: { ...prev.client, email: e.target.value } })), value: editedOrder?.client?.email })] }), (0, jsx_runtime_1.jsxs)("div", { className: `col-span-2 ${!clientInfo ? 'hidden' : ''}`, children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1 text-color-2 dark:text-color-2-dark', children: "Documento" }), (0, jsx_runtime_1.jsx)(Input_1.default, { maxLength: 18, type: 'text', onChange: (e) => setEditedOrder((prev) => ({ ...prev, client: { ...prev.client, document: format_1.default.brDocument(e.target.value) } })), value: editedOrder?.client?.document })] }), (0, jsx_runtime_1.jsxs)("div", { className: `col-span-2 ${!clientInfo ? 'hidden' : ''}`, children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1 text-color-2 dark:text-color-2-dark', children: "N\u00FAmero" }), (0, jsx_runtime_1.jsx)(Input_1.default, { maxLength: 15, type: 'text', onChange: (e) => setEditedOrder((prev) => ({ ...prev, client: { ...prev.client, number: format_1.default.phone(e.target.value) } })), value: editedOrder?.client?.number })] }), (0, jsx_runtime_1.jsxs)("div", { className: `col-span-4 max-w-[25rem] ${!clientInfo ? 'hidden' : ''}`, children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1 text-color-2 dark:text-color-2-dark', children: "Endere\u00E7o" }), (0, jsx_runtime_1.jsx)(Input_1.default, { type: 'email', onChange: (e) => setEditedOrder((prev) => ({ ...prev, client: { ...prev.client, info: e.target.value } })), value: editedOrder?.client?.info })] }), (0, jsx_runtime_1.jsx)("div", { className: `col-span-4`, children: (0, jsx_runtime_1.jsx)(Button_1.default, { onClick: () => setClientInfo(!clientInfo), className: 'border-none w-full bg-transparent flex justify-center', children: (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'text-color-2 dark:text-color-2-dark', children: !clientInfo ? 'Mais informações' : 'Menos informações' }) }) })] }), (0, jsx_runtime_1.jsx)(Hr_1.default, {}), (0, jsx_runtime_1.jsxs)("section", { className: 'flex flex-col', children: [(0, jsx_runtime_1.jsx)(Texts_1.Paragraph, { children: "Ve\u00EDculo" }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'text-color-3 dark:text-color-3-dark', children: "Use essa se\u00E7\u00E3o para identificar o ve\u00EDculo." })] }), (0, jsx_runtime_1.jsxs)("section", { className: 'grid grid-cols-4 gap-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'col-span-4 max-w-[16rem]', children: [(0, jsx_runtime_1.jsxs)(Texts_1.Description, { className: 'mb-1', children: ["Modelo", (0, jsx_runtime_1.jsx)("span", { className: 'ml-1 text-red-500', children: "*" })] }), (0, jsx_runtime_1.jsx)(Input_1.default, { onChange: (e) => setEditedOrder((prev) => ({ ...prev, model: e.target.value })), value: editedOrder?.model })] }), (0, jsx_runtime_1.jsxs)("div", { className: `col-span-4 ${!vehicleInfo ? 'hidden' : ''}`, children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1', children: "Placa" }), (0, jsx_runtime_1.jsx)(Input_1.default, { onChange: (e) => setEditedOrder((prev) => ({ ...prev, plateNumber: e.target.value })), value: editedOrder?.plateNumber })] }), (0, jsx_runtime_1.jsxs)("div", { className: `col-span-4 max-w-[7rem] ${!vehicleInfo ? 'hidden' : ''}`, children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1', children: "Ano" }), (0, jsx_runtime_1.jsx)(Input_1.default, { type: "number", onChange: (e) => setEditedOrder((prev) => ({ ...prev, year: e.target.value })), value: editedOrder?.year })] }), (0, jsx_runtime_1.jsxs)("div", { className: `col-span-4  ${!vehicleInfo ? 'hidden' : ''}`, children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1', children: "Observa\u00E7\u00E3o do cliente" }), (0, jsx_runtime_1.jsx)(Textarea_1.default, { type: "text", className: '', onChange: (e) => setEditedOrder((prev) => ({ ...prev, clientObservation: e.target.value })), value: editedOrder?.clientObservation || '' })] }), (0, jsx_runtime_1.jsx)("div", { className: `col-span-4`, children: (0, jsx_runtime_1.jsx)(Button_1.default, { onClick: () => setVehicleInfo(!vehicleInfo), className: 'border-none w-full bg-transparent flex justify-center', children: (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'text-color-2 dark:text-color-2-dark', children: !vehicleInfo ? 'Mais informações' : 'Menos informações' }) }) })] }), (0, jsx_runtime_1.jsx)(Hr_1.default, {}), (0, jsx_runtime_1.jsxs)("section", { className: 'flex flex-col', children: [(0, jsx_runtime_1.jsx)(Texts_1.Paragraph, { children: "Servi\u00E7os" }), (0, jsx_runtime_1.jsxs)(Texts_1.Description, { className: 'text-color-3 dark:text-color-3-dark', onClick: () => console.log('order: ', order), children: ["Preencha os servi\u00E7os e informa\u00E7\u00F5es que ir\u00E3o ser realizados no ve\u00EDculo. ", order?.orderProducts?.length] })] }), (0, jsx_runtime_1.jsx)("section", { className: 'grid grid-cols-4 gap-6', children: (0, jsx_runtime_1.jsxs)("div", { className: 'col-span-4', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1', children: "Produtos / servi\u00E7os" }), (0, jsx_runtime_1.jsx)(Table_1.Table, { className: 'w-full', children: (0, jsx_runtime_1.jsx)(Table_1.Tbody, { className: 'w-full h-fit', children: editedOrder?.orderProducts?.length ? editedOrder.orderProducts.map((item, i) => ((0, jsx_runtime_1.jsxs)(Table_1.Tr, { className: `list`, children: [(0, jsx_runtime_1.jsxs)(Table_1.Td, { onClick: () => editProduct({ ...item, edit: true }, i), className: `text-start font-semibold p-5 gap-3 grid grid-cols-10 ${item.edit && 'hidden'}`, children: [(0, jsx_runtime_1.jsxs)("section", { className: "col-span-4", children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'truncate', children: productArray && productArray.length && productArray.map(e => e.id == item.productId ? e.name : '') }), (0, jsx_runtime_1.jsx)(Texts_1.Label, { className: 'text-color-3 dark:text-color-3-dark', children: productArray && productArray.length && productArray.map(e => e.id == item.productId ? e.type : '') })] }), (0, jsx_runtime_1.jsxs)("section", { className: "col-span-4 flex flex-col", children: [(0, jsx_runtime_1.jsx)(Status_1.default, { value: item.status }), (0, jsx_runtime_1.jsx)(Texts_1.Label, { className: 'mt-1 text-color-3 dark:text-color-3-dark', title: format_1.default.date(item.updatedAt), children: format_1.default.stringDate(item.updatedAt) })] }), (0, jsx_runtime_1.jsxs)("section", { className: "col-span-2", children: [(0, jsx_runtime_1.jsxs)(Texts_1.Description, { className: 'truncate', children: ["R$ ", format_1.default.money(item.value)] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex gap-1 items-center', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.Close, { className: `fill-red-500 w-3 h-3 mt-1 ${item.warranty && 'hidden'}` }), (0, jsx_runtime_1.jsx)(Svg_1.default.Check, { className: `fill-blue-500 w-3 h-3 mt-1 ${!item.warranty && 'hidden'}` }), (0, jsx_runtime_1.jsx)(Texts_1.Label, { className: 'mt-1 text-color-3 dark:text-color-3-dark truncate', title: format_1.default.date(item.updatedAt), children: item.warranty ? 'com garantia' : 'sem garantia' })] })] })] }), (0, jsx_runtime_1.jsxs)(Table_1.Td, { className: `text-start font-semibold p-5 gap-6 grid grid-cols-2 ${!item.edit && 'hidden'}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: 'col-span-1', children: [(0, jsx_runtime_1.jsxs)(Texts_1.Description, { className: 'mb-1', children: ["Servi\u00E7o / produto", (0, jsx_runtime_1.jsx)("span", { className: 'ml-1 text-red-500', children: "*" })] }), (0, jsx_runtime_1.jsx)(Select_1.default, { className: 'w-full', data: productArray, value: productArray?.map(e => e.id == editedOrderProducts.productId ? e.name : ''), renderItem: (e, j) => (0, jsx_runtime_1.jsx)("div", { onClick: () => setEditedOrderProducts(prev => ({ ...prev, productId: e.id })), children: e.name }, i) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'col-span-2 flex flex-col', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mb-1', children: "Status" }), (0, jsx_runtime_1.jsxs)("div", { className: 'mb-4 flex items-center gap-3', children: [(0, jsx_runtime_1.jsx)(Checkbox_1.default, { onChange: (e) => setEditedOrderProducts(prev => ({ ...prev, status: 'aguardando peça' })), value: editedOrderProducts.status == 'aguardando peça' }), (0, jsx_runtime_1.jsx)(Status_1.default, { value: 'aguardando peça' })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'mb-4 flex items-center gap-3', children: [(0, jsx_runtime_1.jsx)(Checkbox_1.default, { onChange: (e) => setEditedOrderProducts(prev => ({ ...prev, status: 'em andamento' })), value: editedOrderProducts.status == 'em andamento' }), (0, jsx_runtime_1.jsx)(Status_1.default, { value: 'em andamento' })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'mb-4 flex items-center gap-3', children: [(0, jsx_runtime_1.jsx)(Checkbox_1.default, { onChange: (e) => setEditedOrderProducts(prev => ({ ...prev, status: 'sem solução' })), value: editedOrderProducts.status == 'sem solução' }), (0, jsx_runtime_1.jsx)(Status_1.default, { value: 'sem solução' })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center gap-3', children: [(0, jsx_runtime_1.jsx)(Checkbox_1.default, { onChange: (e) => setEditedOrderProducts(prev => ({ ...prev, status: 'finalizado' })), value: editedOrderProducts.status == 'finalizado' }), (0, jsx_runtime_1.jsx)(Status_1.default, { value: 'finalizado' })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'col-span-2 max-w-32', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mt-3 mb-1', children: "Valor" }), (0, jsx_runtime_1.jsx)(Input_1.default, { type: "text", className: '', onChange: (e) => setEditedOrderProducts(prev => ({ ...prev, value: format_1.default.money(e.target.value) })), value: editedOrderProducts.value })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'col-span-2 flex flex-col gap-2', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { children: "Garantia" }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center gap-2', children: [(0, jsx_runtime_1.jsx)(Switch_1.default, { onChange: (e) => setEditedOrderProducts(prev => ({ ...prev, warranty: !editedOrderProducts.warranty })), value: editedOrderProducts.warranty }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'text-color-3 dark:text-color-3-dark truncate', children: "do produto / servi\u00E7o" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'col-span-2', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'mt-3 mb-1', children: "Observa\u00E7\u00E3o" }), (0, jsx_runtime_1.jsx)(Textarea_1.default, { type: "text", className: '', onChange: (e) => setEditedOrderProducts(prev => ({ ...prev, description: e.target.value })), value: editedOrderProducts.description })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'col-span-2 flex gap-3', children: [(0, jsx_runtime_1.jsx)(Button_1.default, { onClick: () => removeProduct(i), className: 'text-color-2 dark:text-color-2-dark', children: "Remover" }), (0, jsx_runtime_1.jsx)(Button_1.default, { onClick: () => editedOrderProducts.productId !== -1 ? editProduct({ ...item, edit: false }, i) : removeProduct(i), className: `ml-auto text-color-2 dark:text-color-2-dark `, children: "Cancelar" }), (0, jsx_runtime_1.jsx)(Button_1.default, { onClick: () => editedOrderProducts.productId !== -1 ? saveEditProduct(i) : notification({ type: 'warning', title: 'Atenção', description: 'Serviço / produto precisa ser preenchido!' }), className: 'flex justify-center bg-primary text-background-2 dark:text-background-2-dark min-w-[82px]', children: "Salvar" })] })] })] }, `id-${i}`))) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) }) }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { onClick: () => addProduct(), className: 'button mt-2 w-full text-center', children: "Novo produto / servi\u00E7o" })] }) }), (0, jsx_runtime_1.jsx)(Hr_1.default, {}), (0, jsx_runtime_1.jsxs)("section", { className: 'flex flex-col', children: [(0, jsx_runtime_1.jsx)(Texts_1.Paragraph, { children: "Atendimento" }), (0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'text-color-3 dark:text-color-3-dark', children: "Finalize o atendimento e calcule o pre\u00E7o total" })] }), (0, jsx_runtime_1.jsxs)("section", { className: 'grid grid-cols-4', children: [(0, jsx_runtime_1.jsxs)("div", { onClick: () => setEditedOrder(prev => ({ ...prev, status: 'em andamento' })), className: `button col-span-4 p-4 gap-3 flex border rounded-t-xl ${editedOrder.status == 'em andamento' ? 'border-yellow-500' : 'dark:border-dark'}`, children: [(0, jsx_runtime_1.jsx)(Checkbox_1.default, { className: `${editedOrder.status == 'em andamento' ? 'fill-yellow-500' : ''}`, value: editedOrder.status == 'em andamento' }), (0, jsx_runtime_1.jsxs)("section", { className: 'flex flex-col gap-1', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'truncate', children: "Em andamento" }), (0, jsx_runtime_1.jsx)(Texts_1.Label, { className: 'text-color-3 dark:text-color-3-dark', children: "O atendimento atualmente est\u00E1 sendo feito" })] })] }), (0, jsx_runtime_1.jsxs)("div", { onClick: () => setEditedOrder(prev => ({ ...prev, status: 'sem solucao' })), className: `button col-span-4 p-4 gap-3 flex border ${editedOrder.status == 'sem solucao' ? 'border-red-500' : 'dark:border-dark'}`, children: [(0, jsx_runtime_1.jsx)(Checkbox_1.default, { className: `${editedOrder.status == 'sem solucao' ? 'fill-red-500' : ''}`, value: editedOrder.status == 'sem solucao' }), (0, jsx_runtime_1.jsxs)("section", { className: 'flex flex-col gap-1', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'truncate', children: "Sem solu\u00E7\u00E3o" }), (0, jsx_runtime_1.jsx)(Texts_1.Label, { className: 'text-color-3 dark:text-color-3-dark', children: "O atendimento atualmente est\u00E1 sendo feito" })] })] }), (0, jsx_runtime_1.jsxs)("div", { onClick: () => setEditedOrder(prev => ({ ...prev, status: 'finalizado' })), className: `button col-span-4 p-4 gap-3 flex border rounded-b-xl ${editedOrder.status == 'finalizado' ? 'border-green-500' : 'dark:border-dark'}`, children: [(0, jsx_runtime_1.jsx)(Checkbox_1.default, { className: `${editedOrder.status == 'finalizado' ? 'fill-green-500' : ''}`, value: editedOrder.status == 'finalizado' }), (0, jsx_runtime_1.jsxs)("section", { className: 'flex flex-col gap-1 w-full', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'truncate', children: "Finalizado" }), (0, jsx_runtime_1.jsx)(Texts_1.Label, { className: `text-color-3 dark:text-color-3-dark ${editedOrder.status == 'finalizado' && 'hidden'}`, children: "O atendimento atualmente est\u00E1 sendo feito" }), (0, jsx_runtime_1.jsxs)("div", { className: `w-full flex flex-col overflow-hidden duration-300 ${editedOrder.status == 'finalizado' ? 'h-[5rem]' : 'h-0'}`, children: [(0, jsx_runtime_1.jsxs)("section", { className: 'flex justify-between opacity-50', children: [(0, jsx_runtime_1.jsx)(Texts_1.Description, { className: 'truncate', children: "Subtotal:" }), (0, jsx_runtime_1.jsxs)(Texts_1.Paragraph, { className: 'truncate', children: ["R$ ", editedOrder.orderProducts?.length && format_1.default.money(editedOrder?.orderProducts.reduce((a, b) => a + b.value, 0))] })] }), (0, jsx_runtime_1.jsxs)("section", { className: 'mt-auto flex justify-between', children: [(0, jsx_runtime_1.jsx)(Texts_1.Paragraph, { className: 'truncate', children: "Total:" }), (0, jsx_runtime_1.jsxs)(Texts_1.Subtitle, { className: 'truncate', children: ["R$ ", format_1.default.money(totalCalc())] })] })] })] })] })] }), (0, jsx_runtime_1.jsx)(Hr_1.default, {}), (0, jsx_runtime_1.jsxs)("section", { className: 'flex gap-4', children: [(0, jsx_runtime_1.jsxs)(Button_1.default, { onClick: remove, className: `justify-center text-color-2 dark:text-color-2-dark min-w-[82px] ${editedOrder.id && editedOrder.id != -1 ? 'flex' : 'hidden'}`, children: [(0, jsx_runtime_1.jsx)(Svg_1.default.Spinner, { className: `w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4] ${!removeLoading && 'hidden'}` }), !removeLoading ? 'Excluir' : ''] }), (0, jsx_runtime_1.jsx)(Button_1.default, { onClick: () => onClose(), className: 'ml-auto text-color-2 dark:text-color-2-dark', children: "Cancelar" }), (0, jsx_runtime_1.jsxs)(Button_1.default, { onClick: save, className: 'flex justify-center bg-primary text-background-2 dark:text-background-2-dark min-w-[82px]', children: [(0, jsx_runtime_1.jsx)(Svg_1.default.Spinner, { className: `w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4] ${!saveLoading && 'hidden'}` }), !saveLoading ? 'Salvar' : ''] })] })] }) }) }));
}
exports.default = (0, react_1.memo)(OrderModal);
