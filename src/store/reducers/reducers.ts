import { Slide } from '../../model/types';
import { Action } from '../actions/actions';
import { SlideBarActions } from '../actions/actions';

type InitData = {
    slides: Slide[];
};

const initData: InitData = {
    slides: [
        {
            id: '1',
            elements: [],
            elementsAnimations: [],
            background: {
                type: 'color',
                data: {
                    color: '',
                },
            },
            selectedElements: [],
        },
        {
            id: '2',
            elements: [],
            elementsAnimations: [],
            background: {
                type: 'color',
                data: {
                    color: '',
                },
            },
            selectedElements: [],
        },
    ],
};

const slideBarReducer = (
    state: InitData = initData,
    action: Action,
): InitData => {
    switch (action.type) {
        case SlideBarActions.CHANGE_POSITON:
            return {
                ...state,
                slides: state.slides.map((slide, i) => {
                    if (i == action.payload.oldPosition) {
                        return {
                            ...slide,
                        };
                    }
                    return slide;
                }),
            };

        case SlideBarActions.CHANGE_LAYOUT:
            return state;
        case SlideBarActions.ADD_SLIDE:
            return state;
        case SlideBarActions.DEELETE_SLIDE:
            return state;
        default:
            return state;
    }
};

export { slideBarReducer };
