import { BackgroundType } from '../../model/types';
import { generateRandomId } from '../../model/utils';
import { PresentationActions } from './actions';

const createAddSlideAction = () => {
    return {
        type: PresentationActions.ADD_SLIDE,
        payload: {
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
    };
};

const createDeleteSlideAction = (slideId: string) => {
    return {
        type: PresentationActions.DEELETE_SLIDE,
        payload: {
            slideLayoutType: slideId,
        },
    };
};

const createSelectSlidesAction = (slidesId: string[]) => {
    return {
        type: PresentationActions.SELECT_SLIDES,
        payload: slidesId,
    };
};

const createRemoveSelectSlidesAction = (slidesId: string[]) => {
    return {
        type: PresentationActions.REMOVE_SELECT_SLIDES,
        payload: slidesId,
    };
};

const createChangeShiftModeAction = () => {
    return {
        type: PresentationActions.CHANGE_SHIFT_MODE,
    };
};

export {
    createAddSlideAction,
    createDeleteSlideAction,
    createSelectSlidesAction,
    createRemoveSelectSlidesAction,
    createChangeShiftModeAction,
};
