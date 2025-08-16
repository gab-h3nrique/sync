"use strict";
// import React, { useEffect, useState, useRef  } from 'react';
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
Object.defineProperty(exports, "__esModule", { value: true });
// import { RawHTML, unwanteddiv } from 'react-dom';
// interface Props {
//   name: string;
//   className?: string;
// }
// function Svg({ name, className}: Props) {
//   const ref = useRef<HTMLSpanElement>(null);
//   const [content, setContent] = useState<HTMLSpanElement>(null);
//   const [svgContent, setSvgContent] = useState<string | null>(null);
//   async function fetchSvg(nameProp: string) {
//     let element: any = await fetch(`/icons/${nameProp}.svg`)
//     element = await element.text();
//     setSvgContent(element);
//   }
//   useEffect(() => {
//     fetchSvg(name);
//   }, [name, className]);
//   return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: svgContent }}/>;
// }
// export default Svg
// import React, { useEffect, useState, useRef  } from 'react';
// interface Props {
//   name: string;
//   className?: string;
// }
// function Svg({ name, className}: Props) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [svgContent, setSvgContent] = useState<string | null>(null);
//   async function fetchSvg(nameProp: string) {
//     let element: any = await fetch(`/icons/${nameProp}.svg`)
//     element = await element.text();
//     setSvgContent(element);
//   }
//   function loadSvg() {
//     if(!ref.current || !svgContent) return;
//     ref.current.innerHTML = '';
//     const temp = document.createElement('div');
//     temp.innerHTML = svgContent.trim();
//     const svgElement = temp.querySelector('svg');
//     if(!svgElement) return;
//     if(className) svgElement.setAttribute('class', className);
//     ref.current.replaceWith(svgElement);
//   }
//   useEffect(() => {
//     fetchSvg(name);
//   }, [name]);
//   useEffect(() => loadSvg(), [svgContent, className]);
//   return <div ref={ref} />;
// }
// export default Svg
const react_1 = __importStar(require("react"));
function Svg({ name, className }) {
    const [svgElement, setSvgElement] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        async function loadSvg() {
            try {
                const res = await fetch(`assets/${name}.svg`);
                const text = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'image/svg+xml');
                const svg = doc.querySelector('svg');
                if (svg) {
                    // Copia atributos do SVG
                    const props = {};
                    for (const attr of svg.attributes) {
                        props[attr.name] = attr.value;
                    }
                    if (className) {
                        props.className = className; // sobrescreve ou adiciona
                    }
                    // Pega conteúdo interno (paths, etc.)
                    const children = Array.from(svg.childNodes)
                        .filter((node) => node.nodeType === Node.ELEMENT_NODE)
                        .map((node, i) => {
                        const el = node;
                        const props = {};
                        for (const attr of el.attributes) {
                            props[attr.name] = attr.value;
                        }
                        return react_1.default.createElement(el.tagName, { key: i, ...props });
                    });
                    setSvgElement(react_1.default.createElement('svg', props, ...children));
                }
            }
            catch (err) {
                console.error('Erro ao carregar SVG', err);
                setSvgElement(null);
            }
        }
        loadSvg();
    }, [name, className]);
    return svgElement;
}
exports.default = Svg;
