import { combineReducers } from '@reduxjs/toolkit';
import { BackgroundType, Editor, SelectModeTypes, UserActions, ViewMode } from '../../model/types';
import { Action } from '../actions/actions';
import { PresentationActions } from '../actions/actions';
import { generateRandomId, getElementsById, getSlideIndexById } from '../../model/utils';
import { ObjectType } from '../../model/figureTypes';

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
                elements: [],
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
        userAction: {
            ActionType: UserActions.SLIDE_EDIT,
            AddedElementType: null,
            AddedFigureType: null,
            Url: ""
        }
    },
    history: [],
    selectedSlides: [],
    viewMode: ViewMode.Edit,
    selectMode: SelectModeTypes.Slides
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
                selectMode: SelectModeTypes.Slides
            };
            return newState;
        }
        case PresentationActions.DELETE_SLIDES: {
            const newSlides = state.presentation.slides.filter(slide => !state.selectedSlides.includes(slide.id))
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: newSlides.length ? newSlides : state.presentation.slides
                }
            }
            return newState;
        }
        case PresentationActions.REMOVE_SELECT_SLIDES:
            return state;
        case PresentationActions.CHANGE_SELECTED_SLIDES: {
            const newState = {
                ...state,
                selectedSlides: action.payload,
                selectMode: SelectModeTypes.Slides
            };
            return newState;
        }
        case PresentationActions.DELETE_ELEMENTS: {
            const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
            const newElements = state.presentation.slides[selectedSlidesIndex[0]].elements.filter(elem => !state.presentation.slides[selectedSlidesIndex[0]].selectedElements.includes(elem.id))
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map((slide, i) => {
                        if (i === selectedSlidesIndex[0]) {
                            return {
                                ...slide,
                                elements: newElements
                            };
                        }
                        return slide;
                    }),
                },
                selectMode: SelectModeTypes.Elements
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
                selectMode: SelectModeTypes.Elements
            };
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENTS_POSITION: {
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
                selectMode: SelectModeTypes.Elements
            };
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENTS_SIZE: {
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
                selectMode: SelectModeTypes.Elements
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
                selectMode: SelectModeTypes.Elements
            };
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENT_TEXT: {
            const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
            const selectedElements = getElementsById(
                state.presentation.slides[selectedSlidesIndex[0]].elements,
                [action.payload.id],
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
                                                        value: action.payload.newText,
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
                selectMode: SelectModeTypes.Elements
            };
            return newState;
        }
        case PresentationActions.ADD_ELEMENT_ACTION: {
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    userAction: {
                        ActionType: UserActions.ADD_ELEMENT,
                        AddedElementType: action.payload.elementType,
                        AddedFigureType: action.payload.figureType ? action.payload.figureType : null,
                        Url: action.payload.url ? action.payload.url : ""
                    }
                },
                selectMode: SelectModeTypes.Elements
            };
            return newState;
        }
        case PresentationActions.CREATE_ELEMENT: {
            const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    userAction: {
                        ActionType: UserActions.SLIDE_EDIT,
                        AddedElementType: null,
                        AddedFigureType: null,
                        Url: ""
                    },
                    slides: state.presentation.slides.map((slide, i) => {
                        if (i === selectedSlidesIndex[0]) {
                            return {
                                ...slide,
                                elements: [...slide.elements, action.payload.element],
                                selectedElements: [action.payload.element.id]
                            };
                        }
                        return slide;
                    }),
                },
                selectMode: SelectModeTypes.Elements
            };
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_BOLD: {
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
                                                        bold: !element.properties.chars.bold
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
                selectMode: SelectModeTypes.Elements
            };
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_CURSIVE: {
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
                                                        cursive: !element.properties.chars.cursive
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
                selectMode: SelectModeTypes.Elements
            };
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_UNDERLINE: {
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
                                                        underline: !element.properties.chars.underline
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
                selectMode: SelectModeTypes.Elements
            };
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_SIZE: {
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
                                                        fontSize: element.properties.chars.fontSize + action.payload
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
                selectMode: SelectModeTypes.Elements
            };
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_FONT_FAMILY: {
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
                                                        fontFamily: { fontFamily: action.payload }
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
                selectMode: SelectModeTypes.Elements
            };
            return newState;
        }
        case PresentationActions.CHANGE_SLIDES_ORDER: {
            const newSlides = [...state.presentation.slides];
            const removedSlides = newSlides.splice(action.payload.from, 1)
            newSlides.splice(action.payload.to, 0, removedSlides[0])
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: newSlides,
                },
                selectedSlides: [removedSlides[0].id]
            }
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
