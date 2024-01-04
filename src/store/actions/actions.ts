import { Point } from '../../model/figureTypes';
import { Id, Slide } from '../../model/types';

enum PresentationActions {
    CHANGE_SLIDE_POSITION = 'CHANGE_POSITION',
    DEELETE_SLIDE = 'DEELETE_SLIDE',
    ADD_SLIDE = 'ADD_SLIDE',
    CHANGE_SLIDE_LAYOUT = 'CHANGE_LAYOUT',
    SELECT_SLIDES = 'SELECT_SLIDES',
    REMOVE_SELECT_SLIDES = 'REMOVE_SELECT_SLIDES',
    CHANGE_SHIFT_MODE = 'CHANGE_SHIFT_MODE',
    CHANGE_SELECTED_SLIDES = 'CHANGE_SELECTED_SLIDES',
    CHANGE_ELEMENTS_POSITION = 'CHANGE_ELEMENTS_POSITION',
    CHANGE_SELECTED_ELEMENTS = 'CHANGE_SELECTED_ELEMENTS',
    CHANGE_POSITION_AND_SELECT_ELEMENT = 'CHANGE_POSITION_AND_SELECT_ELEMENT',
}

type ChangeSlidePosition = {
    type: PresentationActions.CHANGE_SLIDE_POSITION;
    payload: {
        oldPosition: number;
        newPosition: number;
    };
};

type AddSlide = {
    type: PresentationActions.ADD_SLIDE;
    payload: Slide;
};

type DeleteSlide = {
    type: PresentationActions.DEELETE_SLIDE;
    payload: {
        slideId: string;
    };
};

type SelectSlides = {
    type: PresentationActions.SELECT_SLIDES;
    payload: string[];
};

type ChangeSlideLayout = {
    type: PresentationActions.CHANGE_SLIDE_LAYOUT;
    payload: {
        slideId: string;
        newLayoutType: 'type';
    };
};

type RemoveSelectSlides = {
    type: PresentationActions.REMOVE_SELECT_SLIDES;
    payload: string[];
};

type ChangeShiftMode = {
    type: PresentationActions.CHANGE_SHIFT_MODE;
};

type ChangeSelectedSlides = {
    type: PresentationActions.CHANGE_SELECTED_SLIDES;
    payload: Id[];
};

type ChangeElementPosition = {
    type: PresentationActions.CHANGE_ELEMENTS_POSITION;
    payload: {
        deltaOffset: Point;
        ElementsId: Id[];
    };
};

type ChangeSelectedElements = {
    type: PresentationActions.CHANGE_SELECTED_ELEMENTS;
    payload: Id[];
};

type ChangePositionAndSelectedElement = {
    type: PresentationActions.CHANGE_POSITION_AND_SELECT_ELEMENT;
    payload: {
        id: Id;
        deltaOffset: Point;
    };
};

type Action =
    | ChangeSlidePosition
    | ChangeSlideLayout
    | DeleteSlide
    | AddSlide
    | SelectSlides
    | RemoveSelectSlides
    | ChangeShiftMode
    | ChangeSelectedSlides
    | ChangeElementPosition
    | ChangeSelectedElements
    | ChangePositionAndSelectedElement;
export type { Action };
export { PresentationActions };
