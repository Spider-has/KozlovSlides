import { combineReducers } from '@reduxjs/toolkit';
import { BackgroundType, Editor, ViewMode } from '../../model/types';
import { Action } from '../actions/actions';
import { PresentationActions } from '../actions/actions';
import { generateRandomId } from '../../model/utils';
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
                        properties: {
                            rotateAngle: 0,
                            opacity: 1,
                            rounding: 0,
                            color: 'red',
                            size: {
                                width: 150,
                                height: 200,
                            },
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
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map((slide, i) => {
                        if (i == action.payload.oldPosition) {
                            return {
                                ...slide,
                            };
                        }
                        return slide;
                    }),
                },
            };

        case PresentationActions.CHANGE_SLIDE_LAYOUT:
            return state;
        case PresentationActions.ADD_SLIDE:
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: [...state.presentation.slides, action.payload],
                },
            };
        case PresentationActions.DEELETE_SLIDE:
            return state;
        case PresentationActions.SELECT_SLIDES:
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map(slide => {
                        if (action.payload.includes(slide.id)) {
                            return {
                                ...slide,
                                isSelected: true,
                            };
                        }
                        return slide;
                    }),
                },
            };
        case PresentationActions.REMOVE_SELECT_SLIDES:
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map(slide => {
                        if (action.payload.includes(slide.id)) {
                            return {
                                ...slide,
                                isSelected: false,
                            };
                        }
                        return slide;
                    }),
                },
            };
        case PresentationActions.CHANGE_SELECTED_SLIDES: {
            return {
                ...state,
                selectedSlides: action.payload,
            };
        }
        case PresentationActions.CHANGE_SELECTED_ELEMENTS: {
            // const getSelectedSlide;
            // const getSelectedElements;
            // const newSlides;
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map(slide => {
                        if (
                            state.selectedSlides[
                                state.selectedSlides.length - 1
                            ] === slide.id
                        ) {
                            return {
                                ...slide,
                                selectedElements: action.payload,
                            };
                        }
                        return slide;
                    }),
                },
            };
        }
        case PresentationActions.CHANGE_ELEMENTS_POSITION: {
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map(slide => {
                        if (
                            state.selectedSlides[
                                state.selectedSlides.length - 1
                            ] === slide.id
                        ) {
                            return {
                                ...slide,
                                elements: slide.elements.map(element => {
                                    if (
                                        slide.selectedElements.includes(
                                            element.id,
                                        )
                                    ) {
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
        }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    slideBar: SlideBarReducer,
});

export { rootReducer };
