import { Color, FigureObjects, FontFamily, ObjectType, SlideElement } from '../../model/figureTypes';
import { Editor, SelectModeTypes, UserActions } from '../../model/types';
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
                                                          newTextParams.deltaTextSize >
                                                      0
                                                        ? element.properties.chars.fontSize +
                                                          newTextParams.deltaTextSize
                                                        : element.properties.chars.fontSize
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

const getStateWithCreatedElement = (state: Editor, newElement: SlideElement) => {
    const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
    const newState = {
        ...state,
        presentation: {
            ...state.presentation,
            userAction: {
                ActionType: UserActions.SLIDE_EDIT,
                AddedElementType: null,
                AddedFigureType: null,
                Url: '',
            },
            slides: state.presentation.slides.map((slide, i) => {
                if (i === selectedSlidesIndex[0]) {
                    return {
                        ...slide,
                        elements: [...slide.elements, newElement],
                        selectedElements: [newElement.id],
                    };
                }
                return slide;
            }),
        },
        selectMode: SelectModeTypes.Elements,
    };
    return newState;
};

type userAction = {
    elementType: ObjectType;
    figureType?: FigureObjects | undefined;
    url?: string | undefined;
};

const getStateWithAddElementAction = (state: Editor, userAction: userAction) => {
    const newState = {
        ...state,
        presentation: {
            ...state.presentation,
            userAction: {
                ActionType: UserActions.ADD_ELEMENT,
                AddedElementType: userAction.elementType,
                AddedFigureType: userAction.figureType ? userAction.figureType : null,
                Url: userAction.url ? userAction.url : '',
            },
        },
        selectMode: SelectModeTypes.Elements,
    };
    return newState;
};

const getStateWithNewSelectedElemsColor = (state: Editor, newColor: string) => {
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
                                if (element.elementType == ObjectType.Graphic) {
                                    if (element.figureType == FigureObjects.Rectangle)
                                        return {
                                            ...element,
                                            properties: {
                                                ...element.properties,
                                                color: newColor,
                                            },
                                        };
                                    if (element.figureType == FigureObjects.Triangle)
                                        return {
                                            ...element,
                                            properties: {
                                                ...element.properties,
                                                color: newColor,
                                            },
                                        };
                                    if (element.figureType == FigureObjects.Ellipse)
                                        return {
                                            ...element,
                                            properties: {
                                                ...element.properties,
                                                color: newColor,
                                            },
                                        };
                                }
                                if (element.elementType == ObjectType.Text) {
                                    return {
                                        ...element,
                                        properties: {
                                            ...element.properties,
                                            chars: { ...element.properties.chars, color: newColor },
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
    getStateWithCreatedElement,
    getStateWithAddElementAction,
    getStateWithNewSelectedElemsColor,
};
