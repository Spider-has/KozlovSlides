enum SlideBarActions {
    CHANGE_POSITON = 'CHANGE_POSITION',
    DEELETE_SLIDE = 'DEELETE_SLIDE',
    ADD_SLIDE = 'ADD_SLIDE',
    CHANGE_LAYOUT = 'CHANGE_LAYOUT',
}

type ChangeSlidePosition = {
    type: SlideBarActions.CHANGE_POSITON;
    payload: {
        oldPosition: number;
        newPosition: number;
    };
};

type AddSlide = {
    type: SlideBarActions.ADD_SLIDE;
    payload: {
        slideLayoutType: 'type';
    };
};

type DeleteSlide = {
    type: SlideBarActions.DEELETE_SLIDE;
    payload: {
        slideId: string;
    };
};

type ChangeSlideLayout = {
    type: SlideBarActions.CHANGE_LAYOUT;
    payload: {
        slideId: string;
        newLayoutType: 'type';
    };
};

type Action = ChangeSlidePosition | ChangeSlideLayout | DeleteSlide | AddSlide;
export type { Action };
export { SlideBarActions };
