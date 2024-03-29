interface DefaultSlideElement {
    id: Id;
    position: Point;
    size: Size;
    elementType: ObjectType;
    layer: number;
}

interface GraphicElements extends DefaultSlideElement {
    elementType: ObjectType.Graphic;
    figureType: FigureObjects;
    properties: GraphProperties;
}

interface GraphProperties {
    color?: Color;
    border?: Border;
    rotateAngle: number;
    opacity: number;
    textBlock?: TextObject;
}

interface RectanglePropreties extends GraphProperties {
    rounding: number;
}

interface TrianglePropreties extends GraphProperties {
    point1: Point;
    point2: Point;
    point3: Point;
}

interface EllipsePropreties extends GraphProperties {
    rounding: number;
}

interface RectangleElement extends GraphicElements {
    figureType: FigureObjects.Rectangle;
    properties: RectanglePropreties;
}

interface TriangleElement extends GraphicElements {
    figureType: FigureObjects.Triangle;
    properties: TrianglePropreties;
}

interface EllipseElement extends GraphicElements {
    figureType: FigureObjects.Ellipse;
    properties: EllipsePropreties;
}

interface ImageObject extends DefaultSlideElement {
    elementType: ObjectType.Image;
    properties: {
        imgUrl: string;
        rotateAngle: number;
    };
}

interface VideoObject extends DefaultSlideElement {
    elementType: ObjectType.Video;
    properties: {
        videoUrl: string;
        rotateAngle: number;
    };
}

interface AudioObject extends DefaultSlideElement {
    elementType: ObjectType.Audio;
    properties: {
        audioUrl: string;
    };
}

interface FunctionGraphObject extends DefaultSlideElement {
    elementType: ObjectType.FunctionGraph;
    properties: {
        func: string;
        rotateAngle: number;
        range: {
            from: number;
            to: number;
        };
        color?: Color;
    };
}

type Id = string;

enum AlignTypes {
    CENTER = 'center',
    RIGHT = 'right',
    LEFT = 'left',
    BY_WIDTH = 'justify',
}

type Span = {
    value: string;
    fontFamily?: FontFamily;
    fontSize: number;
    color?: Color;
    bold: boolean;
    cursive: boolean;
    underline: boolean;
    align: AlignTypes;
};

interface TextObject extends DefaultSlideElement {
    elementType: ObjectType.Text;
    properties: {
        chars: Span;
        rotateAngle: number;
        border?: Border;
    };
}

enum ObjectType {
    Text = 'Text',
    Graphic = 'Graphic',
    Image = 'Image',
    Video = 'Video',
    Audio = 'Audio',
    FunctionGraph = 'FunctionGraph',
}

type SlideElement =
    | RectangleElement
    | TriangleElement
    | EllipseElement
    | ImageObject
    | VideoObject
    | AudioObject
    | FunctionGraphObject
    | TextObject;

type Point = {
    x: number;
    y: number;
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

enum FigureObjects {
    Ellipse = 'Ellipse',
    Triangle = 'Triangle',
    Rectangle = 'Rectangle',
}

type Size = {
    width: number;
    height: number;
};

type Color = string;
type FontFamily = {
    fontFamily: string;
};

export type {
    VideoObject,
    ImageObject,
    TriangleElement,
    RectangleElement,
    SlideElement,
    Point,
    Size,
    EllipseElement,
    TextObject,
    Span,
    FontFamily,
    Color,
    FunctionGraphObject,
};
export { ObjectType, FigureObjects, AlignTypes };
