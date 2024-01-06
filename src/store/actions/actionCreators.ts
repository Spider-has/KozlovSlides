import { Point } from '../../model/figureTypes';
import { BackgroundType, Id } from '../../model/types';
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

const createRemoveSelectSlidesAction = (slidesId: Id[]) => {
    return {
        type: PresentationActions.REMOVE_SELECT_SLIDES,
        payload: slidesId,
    };
};

const createChangeSelectedSlidesAction = (slidesId: Id[]) => {
    return {
        type: PresentationActions.CHANGE_SELECTED_SLIDES,
        payload: slidesId,
    };
};

const createChangeSelectedElementsAction = (ElementsId: Id[]) => {
    return {
        type: PresentationActions.CHANGE_SELECTED_ELEMENTS,
        payload: ElementsId,
    };
};

const createChangePositionAndSelectElementAction = (
    elementId: Id,
    deltaOffset: Point,
) => {
    return {
        type: PresentationActions.CHANGE_POSITION_AND_SELECT_ELEMENT,
        payload: {
            id: elementId,
            deltaOffset: deltaOffset,
        },
    };
};

const createChangeElementsPositionAction = (
    deltaOffset: Point,
    ElementsId: Id[],
) => {
    return {
        type: PresentationActions.CHANGE_ELEMENTS_POSITION,
        payload: {
            deltaOffset: deltaOffset,
            ElementsId: ElementsId,
        },
    };
};

const createChangeElementsSize = (deltaOffset: Point, ElementsId: Id[]) => {
    return {
        type: PresentationActions.CHANGE_ELEMENTS_SIZE,
        payload: {
            id: ElementsId,
            deltaOffset: deltaOffset,
        },
    };
};

export {
    createAddSlideAction,
    createDeleteSlideAction,
    createSelectSlidesAction,
    createRemoveSelectSlidesAction,
    createChangeSelectedSlidesAction,
    createChangeSelectedElementsAction,
    createChangeElementsPositionAction,
    createChangePositionAndSelectElementAction,
    createChangeElementsSize,
};
