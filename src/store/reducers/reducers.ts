import { combineReducers } from '@reduxjs/toolkit';
import { BackgroundType, Editor, ViewMode } from '../../model/types';
import { Action } from '../actions/actions';
import { PresentationActions } from '../actions/actions';
import {
    generateRandomId,
    getElementsById,
    getSlideIndexById,
} from '../../model/utils';
import { ObjectType, FigureObjects } from '../../model/figureTypes';

type InitData = Editor;
const defaultSize = {
    width: 500,
    height: 600,
};

const initData: InitData = {
    presentation: {
        slides: [
            {
                id: generateRandomId(),
                elements: [
                    {
                        id: '1',
                        position: {
                            x: 10,
                            y: 10,
                        },
                        elementType: ObjectType.Graphic,
                        figureType: FigureObjects.Rectangle,
                        size: {
                            width: 150,
                            height: 200,
                        },
                        properties: {
                            rotateAngle: 0,
                            opacity: 1,
                            rounding: 0,
                            color: 'red',
                        },
                    },
                    {
                        id: '2',
                        position: {
                            x: 10,
                            y: 10,
                        },
                        elementType: ObjectType.Graphic,
                        figureType: FigureObjects.Rectangle,
                        size: {
                            width: 150,
                            height: 200,
                        },
                        properties: {
                            rotateAngle: 0,
                            opacity: 1,
                            rounding: 0,
                            color: 'red',
                        },
                    },
                ],
                selectedElements: [],
                elementsAnimations: [],
                background: {
                    type: BackgroundType.Color,
                    data: { color: '' },
                },
            },
        ],
        size: defaultSize,
        name: 'Презентация',
    },
    history: [],
    selectedSlides: [],
    viewMode: ViewMode.Edit,
};
initData.selectedSlides[0] = initData.presentation.slides[0].id;

const SlideBarReducer = (
    state: InitData = initData,
    action: Action,
): InitData => {
    switch (action.type) {
        case PresentationActions.CHANGE_SLIDE_POSITION:
            return state;
        case PresentationActions.CHANGE_SLIDE_LAYOUT:
            return state;
        case PresentationActions.ADD_SLIDE: {
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: [...state.presentation.slides, action.payload],
                },
            };
            return newState;
        }
        case PresentationActions.DEELETE_SLIDE:
            return state;
        case PresentationActions.REMOVE_SELECT_SLIDES:
            return state;
        case PresentationActions.CHANGE_SELECTED_SLIDES: {
            const newState = {
                ...state,
                selectedSlides: action.payload,
            };
            return newState;
        }
        case PresentationActions.CHANGE_SELECTED_ELEMENTS: {
            const selectedSlidesIndex = getSlideIndexById(
                state.presentation.slides,
                state.selectedSlides,
            );
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map((slide, i) => {
                        if (i === selectedSlidesIndex[0]) {
                            return {
                                ...slide,
                                selectedElements: action.payload,
                            };
                        }
                        return slide;
                    }),
                },
            };
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENTS_POSITION: {
            const selectedSlidesIndex = getSlideIndexById(
                state.presentation.slides,
                state.selectedSlides,
            );
            const selectedElements = getElementsById(
                state.presentation.slides[selectedSlidesIndex[0]].elements,
                action.payload.ElementsId,
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
                                                x:
                                                    oldx +
                                                    action.payload.deltaOffset
                                                        .x,
                                                y:
                                                    oldy +
                                                    action.payload.deltaOffset
                                                        .y,
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
            };
            return newState;
        }
        case PresentationActions.CHANGE_POSITION_AND_SELECT_ELEMENT: {
            const selectedSlidesIndex = getSlideIndexById(
                state.presentation.slides,
                state.selectedSlides,
            );
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map((slide, i) => {
                        if (i === selectedSlidesIndex[0]) {
                            return {
                                ...slide,
                                selectedElements: [action.payload.id],
                                elements: slide.elements.map(element => {
                                    if (action.payload.id === element.id) {
                                        const oldx = element.position.x;
                                        const oldy = element.position.y;
                                        return {
                                            ...element,
                                            position: {
                                                x:
                                                    oldx +
                                                    action.payload.deltaOffset
                                                        .x,
                                                y:
                                                    oldy +
                                                    action.payload.deltaOffset
                                                        .y,
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
            };
            return newState;
        }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    slideBar: SlideBarReducer,
});

export { rootReducer };
