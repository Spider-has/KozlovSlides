/* eslint-disable @typescript-eslint/no-explicit-any */
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
            background: { type: BackgroundType.Color, color: '' },
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

const checkPresentationFileType = (jsonObject: any) => {
    if (typeof jsonObject == 'object') {
        if (jsonObject.slides && typeof jsonObject.slides == 'object') {
            if (Array.isArray(jsonObject.slides)) {
                if (jsonObject.slides) {
                    jsonObject.slides.forEach((slide: any) => {
                        if (!(slide.id && typeof slide.id == 'string')) return false;
                        if (!(slide.elements && typeof slide.elements == 'object')) return false;
                        if (!(slide.selectedElements && typeof slide.selectedElements == 'object'))
                            return false;
                        if (!(slide.background && typeof slide.background == 'object')) return false;
                        if (!(slide.elementsAnimations && typeof slide.elementsAnimations == 'object'))
                            return false;
                    });
                }
            } else return false;
        } else return false;
        if (jsonObject.size && typeof jsonObject.size == 'object') {
            if (!(jsonObject.size.width && typeof jsonObject.size.width == 'number')) return false;
            if (!(jsonObject.size.height && typeof jsonObject.size.height == 'number')) return false;
        }
        if (!(jsonObject.name && typeof jsonObject.name == 'string')) return false;
        if (jsonObject.userAction && typeof jsonObject.userAction == 'object') {
            if (!(jsonObject.userAction.ActionType && typeof jsonObject.userAction.ActionType == 'string'))
                return false;
        } else return false;
    }
    return true;
};

const getShiftSelectedSlides = (slides: Slide[], selectedSlides: Id[], newId: Id) => {
    const alreadySelectedSlides = getSlideIndexById(slides, selectedSlides);
    const newSelectedSlide = getSlideIndexById(slides, [newId])[0];
    let minIndex = alreadySelectedSlides[0];
    let maxIndex = 0;
    const newIndexes = [];
    alreadySelectedSlides.forEach(index => {
        if (index > maxIndex) {
            maxIndex = index;
        }
        if (index < minIndex) {
            minIndex = index;
        }
    });
    if (newSelectedSlide > maxIndex) {
        for (let i = maxIndex + 1; i <= newSelectedSlide; i++) {
            newIndexes.push(slides[i].id);
        }
    }
    if (newSelectedSlide < minIndex) {
        for (let i = newSelectedSlide; i < minIndex; i++) {
            newIndexes.push(slides[i].id);
        }
    }
    console.log(minIndex, maxIndex, newSelectedSlide);
    return newIndexes;
};

const getNextHigherElementLayer = (selectedSlide: Slide, selectedElemLayer: number | undefined) => {
    let nextLayer = 100000;
    let nextLayerI = -1;
    if (selectedElemLayer != undefined)
        if (selectedSlide.elements.length > 1)
            selectedSlide.elements.forEach((elem, i) => {
                if (elem.layer > selectedElemLayer) {
                    if (elem.layer < nextLayer) {
                        nextLayerI = i;
                        nextLayer = elem.layer;
                    }
                }
            });
        else {
            nextLayer = 0;
            nextLayerI = 0;
        }
    if (nextLayer == 100000 && selectedElemLayer != undefined) {
        nextLayer = selectedElemLayer;
    }
    console.log({
        nextLayer: nextLayer,
        nextLayerIndex: nextLayerI,
    });
    return {
        nextLayer: nextLayer,
        nextLayerIndex: nextLayerI,
    };
};
const getNextLowerElementLayer = (selectedSlide: Slide, selectedElemLayer: number | undefined) => {
    let nextLayer = -1;
    let nextLayerI = -1;
    if (selectedElemLayer != undefined)
        if (selectedSlide.elements.length > 1)
            selectedSlide.elements.forEach((elem, i) => {
                if (elem.layer < selectedElemLayer) {
                    if (elem.layer > nextLayer) {
                        nextLayerI = i;
                        nextLayer = elem.layer;
                    }
                }
            });
        else {
            nextLayer = 0;
            nextLayerI = 0;
        }
    if (nextLayer == -1 && selectedElemLayer != undefined) {
        nextLayer = selectedElemLayer;
    }
    console.log({
        nextLayer: nextLayer,
        nextLayerIndex: nextLayerI,
    });
    return {
        nextLayer: nextLayer,
        nextLayerIndex: nextLayerI,
    };
};
export function doMath(func: string, ldip: number, rdip: number): Array<{ x: number, y: number }> {  
    func = func.replaceAll(')(', ')*(');  
    for (let i = ldip; i <= rdip; i++) {  
        func = func.replaceAll(i + 'x', i + '*x');  
        func = func.replaceAll(i + '(', i + '*(');  
    }  
    func = func.replaceAll('x(', 'x*(');  
    func = func.replaceAll(')x', ')*x');  
    let ans: Array<{ x: number, y: number }> = [];  
    for (let x = ldip; x <= rdip; x += 0.1) {  
        ans.push(  
            {  
                x: x,  
                y: Number(eval(func.replaceAll('x', String(x)))),  
            }  
        );  
    } 
    return ans  
}
const getElementsArrayOnLayers = (SlideElements: SlideElement[]) => {
    const layersArray: SlideElement[] = [];
    let nextMinLayer = 10000;
    let lastMinLayer = 10000;
    let minLayerI = 0;
    let nextMinLayerI = 0;
    let prevIndex = 0;
    for (let i = 0; i < SlideElements.length; i++) {
        if (SlideElements[i].layer <= lastMinLayer) {
            lastMinLayer = SlideElements[i].layer;
            minLayerI = i;
        }
    }
    prevIndex = minLayerI;
    layersArray.push(SlideElements[minLayerI]);
    for (let i = 0; i < SlideElements.length; i++) {
        for (let j = 0; j < SlideElements.length; j++) {
            if (SlideElements[j].layer > lastMinLayer) {
                if (SlideElements[j].layer < nextMinLayer) {
                    nextMinLayer = SlideElements[j].layer;
                    nextMinLayerI = j;
                }
            }
        }
        console.log(prevIndex, nextMinLayer);
        if (nextMinLayerI != prevIndex) layersArray.push(SlideElements[nextMinLayerI]);
        lastMinLayer = nextMinLayer;
        prevIndex = nextMinLayerI;
        nextMinLayer = 10000;
    }
    console.log(layersArray);
    return layersArray;
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
    checkPresentationFileType,
    checkElemsCollision,
    getShiftSelectedSlides,
    getNextHigherElementLayer,
    getNextLowerElementLayer,
    getElementsArrayOnLayers,
};
