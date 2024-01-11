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

type SlideBackground = {
    type: BackgroundType;
    data: BackgroundImg | BackgroundColor;
};

type BackgroundImg = {
    url: string;
};

type BackgroundColor = {
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
    menuValues?: MenuValues;
    userAction: {
        ActionType: UserActions,
        AddedElementType: ObjectType | null,
        AddedFigureType: FigureObjects | null,
        Url: string
    };
};

enum UserActions {
    SLIDE_EDIT = 'SLIDE_EDIT',
    ADD_ELEMENT = 'ADD_ELEMENT',

}
type MenuValues = {
    fontFamily?: FontFamily;
    fontSize: number;
    textColor?: Color;
    graphColor?: Color;
};

type Color = string;
type FontFamily = {
    fontFamily: string;
};
type Editor = {
    presentation: Presentation;
    history: Array<Presentation>;
    selectedSlides: Array<Id>;
    viewMode: ViewMode;
    selectMode: SelectModeTypes;
};

enum SelectModeTypes {
    Slides = "Slides",
    Elements = "Elements"
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
    action: () => void;
};

type ButtonWithActionListProps = {
    mainButton: ButtonProps;
    buttonList:
    {
        secondaryButton: ButtonProps;
        buttonList: ButtonProps[];
    }[];
};

export type {
    Slide,
    Presentation,
    Editor,
    ElementAnimation,
    ButtonWithActionListProps,
    ButtonProps,
    Id,
};
export { SelectModeTypes, ButtonType, BackgroundType, ViewMode, UserActions };
