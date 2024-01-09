import { RefObject } from 'react';
import { Point, Size, SlideElement } from './figureTypes';
import { BackgroundType, Id, Slide } from './types';

function generateRandomId() {
    return 'id' + Math.random().toString(16).slice(2);
}

const getNumfromPxString = (str: string): number => {
    let num = 0;
    num = Number(str.slice(0, str.length - 2));
    return num;
};

const checkElemsCollision = (
    bigElem: { x: number; y: number; width: number; height: number },
    smElem: {
        x: number;
        y: number;
        width: number;
        height: number;
    },
) => {
    return !(
        smElem.x + smElem.width < bigElem.x ||
        smElem.x > bigElem.width + bigElem.x ||
        smElem.y > bigElem.y + bigElem.height ||
        smElem.y + smElem.height < bigElem.y
    );
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

const getSlideById = (slides: Slide[], slideId: Id): Slide => {
    for (const slide of slides) {
        if (slide.id === slideId) {
            return slide;
        }
    }
    if (slides[0]) return slides[0];
    else
        return {
            id: '0',
            elements: [],
            selectedElements: [],
            elementsAnimations: [],
            background: { type: BackgroundType.Color, data: { color: '' } },
        };
};

const changeStyleTop = (
    elemRef: RefObject<HTMLDivElement>,
    elemPosY: number,
    eventY: number,
    startMouseY: number,
) => {
    elemRef.current!.style.top = elemPosY + eventY - startMouseY + 'px';
};

const changeStyleLeft = (
    elemRef: RefObject<HTMLDivElement>,
    elemPosX: number,
    eventX: number,
    startMouseX: number,
) => {
    elemRef.current!.style.left = elemPosX + eventX - startMouseX + 'px';
};

const changeStyleWidth = (
    elemRef: RefObject<HTMLDivElement>,
    elemWidth: number,
    eventX: number,
    startMouseX: number,
) => {
    elemRef.current!.style.width = elemWidth - eventX + startMouseX + 'px';
};
const changeStyleHeight = (
    elemRef: RefObject<HTMLDivElement>,
    elemHeight: number,
    eventY: number,
    startMouseY: number,
) => {
    elemRef.current!.style.height = elemHeight - eventY + startMouseY + 'px';
};

const changeStylePosition = (
    elemRef: RefObject<HTMLDivElement>,
    elemPos: Point,
    eventPos: Point,
    startMousePos: Point,
) => {
    changeStyleTop(elemRef, elemPos.y, eventPos.y, startMousePos.y);
    changeStyleLeft(elemRef, elemPos.x, eventPos.x, startMousePos.x);
};

const changeStyleSize = (
    elemRef: RefObject<HTMLDivElement>,
    elemSize: Size,
    eventPos: Point,
    startMousePos: Point,
) => {
    changeStyleHeight(elemRef, elemSize.height, eventPos.y, startMousePos.y);
    changeStyleWidth(elemRef, elemSize.width, eventPos.x, startMousePos.x);
};

export {
    generateRandomId,
    getNumfromPxString,
    getSlideIndexById,
    getElementsById,
    changeStyleWidth,
    changeStyleHeight,
    changeStyleTop,
    changeStyleLeft,
    changeStylePosition,
    changeStyleSize,
    getSlideById,
    checkElemsCollision,
};
