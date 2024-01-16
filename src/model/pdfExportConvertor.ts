import { jsPDF } from 'jspdf';
import { BackgroundType, Slide } from './types';
import {
    AlignTypes,
    EllipseElement,
    FigureObjects,
    ImageObject,
    ObjectType,
    RectangleElement,
    SlideElement,
    TextObject,
    TriangleElement,
} from './figureTypes';
import { CanvasTextWrapper } from 'canvas-text-wrapper';
import { getElementsArrayOnLayers } from './utils';

// const FuncGraphicConvertor = (slideElement: FunctionGraphObject, doc: jsPDF) => {
//     const svgElem = document.querySelector(`#${slideElement.id}graphic`) as SVGElement;
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     if (svgElem && ctx) {
//         const svgCode = svgElem.innerHTML.replace(/\r?\n|\r/g, '').trim();
//         const code = canvas.toDataURL('image/png');
//         doc.addImage(
//             code,
//             'png',
//             slideElement.position.x,
//             slideElement.position.y,
//             slideElement.size.width,
//             slideElement.size.height,
//         );
//     }
// };

const ImageConvertor = (slideElement: ImageObject, doc: jsPDF) => {
    doc.addImage(
        slideElement.properties.imgUrl,
        'png',
        slideElement.position.x,
        slideElement.position.y,
        slideElement.size.width,
        slideElement.size.height,
    );
};

const RectangleConvertor = (slideElement: RectangleElement, doc: jsPDF) => {
    doc.rect(
        slideElement.position.x,
        slideElement.position.y,
        slideElement.size.width,
        slideElement.size.height,
        'DF',
    );
};

const EllipseConvertor = (slideElement: EllipseElement, doc: jsPDF) => {
    doc.ellipse(
        slideElement.position.x + slideElement.size.width / 2,
        slideElement.position.y + slideElement.size.height / 2,
        slideElement.size.width / 2,
        slideElement.size.height / 2,
        'DF',
    );
};

const TriangleConvertor = (slideElement: TriangleElement, doc: jsPDF) => {
    const xCoef = slideElement.size.width / 100;
    const yCoef = slideElement.size.height / 100;

    doc.triangle(
        slideElement.properties.point1.x * xCoef + slideElement.position.x,
        slideElement.properties.point1.y * yCoef + slideElement.position.y,
        slideElement.properties.point2.x * xCoef + slideElement.position.x,
        slideElement.properties.point2.y * yCoef + slideElement.position.y,
        slideElement.properties.point3.x * xCoef + slideElement.position.x,
        slideElement.properties.point3.y * yCoef + slideElement.position.y,
        'DF',
    );
};

// const FunctionGraphConvertor = (slideElement: FunctionGraphObject, doc: jsPDF) => {};

const TextConvertor = (slideTextElement: TextObject, doc: jsPDF, scaleConst: number) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
        canvas.width = slideTextElement.size.width * scaleConst;
        canvas.height = slideTextElement.size.height * scaleConst;
        ctx.fillStyle = slideTextElement.properties.chars.color
            ? slideTextElement.properties.chars.color
            : 'black';
        const fontStyle = `${slideTextElement.properties.chars.bold ? 'bold' : ''} ${
            slideTextElement.properties.chars.cursive ? 'italic' : ''
        } `;
        console.log(slideTextElement);
        const font = `${fontStyle} ${Math.round(slideTextElement.properties.chars.fontSize * scaleConst)}px ${
            slideTextElement.properties.chars.fontFamily
                ? slideTextElement.properties.chars.fontFamily.fontFamily
                : 'Arial'
        }`;
        ctx.font = font;
        console.log(font);
        const align =
            slideTextElement.properties.chars.align == AlignTypes.BY_WIDTH
                ? 'left'
                : slideTextElement.properties.chars.align;
        CanvasTextWrapper(canvas, slideTextElement.properties.chars.value, {
            font: font,
            textAlign: align,
            strokeText: false,
            textDecoration: slideTextElement.properties.chars.underline ? 'underline' : 'none',
        });
        const elemCode = canvas.toDataURL();
        doc.addImage(
            elemCode,
            'PNG',
            slideTextElement.position.x,
            slideTextElement.position.y,
            slideTextElement.size.width,
            slideTextElement.size.height,
        );
    }
};

const slideElementConvert = async (slideElement: SlideElement, doc: jsPDF, scaleConst: number) => {
    switch (slideElement.elementType) {
        case ObjectType.Image: {
            ImageConvertor(slideElement, doc);
            break;
        }
        case ObjectType.Graphic: {
            let color = slideElement.properties.color ? slideElement.properties.color : '#000000';
            if (color && color[0] == '#') {
                color = color?.slice(0, color.length - 2);
            }
            doc.setFillColor(color);
            doc.setDrawColor(color);
            switch (slideElement.figureType) {
                case FigureObjects.Ellipse: {
                    EllipseConvertor(slideElement, doc);
                    break;
                }
                case FigureObjects.Rectangle: {
                    RectangleConvertor(slideElement, doc);
                    break;
                }
                case FigureObjects.Triangle: {
                    TriangleConvertor(slideElement, doc);
                    break;
                }
            }
            break;
        }
        case ObjectType.FunctionGraph: {
            // FuncGraphicConvertor(slideElement, doc);
            break;
        }
        case ObjectType.Text: {
            TextConvertor(slideElement, doc, scaleConst);
            break;
        }
    }
};

const slidesConvertor = async (
    doc: jsPDF,
    slides: Slide[],
    scaleConst: number,
    slideSize: { width: number; height: number },
) => {
    slides.forEach(async slide => {
        if (slide.background.type == BackgroundType.Color) {
            let color = slide.background.color ? slide.background.color : '#FFFFFFFF';
            if (color && color[0] == '#') {
                color = color?.slice(0, color.length - 2);
            }
            doc.setFillColor(color);
            doc.setDrawColor(color);
            doc.rect(0, 0, slideSize.width, slideSize.height, 'DF');
        } else if (slide.background.type == BackgroundType.Image) {
            doc.addImage(slide.background.url, 'png', 0, 0, slideSize.width, slideSize.height);
        }
        console.log(slide.elements);
        const layersArray = getElementsArrayOnLayers(slide.elements);
        if (layersArray[0])
            layersArray.forEach(async elem => {
                slideElementConvert(elem, doc, scaleConst);
            });
        doc.addPage();
    });
    doc.deletePage(slides.length + 1);
};

export { slidesConvertor };
