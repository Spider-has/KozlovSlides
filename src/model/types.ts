type Id = string;

type Span = {
    value: string;
    fontFamily?: FontFamily;
    fontSize: number;
    color?: Color;
    bold: boolean;
    cursive: boolean;
    underline: boolean;
};

type StrokeObject = {
    type: 'text'; // вынести в enum
    chars: Array<Span>;
    rotateAngle: number;
    border?: Border;
};

type GraphicObject = {
    type: 'graphic';
    color?: Color;
    border?: Border;
    rotateAngle: number;
    opacity: number;
    figureData: EllipseObject | TriangleObject | RectangleObject; // вынести в enum
    textBlock?: StrokeObject;
};

type EllipseObject = {
    type: 'ellipse'; // вынести в enum
    size: Size;
    rounding: number;
};

type TriangleObject = {
    type: 'triangle'; // вынести в enum
    point1: Point;
    point2: Point;
    point3: Point;
};

type Point = {
    x: number;
    y: number;
};

type RectangleObject = {
    type: 'rectangle'; // вынести в enum
    rounding: number;
    size: Size;
};

type ImageObject = {
    type: 'image'; // вынести в enum
    size: Size;
    imgUrl: string;
};

type VideoObject = {
    type: 'video'; // вынести в enum
    size: Size;
    videoUrl: string;
};

type AudioObject = {
    type: 'audio'; // вынести в enum
    size: Size;
    audioUrl: string;
};

type FunctionGraphObject = {
    type: 'functionGraph'; // вынести в enum
    size: Size;
    func: string;
};

type Border = {
    color?: Color;
    width: number;
    type: 'solid' | 'dashed'; // вынести в enum
};

type SlideElement = {
    id: Id;
    position: Point;
    data:
        | StrokeObject
        | GraphicObject
        | ImageObject
        | VideoObject
        | AudioObject
        | FunctionGraphObject; // вынести в enum
};

type SlideTransion = {
    type: string;
};

type ElementAnimation = {
    type: string;
    id: Id;
};

type SlideBackground = {
    type: 'image' | 'color'; // вынести в enum
    data: backgroundImg | backgroundColor;
};

type backgroundImg = {
    url: string;
};

type backgroundColor = {
    color?: Color;
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
};
type MenuValues = {
    fontFamily?: FontFamily;
    fontSize: number;
    textColor?: Color;
    graphColor?: Color;
};

type Color = {
    color: string;
};
type FontFamily = {
    fontFamily: string;
};
type Editor = {
    presentation: Presentation;
    history: Array<Presentation>;
    selectedSlides: Array<Id>;
    viewMode: 'edit' | 'view'; // вынести в enum
};

type ButtonProps = {
    text: string;
    type: 'text' | 'icon-text' | 'icon'; // вынести в enum
    icon?: JSX.Element | null;
    iconSize?: number;
    action: (event) => void;
};

type ButtonWithActionListProps = {
    mainButton: ButtonProps;
    buttonList: ButtonProps[];
};

export type {
    Span,
    StrokeObject,
    GraphicObject,
    EllipseObject,
    RectangleObject,
    TriangleObject,
    Slide,
    Presentation,
    Editor,
    ImageObject,
    VideoObject,
    AudioObject,
    ElementAnimation,
    SlideElement,
    FunctionGraphObject as FuncGraphObject,
    ButtonWithActionListProps,
    ButtonProps,
};
