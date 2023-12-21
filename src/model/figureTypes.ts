interface DefaultSlideElement {
    id: Id;
    position: Point;
    elementType: ObjectType;
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
    textBlock?: StrokeObject;
}

interface RectanglePropreties extends GraphProperties {
    rounding: number;
    size: Size;
}

interface TrianglePropreties extends GraphProperties {
    point1: Point;
    point2: Point;
    point3: Point;
}

interface EllipsePropreties extends GraphProperties {
    size: Size;
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
        size: Size;
        imgUrl: string;
    };
}

interface VideoObject extends DefaultSlideElement {
    elementType: ObjectType.Video;
    properties: {
        size: Size;
        videoUrl: string;
    };
}

interface AudioObject extends DefaultSlideElement {
    elementType: ObjectType.Audio;
    properties: {
        size: Size;
        audioUrl: string;
    };
}

interface FunctionGraphObject extends DefaultSlideElement {
    elementType: ObjectType.FunctionGraph;
    properties: {
        size: Size;
        func: string;
    };
}

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

interface StrokeObject extends DefaultSlideElement {
    elementType: ObjectType.Text;
    properties: {
        chars: Array<Span>;
        rotateAngle: number;
        border?: Border;
    };
}

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

type SlideElement =
    | RectangleElement
    | TriangleElement
    | EllipseElement
    | ImageObject
    | VideoObject
    | AudioObject
    | FunctionGraphObject
    | StrokeObject;

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
    Ellipse,
    Triangle,
    Rectangle,
}

type Size = {
    width: number;
    height: number;
};

type Color = string;
type FontFamily = {
    fontFamily: string;
};
export type { RectangleElement, SlideElement, Point };
export { ObjectType, FigureObjects };
