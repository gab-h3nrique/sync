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
const UserHeader_1 = __importDefault(require("./pages/UserHeader"));
const MenuHeader_1 = __importDefault(require("./pages/MenuHeader"));
function Header() {
    return ((0, jsx_runtime_1.jsxs)("header", { className: 'w-full flex justify-start p-2 border border-x-0 border-t-0 dark:border-dark dark:border-x-0 dark:border-t-0 bg-background-2 dark:bg-background-2-dark', children: [(0, jsx_runtime_1.jsx)(MenuHeader_1.default, { className: '' }), (0, jsx_runtime_1.jsx)(UserHeader_1.default, { className: 'ml-auto' })] }));
}
exports.default = (0, react_1.memo)(Header);
