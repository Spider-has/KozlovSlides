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

type Action =
    | ChangeSlidePosition
    | ChangeSlideLayout
    | DeleteSlide
    | AddSlide
    | SelectSlides
    | RemoveSelectSlides
    | ChangeShiftMode
    | ChangeSelectedSlides;
export type { Action };
export { PresentationActions };
