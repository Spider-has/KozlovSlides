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
enum ObjectType {
    Text,
    Graphic,
    Triangle,
    Ellipse,
    Image,
    Video,
    Audio,
    FunctionGraph,
}
type StrokeObject = {
    type: ObjectType;
    chars: Array<Span>;
    rotateAngle: number;
    border?: Border;
};

interface GraphicObject {
    type: FigureObjects;
    color?: Color;
    border?: Border;
    rotateAngle: number;
    opacity: number;
    figureData: EllipseObject | TriangleObject | RectangleObject;
    textBlock?: StrokeObject;
}

type EllipseObject = {
    type: FigureObjects.Ellipse;
    size: Size;
    rounding: number;
};

type TriangleObject = {
    type: FigureObjects.Triangle;
    point1: Point;
    point2: Point;
    point3: Point;
};

type Point = {
    x: number;
    y: number;
};

type RectangleObject = {
    type: FigureObjects.Rectangle;
    rounding: number;
    size: Size;
};

type ImageObject = {
    type: ObjectType;
    size: Size;
    imgUrl: string;
};

type VideoObject = {
    type: ObjectType;
    size: Size;
    videoUrl: string;
};

type AudioObject = {
    type: ObjectType;
    size: Size;
    audioUrl: string;
};

type FunctionGraphObject = {
    type: ObjectType;
    size: Size;
    func: string;
};

enum BorderType {
    Solid,
    Dashed,
}

type Border = {
    color?: Color;
    width: number;
    type: BorderType;
};

interface SlideElement {
    id: Id;
    position: Point;
    type: ObjectType;
    data:
        | StrokeObject
        | GraphicObject
        | ImageObject
        | VideoObject
        | AudioObject
        | FunctionGraphObject;
}
enum FigureObjects {
    Ellipse,
    Triangle,
    Rectangle,
}

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
};
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
    selectMode?: 'slides' | 'elements';
    //shiftMode: boolean;
};
enum ViewMode {
    Edit,
    View,
}
enum ButtonType {
    Text,
    IconText,
    Icon,
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
    Id,
};
export { ButtonType, BackgroundType, ViewMode, ObjectType, FigureObjects };
