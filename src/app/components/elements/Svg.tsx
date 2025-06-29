// import React, { useEffect, useState, useRef  } from 'react';

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








import React, { useEffect, useState } from 'react';

interface Props {
  name: string;
  className?: string;
}

function Svg({ name, className }: Props) {
  const [svgElement, setSvgElement] = useState<any | null>(null);

  useEffect(() => {
    async function loadSvg() {
      try {
        const res = await fetch(`/icons/${name}.svg`);
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'image/svg+xml');
        const svg = doc.querySelector('svg') as any;

        if (svg) {
          // Copia atributos do SVG
          const props: Record<string, any> = {};
          for (const attr of svg.attributes) {
            props[attr.name] = attr.value;
          }

          if (className) {
            props.className = className; // sobrescreve ou adiciona
          }

          // Pega conteúdo interno (paths, etc.)
          const children = Array.from(svg.childNodes)
            .filter((node: any) => node.nodeType === Node.ELEMENT_NODE)
            .map((node, i) => {
              const el = node as any;
              const props: any = {};

              for (const attr of el.attributes) {
                props[attr.name] = attr.value;
              }

              return React.createElement(el.tagName, { key: i, ...props });
            });

          setSvgElement(React.createElement('svg', props, ...children));
        }
      } catch (err) {
        console.error('Erro ao carregar SVG', err);
        setSvgElement(null);
      }
    }

    loadSvg();
  }, [name, className]);

  return svgElement;
}

export default Svg;
