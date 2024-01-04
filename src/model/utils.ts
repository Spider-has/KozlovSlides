import { SlideElement } from './figureTypes';
import { Id, Slide } from './types';

function generateRandomId() {
    return 'id' + Math.random().toString(16).slice(2);
}

const getNumfromPxString = (str: string): number => {
    let num = 0;
    num = Number(str.slice(0, str.length - 2));
    return num;
};

const getSlideIndexById = (slides: Slide[], id: Id[]): number[] => {
    const indexs: Array<number> = [];
    slides.forEach((el, i) => {
        if (id.includes(el.id)) {
            indexs.push(i);
        }
    });
    return indexs;
};

const getElementsById = (elements: SlideElement[], id: Id[]): number[] => {
    const indexs: Array<number> = [];
    elements.forEach((el, i) => {
        if (id.includes(el.id)) {
            indexs.push(i);
        }
    });
    return indexs;
};

export {
    generateRandomId,
    getNumfromPxString,
    getSlideIndexById,
    getElementsById,
};
