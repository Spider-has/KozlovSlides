import { FigureObjects, ObjectType, Point, SlideElement } from '../../model/figureTypes';
import { BackgroundType, Id, Presentation } from '../../model/types';
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

const createDeleteSlideAction = () => {
    return {
        type: PresentationActions.DELETE_SLIDES,
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

const createChangeElementsPositionAction = (deltaOffset: Point) => {
    return {
        type: PresentationActions.CHANGE_ELEMENTS_POSITION,
        payload: {
            deltaOffset: deltaOffset,
        },
    };
};

const createChangeElementsSizeAction = (deltaOffset: Point) => {
    return {
        type: PresentationActions.CHANGE_ELEMENTS_SIZE,
        payload: {
            deltaOffset: deltaOffset,
        },
    };
};

const createChangeElementTextAction = (newText: string, id: Id) => {
    return {
        type: PresentationActions.CHANGE_ELEMENT_TEXT,
        payload: {
            newText: newText,
            id: id,
        },
    };
};

const createChangeAddElementAction = (elementType: ObjectType, figureType?: FigureObjects, url?: string) => {
    return {
        type: PresentationActions.ADD_ELEMENT_ACTION,
        payload: {
            elementType: elementType,
            figureType: figureType ? figureType : null,
            url: url ? url : '',
        },
    };
};

const createCreateNewAlementAction = (elem: SlideElement) => {
    return {
        type: PresentationActions.CREATE_ELEMENT,
        payload: {
            element: elem,
        },
    };
};

const createDeleteElementsAction = () => {
    return {
        type: PresentationActions.DELETE_ELEMENTS,
    };
};

const createChangeTextBold = () => {
    return {
        type: PresentationActions.CHANGE_TEXT_BOLD,
    };
};

const createChangeTextUnderline = () => {
    return {
        type: PresentationActions.CHANGE_TEXT_UNDERLINE,
    };
};

const createChangeTextCursive = () => {
    return {
        type: PresentationActions.CHANGE_TEXT_CURSIVE,
    };
};

const createChangeTextSize = (size: number) => {
    return {
        type: PresentationActions.CHANGE_TEXT_SIZE,
        payload: size,
    };
};

const createChangeTextFontFamily = (fontFamily: string) => {
    return {
        type: PresentationActions.CHANGE_TEXT_FONT_FAMILY,
        payload: fontFamily,
    };
};

const createChangeSlidesOrderAction = (oldPos: number, newPos: number) => {
    return {
        type: PresentationActions.CHANGE_SLIDES_ORDER,
        payload: {
            from: oldPos,
            to: newPos,
        },
    };
};

const createUpdatePresentationFromFileAction = (presentation: Presentation) => {
    return {
        type: PresentationActions.UPDATE_PRESENTATION,
        payload: presentation,
    };
};

const createChangePresentationNameAction = (newName: string) => {
    return {
        type: PresentationActions.CHANGE_PRESENTATION_NAME,
        payload: newName,
    };
};

const createChangeElementsColorAction = (newColor: string) => {
    return {
        type: PresentationActions.CHANGE_ELEMENTS_COLOR,
        payload: {
            color: newColor,
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
    createChangeElementsSizeAction,
    createChangeElementTextAction,
    createChangeAddElementAction,
    createCreateNewAlementAction,
    createDeleteElementsAction,
    createChangeTextBold,
    createChangeTextUnderline,
    createChangeTextCursive,
    createChangeTextSize,
    createChangeTextFontFamily,
    createChangeSlidesOrderAction,
    createUpdatePresentationFromFileAction,
    createChangePresentationNameAction,
    createChangeElementsColorAction,
};
