import { FigureObjects, ObjectType, Point, SlideElement } from '../../model/figureTypes';
import { Id, Slide } from '../../model/types';

enum PresentationActions {
    CHANGE_SLIDE_POSITION = 'CHANGE_POSITION',
    DELETE_SLIDES = 'DELETE_SLIDES',
    ADD_SLIDE = 'ADD_SLIDE',
    CHANGE_SLIDE_LAYOUT = 'CHANGE_LAYOUT',
    SELECT_SLIDES = 'SELECT_SLIDES',
    REMOVE_SELECT_SLIDES = 'REMOVE_SELECT_SLIDES',
    CHANGE_SHIFT_MODE = 'CHANGE_SHIFT_MODE',
    CHANGE_SELECTED_SLIDES = 'CHANGE_SELECTED_SLIDES',
    CHANGE_ELEMENTS_POSITION = 'CHANGE_ELEMENTS_POSITION',
    CHANGE_SELECTED_ELEMENTS = 'CHANGE_SELECTED_ELEMENTS',
    CHANGE_POSITION_AND_SELECT_ELEMENT = 'CHANGE_POSITION_AND_SELECT_ELEMENT',
    CHANGE_ELEMENTS_SIZE = 'CHANGE_ELEMENTS_SIZE',
    CHANGE_ELEMENT_TEXT = 'CHANGE_ELEMENT_TEXT',
    ADD_ELEMENT_ACTION = 'ADD_ELEMENT_ACTION',
    CREATE_ELEMENT = 'CREATE_ELEMENT',
    DELETE_ELEMENTS = 'DELETE_ELEMENTS',
    CHANGE_TEXT_BOLD = 'CHANGE_TEXT_BOLD',
    CHANGE_TEXT_UNDERLINE = 'CHANGE_TEXT_UNDERLINE',
    CHANGE_TEXT_CURSIVE = 'CHANGE_TEXT_CURSIVE',
    CHANGE_TEXT_SIZE = 'CHANGE_TEXT_SIZE',
    CHANGE_TEXT_FONT_FAMILY = 'CHANGE_TEXT_FONT_FAMILY'
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
    type: PresentationActions.DELETE_SLIDES;
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

type ChangeElementsSize = {
    type: PresentationActions.CHANGE_ELEMENTS_SIZE;
    payload: {
        deltaOffset: Point;
    };
};

type ChangeElementText = {
    type: PresentationActions.CHANGE_ELEMENT_TEXT;
    payload: {
        newText: string;
        id: Id;
    };
};

type ChangeToAddElementAction = {
    type: PresentationActions.ADD_ELEMENT_ACTION;
    payload: {
        elementType: ObjectType,
        figureType?: FigureObjects,
        url?: string
    }
};

type CreateElementOnSlide = {
    type: PresentationActions.CREATE_ELEMENT;
    payload: {
        element: SlideElement
    }
};

type DeleteElements = {
    type: PresentationActions.DELETE_ELEMENTS;
};

type ChangeTextBold = {
    type: PresentationActions.CHANGE_TEXT_BOLD;
};

type ChangeTextUnderline = {
    type: PresentationActions.CHANGE_TEXT_UNDERLINE;
};

type ChangeTextUnderCursive = {
    type: PresentationActions.CHANGE_TEXT_CURSIVE;
};

type ChangeTextSize = {
    type: PresentationActions.CHANGE_TEXT_SIZE;
    payload: number
};

type ChangeTextFontFamily = {
    type: PresentationActions.CHANGE_TEXT_FONT_FAMILY;
    payload: string
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
    | ChangePositionAndSelectedElement
    | ChangeElementsSize
    | ChangeElementText
    | ChangeToAddElementAction
    | CreateElementOnSlide
    | DeleteElements
    | ChangeTextBold
    | ChangeTextUnderline
    | ChangeTextUnderCursive
    | ChangeTextSize
    | ChangeTextFontFamily;
export type { Action };
export { PresentationActions };
