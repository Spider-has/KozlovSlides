import { jsPDF } from 'jspdf';
import { Slide } from './types';
import {
    FunctionGraphObject,
    ImageObject,
    ObjectType,
    RectangleElement,
    SlideElement,
    TextObject,
    TriangleElement,
} from './figureTypes';

const ImageConvertor = (slideElement: ImageObject) => {};

const GraphicConvertor = (slideElement: SlideElement) => {};

const FunctionGraphConvertor = (slideElement: FunctionGraphObject) => {};

const TextConvertor = (slideElement: TextObject) => {};

const slideElementConvert = (slideElement: SlideElement) => {
    switch (slideElement.elementType) {
        case ObjectType.Image: {
            ImageConvertor(slideElement);
            break;
        }
        case ObjectType.Graphic: {
            GraphicConvertor(slideElement);
            break;
        }
        case ObjectType.FunctionGraph: {
            FunctionGraphConvertor(slideElement);
            break;
        }
        case ObjectType.Text: {
            TextConvertor(slideElement);
            break;
        }
    }
};

const slidesConvertor = (doc: jsPDF, slides: Slide[]) => {
    slides.forEach(slide => {
        slide.elements.forEach(elem => {
            slideElementConvert(elem);
        });
    });
};

// const doc = new jsPDF({
//     orientation: 'landscape',
//     unit: 'px',
// });

export { slidesConvertor };
