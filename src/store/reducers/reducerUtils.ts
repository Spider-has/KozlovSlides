import {
    AlignTypes,
    Color,
    FigureObjects,
    FontFamily,
    ObjectType,
    SlideElement,
} from '../../model/figureTypes';
import { Editor, SelectModeTypes, UserActions } from '../../model/types';
import {
    getElementsById,
    getNextHigherElementLayer,
    getNextLowerElementLayer,
    getSlideIndexById,
} from '../../model/utils';

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
    fontSize?: number;
    fontFamily?: FontFamily;
    color?: Color;
    bold?: boolean;
    cursive?: boolean;
    underline?: boolean;
    deltaTextSize?: number;
    align?: AlignTypes;
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

const getStateWithNewSelectedElemsTextValue = (
    state: Editor,
    newTextValue: string,
    textElementId: string,
) => {
    const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
    const selectedElements = getElementsById(state.presentation.slides[selectedSlidesIndex[0]].elements, [
        textElementId,
    ]);
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
                                                value: newTextValue,
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
                func: { from: 0, to: 0, line: '' },
            },
            slides: state.presentation.slides.map((slide, i) => {
                if (i === selectedSlidesIndex[0]) {
                    return {
                        ...slide,
                        elements: [...slide.elements, { ...newElement, layer: slide.elements.length }],
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
    func?: {
        from: number;
        to: number;
        line: string;
    };
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
                func: userAction.func ? userAction.func : { from: 0, to: 0, line: '' },
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
                                if (element.elementType == ObjectType.FunctionGraph) {
                                    return {
                                        ...element,
                                        properties: {
                                            ...element.properties,
                                            color: newColor,
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

const getStateWithNewSelectedElemsRotationAngle = (state: Editor, newRotation: number) => {
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
                                                rotateAngle: newRotation,
                                            },
                                        };
                                    if (element.figureType == FigureObjects.Triangle)
                                        return {
                                            ...element,
                                            properties: {
                                                ...element.properties,
                                                rotateAngle: newRotation,
                                            },
                                        };
                                    if (element.figureType == FigureObjects.Ellipse)
                                        return {
                                            ...element,
                                            properties: {
                                                ...element.properties,
                                                rotateAngle: newRotation,
                                            },
                                        };
                                }
                                if (element.elementType == ObjectType.Text) {
                                    return {
                                        ...element,
                                        properties: {
                                            ...element.properties,
                                            rotateAngle: newRotation,
                                        },
                                    };
                                }
                                if (element.elementType == ObjectType.FunctionGraph) {
                                    return {
                                        ...element,
                                        properties: {
                                            ...element.properties,
                                            rotateAngle: newRotation,
                                        },
                                    };
                                }
                                if (element.elementType == ObjectType.Image) {
                                    return {
                                        ...element,
                                        properties: {
                                            ...element.properties,
                                            rotateAngle: newRotation,
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

const getStateWithNewSelectedElemsLayer = (state: Editor, type: 'up' | 'down') => {
    const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
    const selectedElements = getElementsById(
        state.presentation.slides[selectedSlidesIndex[0]].elements,
        state.presentation.slides[selectedSlidesIndex[0]].selectedElements,
    );

    let newLayer = {
        nextLayer: 0,
        nextLayerIndex: 0,
    };
    let oldLayer = 0;
    if (selectedElements.length > 0) {
        oldLayer = state.presentation.slides[selectedSlidesIndex[0]].elements[selectedElements[0]].layer;
        if (type === 'up') {
            newLayer = getNextHigherElementLayer(
                state.presentation.slides[selectedSlidesIndex[0]],
                state.presentation.slides[selectedSlidesIndex[0]].elements[selectedElements[0]].layer,
            );
        } else if (type === 'down') {
            newLayer = getNextLowerElementLayer(
                state.presentation.slides[selectedSlidesIndex[0]],
                state.presentation.slides[selectedSlidesIndex[0]].elements[selectedElements[0]].layer,
            );
        }
    }
    const newState = {
        ...state,
        presentation: {
            ...state.presentation,
            slides: state.presentation.slides.map((slide, i) => {
                if (i === selectedSlidesIndex[0]) {
                    return {
                        ...slide,
                        elements: slide.elements.map((element, j) => {
                            if (j == selectedElements[0]) {
                                return {
                                    ...element,
                                    layer: newLayer.nextLayer,
                                };
                            } else if (j == newLayer.nextLayerIndex) {
                                return { ...element, layer: oldLayer };
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
    getStateWithNewSelectedElemsRotationAngle,
    getStateWithNewSelectedElemsLayer,
    getStateWithNewSelectedElemsTextValue,
};
