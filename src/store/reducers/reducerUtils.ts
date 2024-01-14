import { Color, FontFamily, ObjectType } from '../../model/figureTypes';
import { Editor, SelectModeTypes } from '../../model/types';
import { getElementsById, getSlideIndexById } from '../../model/utils';

const getStateWithNewSelectedElemsPosition = (state: Editor, offsetX: number, offsetY: number) => {
    const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
    const selectedElements = getElementsById(
        state.presentation.slides[selectedSlidesIndex[0]].elements,
        state.presentation.slides[selectedSlidesIndex[0]].selectedElements,
    );
    const newState = {
        ...state,
        presentation: {
            ...state.presentation,
            slides: state.presentation.slides.map((slide, i) => {
                if (i === selectedSlidesIndex[0]) {
                    return {
                        ...slide,
                        elements: slide.elements.map((element, j) => {
                            if (selectedElements.includes(j)) {
                                const oldx = element.position.x;
                                const oldy = element.position.y;
                                return {
                                    ...element,
                                    position: {
                                        x: oldx + offsetX,
                                        y: oldy + offsetY,
                                    },
                                };
                            }
                            return element;
                        }),
                    };
                }
                return slide;
            }),
        },
        selectMode: SelectModeTypes.Elements,
    };
    return newState;
};

const getStateWithNewSelectedElemsSize = (state: Editor, offsetX: number, offsetY: number) => {
    const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
    const selectedElements = getElementsById(
        state.presentation.slides[selectedSlidesIndex[0]].elements,
        state.presentation.slides[selectedSlidesIndex[0]].selectedElements,
    );
    const newState = {
        ...state,
        presentation: {
            ...state.presentation,
            slides: state.presentation.slides.map((slide, i) => {
                if (i === selectedSlidesIndex[0]) {
                    return {
                        ...slide,
                        elements: slide.elements.map((element, j) => {
                            if (selectedElements.includes(j)) {
                                const oldWidht = element.size.width;
                                const oldHeight = element.size.height;
                                return {
                                    ...element,
                                    size: {
                                        width: oldWidht + offsetX > 0 ? oldWidht + offsetX : 0,
                                        height: oldHeight + offsetY > 0 ? oldHeight + offsetY : 0,
                                    },
                                };
                            }
                            return element;
                        }),
                    };
                }
                return slide;
            }),
        },
        selectMode: SelectModeTypes.Elements,
    };
    return newState;
};

type NewTextParams = {
    value?: string;
    fontFamily?: FontFamily;
    fontSize?: number;
    color?: Color;
    bold?: boolean;
    cursive?: boolean;
    underline?: boolean;
    deltaTextSize?: number;
};

const getStateWithNewSelectedElemsTextParams = (state: Editor, newTextParams: NewTextParams) => {
    const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
    const selectedElements = getElementsById(
        state.presentation.slides[selectedSlidesIndex[0]].elements,
        state.presentation.slides[selectedSlidesIndex[0]].selectedElements,
    );
    const newState = {
        ...state,
        presentation: {
            ...state.presentation,
            slides: state.presentation.slides.map((slide, i) => {
                if (i === selectedSlidesIndex[0]) {
                    return {
                        ...slide,
                        elements: slide.elements.map((element, j) => {
                            if (selectedElements.includes(j)) {
                                if (element.elementType === ObjectType.Text) {
                                    return {
                                        ...element,
                                        properties: {
                                            ...element.properties,
                                            chars: {
                                                ...element.properties.chars,
                                                ...newTextParams,
                                                bold: newTextParams.bold
                                                    ? !element.properties.chars.bold
                                                    : element.properties.chars.bold,
                                                underline: newTextParams.underline
                                                    ? !element.properties.chars.underline
                                                    : element.properties.chars.underline,
                                                cursive: newTextParams.cursive
                                                    ? !element.properties.chars.cursive
                                                    : element.properties.chars.cursive,
                                                fontSize: newTextParams.deltaTextSize
                                                    ? element.properties.chars.fontSize +
                                                      newTextParams.deltaTextSize
                                                    : newTextParams.fontSize
                                                    ? newTextParams.fontSize
                                                    : element.properties.chars.fontSize,
                                            },
                                        },
                                    };
                                }
                                return element;
                            }
                            return element;
                        }),
                    };
                }
                return slide;
            }),
        },
        selectMode: SelectModeTypes.Elements,
    };
    return newState;
};

export {
    getStateWithNewSelectedElemsPosition,
    getStateWithNewSelectedElemsSize,
    getStateWithNewSelectedElemsTextParams,
};
