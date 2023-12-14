import { combineReducers } from '@reduxjs/toolkit';
import { BackgroundType, Editor, ViewMode } from '../../model/types';
import { Action } from '../actions/actions';
import { PresentationActions } from '../actions/actions';
import { generateRandomId } from '../../model/utils';

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
                isSelected: false,
            },
        ],
        size: defaultSize,
        name: 'Презентация',
    },
    history: [],
    selectedSlides: [],
    viewMode: ViewMode.Edit,
    shiftMode: false,
};

const slideBarReducer = (
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
        default:
            return state;
    }
};

const editorReducer = (
    state: InitData = initData,
    action: Action,
): InitData => {
    switch (action.type) {
        case PresentationActions.CHANGE_SHIFT_MODE:
            return { ...state, shiftMode: !state.shiftMode };
        default:
            return state;
    }
};
const rootReducer = combineReducers({
    slideBar: slideBarReducer,
    editor: editorReducer,
});

export { rootReducer };
