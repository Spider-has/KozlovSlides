import { FigureObjects, ObjectType, SlideElement } from './figureTypes';

type Id = string;

type SlideTransion = {
    type: string;
};

type ElementAnimation = {
    type: string;
    id: Id;
};

enum BackgroundType {
    Image,
    Color,
}

type SlideBackground = BackgroundImg | BackgroundColor;

type BackgroundImg = {
    type: BackgroundType.Image;
    url: string;
};

type BackgroundColor = {
    type: BackgroundType.Color;
    color: Color;
};

type Slide = {
    id: Id;
    elements: Array<SlideElement>;
    transitionAnimation?: SlideTransion;
    selectedElements: Array<Id>;
    elementsAnimations: Array<ElementAnimation>;
    background: SlideBackground;
};

type Size = {
    width: number;
    height: number;
};

type Presentation = {
    slides: Array<Slide>;
    size: Size;
    name: string;
    userAction: {
        ActionType: UserActions;
        AddedElementType: ObjectType | null;
        AddedFigureType: FigureObjects | null;
        Url: string;
    };
};

enum UserActions {
    SLIDE_EDIT = 'SLIDE_EDIT',
    ADD_ELEMENT = 'ADD_ELEMENT',
}

type Color = string;
type Editor = {
    presentation: Presentation;
    history: Array<Presentation>;
    selectedSlides: Array<Id>;
    viewMode: ViewMode;
    selectMode: SelectModeTypes;
};

enum SelectModeTypes {
    Slides = 'Slides',
    Elements = 'Elements',
}

enum ViewMode {
    Edit,
    View,
}
enum ButtonType {
    Text,
    IconText,
    Icon,
    FullText,
    FullIconText,
    FullIcon,
}
type ButtonProps = {
    text?: string;
    type: ButtonType;
    list?: boolean;
    icon?: JSX.Element | null;
    iconSize?: number;
    right?: boolean | false;
    action: () => void;
};
export type SketchExamplePopoverProps = {
    state: {displayColorPicker: boolean,
    color: {
        r: string,
        g: string,
        b: string,
        a: string,
    },}
};
type ButtonWithActionListProps = {
    mainButton: ButtonProps;
    buttonList: {
        secondaryButton: ButtonProps;
        buttonList: ButtonProps[];
    }[];
    right?: boolean | false;
};

export type {
    SlideBackground,
    Slide,
    Presentation,
    Editor,
    ElementAnimation,
    ButtonWithActionListProps,
    ButtonProps,
    Id,
};
export { SelectModeTypes, ButtonType, BackgroundType, ViewMode, UserActions };
