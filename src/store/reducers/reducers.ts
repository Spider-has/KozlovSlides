import { combineReducers } from '@reduxjs/toolkit';
import { BackgroundType, Editor, SelectModeTypes, UserActions, ViewMode } from '../../model/types';
import { Action } from '../actions/actions';
import { PresentationActions } from '../actions/actions';
import { generateRandomId, getSlideIndexById } from '../../model/utils';
import {
    getStateWithAddElementAction,
    getStateWithCreatedElement,
    getStateWithNewSelectedElemsColor,
    getStateWithNewSelectedElemsPosition,
    getStateWithNewSelectedElemsSize,
    getStateWithNewSelectedElemsTextParams,
} from './reducerUtils';

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
        name: 'Презентация без имени',
        userAction: {
            ActionType: UserActions.SLIDE_EDIT,
            AddedElementType: null,
            AddedFigureType: null,
            Url: '',
        },
    },
    history: [],
    selectedSlides: [],
    viewMode: ViewMode.Edit,
    selectMode: SelectModeTypes.Slides,
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
                selectMode: SelectModeTypes.Slides,
            };
            return newState;
        }
        case PresentationActions.DELETE_SLIDES: {
            const newSlides = state.presentation.slides.filter(
                slide => !state.selectedSlides.includes(slide.id),
            );
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: newSlides.length ? newSlides : state.presentation.slides,
                },
            };
            return newState;
        }
        case PresentationActions.REMOVE_SELECT_SLIDES:
            return state;
        case PresentationActions.CHANGE_SELECTED_SLIDES: {
            const newState = {
                ...state,
                selectedSlides: action.payload,
                selectMode: SelectModeTypes.Slides,
            };
            return newState;
        }
        case PresentationActions.DELETE_ELEMENTS: {
            const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
            const newElements = state.presentation.slides[selectedSlidesIndex[0]].elements.filter(
                elem => !state.presentation.slides[selectedSlidesIndex[0]].selectedElements.includes(elem.id),
            );
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map((slide, i) => {
                        if (i === selectedSlidesIndex[0]) {
                            return {
                                ...slide,
                                elements: newElements,
                            };
                        }
                        return slide;
                    }),
                },
                selectMode: SelectModeTypes.Elements,
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
                selectMode: SelectModeTypes.Elements,
            };
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENTS_POSITION: {
            const newState = getStateWithNewSelectedElemsPosition(
                state,
                action.payload.deltaOffset.x,
                action.payload.deltaOffset.y,
            );
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENTS_SIZE: {
            const newState = getStateWithNewSelectedElemsSize(
                state,
                action.payload.deltaOffset.x,
                action.payload.deltaOffset.y,
            );
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENT_TEXT: {
            const newState = getStateWithNewSelectedElemsTextParams(state, { value: action.payload.newText });
            return newState;
        }
        case PresentationActions.ADD_ELEMENT_ACTION: {
            const newState = getStateWithAddElementAction(state, { ...action.payload });
            return newState;
        }
        case PresentationActions.CREATE_ELEMENT: {
            const newState = getStateWithCreatedElement(state, action.payload.element);
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_BOLD: {
            const newState = getStateWithNewSelectedElemsTextParams(state, { bold: true });
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_CURSIVE: {
            const newState = getStateWithNewSelectedElemsTextParams(state, { cursive: true });
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_UNDERLINE: {
            const newState = getStateWithNewSelectedElemsTextParams(state, { underline: true });
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_SIZE: {
            const newState = getStateWithNewSelectedElemsTextParams(state, { deltaTextSize: action.payload });
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_FONT_FAMILY: {
            const newState = getStateWithNewSelectedElemsTextParams(state, {
                fontFamily: { fontFamily: action.payload },
            });
            return newState;
        }
        case PresentationActions.CHANGE_SLIDES_ORDER: {
            const newSlides = [...state.presentation.slides];
            const removedSlides = newSlides.splice(action.payload.from, 1);
            newSlides.splice(action.payload.to, 0, removedSlides[0]);
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: newSlides,
                },
                selectedSlides: [removedSlides[0].id],
            };
            return newState;
        }
        case PresentationActions.UPDATE_PRESENTATION: {
            const SelectedSlidesId = action.payload.slides[0].id ? [action.payload.slides[0].id] : [];
            const newState = {
                ...state,
                presentation: action.payload,
                selectedSlides: SelectedSlidesId,
            };
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENTS_COLOR: {
            const newState = getStateWithNewSelectedElemsColor(state, action.payload.color);
            return newState;
        }
        case PresentationActions.CHANGE_PRESENTATION_NAME: {
            console.log('nameChange');
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    name: action.payload,
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
