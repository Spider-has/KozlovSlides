import { combineReducers } from '@reduxjs/toolkit';
import { BackgroundType, Editor, ViewMode } from '../../model/types';
import { Action } from '../actions/actions';
import { PresentationActions } from '../actions/actions';
import { generateRandomId, getElementsById, getSlideIndexById } from '../../model/utils';
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
                        figureType: FigureObjects.Ellipse,
                        size: {
                            width: 150,
                            height: 200,
                        },
                        properties: {
                            rotateAngle: 0,
                            opacity: 0,
                            rounding: 0,
                        },
                    },
                    {
                        id: '3',
                        position: {
                            x: 10,
                            y: 10,
                        },
                        elementType: ObjectType.Graphic,
                        figureType: FigureObjects.Triangle,
                        size: {
                            width: 150,
                            height: 200,
                        },
                        properties: {
                            rotateAngle: 0,
                            opacity: 0,
                            point1: { x: 0, y: 100 },
                            point2: { x: 100, y: 100 },
                            point3: { x: 50, y: 0 },
                        },
                    },
                    {
                        id: '4',
                        position: {
                            x: 10,
                            y: 10,
                        },
                        elementType: ObjectType.Image,
                        size: {
                            width: 150,
                            height: 200,
                        },
                        properties: {
                            imgUrl: 'https://sun9-37.userapi.com/impg/rO2c_c5dYeOMqrbH8UFtQfNywLczoOdld0_TLg/th78MXnFm7c.jpg?size=2560x1745&quality=95&sign=679e255e69cb82c6fd66b1927150742f&type=album',
                        },
                    },
                    {
                        id: '5',
                        position: {
                            x: 10,
                            y: 10,
                        },
                        elementType: ObjectType.Video,
                        size: {
                            width: 150,
                            height: 200,
                        },
                        properties: {
                            videoUrl: 'https://youtu.be/pVxvF9FNkXw',
                        },
                    },
                    {
                        id: '6',
                        position: {
                            x: 500,
                            y: 10,
                        },
                        elementType: ObjectType.Text,
                        size: {
                            width: 150,
                            height: 200,
                        },
                        properties: {
                            chars: [
                                {
                                    value: 'a',
                                    fontFamily: {
                                        fontFamily: 'Times New Roman',
                                    },
                                    fontSize: 12,
                                    color: 'gray',
                                    bold: false,
                                    cursive: true,
                                    underline: false,
                                },
                                {
                                    value: 'abobus',
                                    fontFamily: { fontFamily: 'Arial' },
                                    fontSize: 14,
                                    color: 'gray',
                                    bold: true,
                                    cursive: true,
                                    underline: true,
                                },
                            ],
                            rotateAngle: 0,
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

const SlideBarReducer = (state: InitData = initData, action: Action): InitData => {
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
            const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
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
            console.log(action.payload);
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENTS_POSITION: {
            const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
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
                                                x: oldx + action.payload.deltaOffset.x,
                                                y: oldy + action.payload.deltaOffset.y,
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
        case PresentationActions.CHANGE_ELEMENTS_SIZE: {
            const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
            const selectedElements = getElementsById(
                state.presentation.slides[selectedSlidesIndex[0]].elements,
                action.payload.id,
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
                                                width:
                                                    oldWidht + action.payload.deltaOffset.x > 0
                                                        ? oldWidht + action.payload.deltaOffset.x
                                                        : 0,
                                                height:
                                                    oldHeight + action.payload.deltaOffset.y > 0
                                                        ? oldHeight + action.payload.deltaOffset.y
                                                        : 0,
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
            const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
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
                                                    oldx + action.payload.deltaOffset.x > 0
                                                        ? oldx + action.payload.deltaOffset.x
                                                        : 0,
                                                y:
                                                    oldy + action.payload.deltaOffset.y > 0
                                                        ? oldy + action.payload.deltaOffset.y
                                                        : 0,
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
