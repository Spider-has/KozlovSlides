import { combineReducers } from '@reduxjs/toolkit';
import { BackgroundType, Editor, SelectModeTypes, UserActions, ViewMode } from '../../model/types';
import { Action } from '../actions/actions';
import { PresentationActions } from '../actions/actions';
import { generateRandomId, getSlideIndexById } from '../../model/utils';
import {
    getStateWithAddElementAction,
    getStateWithCreatedElement,
    getStateWithNewSelectedElemsColor,
    getStateWithNewSelectedElemsLayer,
    getStateWithNewSelectedElemsPosition,
    getStateWithNewSelectedElemsRotationAngle,
    getStateWithNewSelectedElemsSize,
    getStateWithNewSelectedElemsTextParams,
    getStateWithNewSelectedElemsTextValue,
} from './reducerUtils';
import { HistoryInit } from './history';

type InitData = Editor;
const defaultSize = {
    width: 800,
    height: 450,
};

const initData: InitData = {
    presentation: {
        slides: [
            {
                id: generateRandomId(),
                elements: [],
                selectedElements: [],
                elementsAnimations: [],
                background: { type: BackgroundType.Color, color: 'white' },
            },
        ],
        size: defaultSize,
        name: 'Презентация без названия',
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

const statesHistory = HistoryInit<Editor>(initData);

const SlideBarReducer = (state: InitData = initData, action: Action): InitData => {
    switch (action.type) {
        case PresentationActions.ADD_SLIDE: {
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: [...state.presentation.slides, action.payload],
                },
                selectMode: SelectModeTypes.Slides,
            };
            statesHistory.addState(newState);
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
            statesHistory.addState(newState);
            return newState;
        }
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
            statesHistory.addState(newState);
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
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENTS_SIZE: {
            const newState = getStateWithNewSelectedElemsSize(
                state,
                action.payload.deltaOffset.x,
                action.payload.deltaOffset.y,
            );
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENT_TEXT: {
            const newState = getStateWithNewSelectedElemsTextValue(
                state,
                action.payload.newText,
                action.payload.id,
            );
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.ADD_ELEMENT_ACTION: {
            const newState = getStateWithAddElementAction(state, { ...action.payload });
            return newState;
        }
        case PresentationActions.CREATE_ELEMENT: {
            const newState = getStateWithCreatedElement(state, action.payload.element);
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_BOLD: {
            const newState = getStateWithNewSelectedElemsTextParams(state, { bold: true });
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_CURSIVE: {
            const newState = getStateWithNewSelectedElemsTextParams(state, { cursive: true });
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_UNDERLINE: {
            const newState = getStateWithNewSelectedElemsTextParams(state, { underline: true });
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_SIZE: {
            const newState = getStateWithNewSelectedElemsTextParams(state, { deltaTextSize: action.payload });
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_ALIGN: {
            const newState = getStateWithNewSelectedElemsTextParams(state, { align: action.payload });
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_TEXT_FONT_FAMILY: {
            const newState = getStateWithNewSelectedElemsTextParams(state, {
                fontFamily: { fontFamily: action.payload },
            });
            statesHistory.addState(newState);
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
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.UPDATE_PRESENTATION: {
            const SelectedSlidesId = action.payload.slides[0].id ? [action.payload.slides[0].id] : [];
            const newState = {
                ...state,
                presentation: action.payload,
                selectedSlides: SelectedSlidesId,
            };
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENTS_COLOR: {
            const newState = getStateWithNewSelectedElemsColor(state, action.payload.color);
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_PRESENTATION_NAME: {
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    name: action.payload,
                },
            };
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_SLIDE_BACKGROUND: {
            const selectedSlidesIndex = getSlideIndexById(state.presentation.slides, state.selectedSlides);
            console.log(selectedSlidesIndex);
            const newState = {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map((slide, i) => {
                        if (selectedSlidesIndex.includes(i)) {
                            return {
                                ...slide,
                                background: action.payload,
                            };
                        }
                        return slide;
                    }),
                },
                selectMode: SelectModeTypes.Slides,
            };
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.UNDO: {
            const newState = statesHistory.undoState();
            return newState ? newState : state;
        }
        case PresentationActions.REDO: {
            const newState = statesHistory.redoState();
            return newState ? newState : state;
        }
        case PresentationActions.CHANGE_ELEMENTS_ROTATE_ANGLE: {
            const newState = getStateWithNewSelectedElemsRotationAngle(state, action.payload);
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENTS_LAYER_HIGHER: {
            const newState = getStateWithNewSelectedElemsLayer(state, 'up');
            statesHistory.addState(newState);
            return newState;
        }
        case PresentationActions.CHANGE_ELEMENTS_LAYER_LOWER: {
            const newState = getStateWithNewSelectedElemsLayer(state, 'down');
            statesHistory.addState(newState);
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
