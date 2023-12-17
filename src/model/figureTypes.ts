interface DefaultSlideElement {
    id: Id;
    position: Point;
    elementType: ObjectType;
}

interface GraphicElements extends DefaultSlideElement {
    color?: Color;
    border?: Border;
    rotateAngle: number;
    opacity: number;
    textBlock?: StrokeObject;
}

interface RectangleElement extends GraphicElements {
    type: FigureObjects.Rectangle;
    rounding: number;
    size: Size;
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

// interface GraphicObject {
//     type: FigureObjects;
//     color?: Color;
//     border?: Border;
//     rotateAngle: number;
//     opacity: number;
//     figureData: EllipseObject | TriangleObject | RectangleObject;
//     textBlock?: StrokeObject;
// }

// type EllipseObject = {
//     type: FigureObjects.Ellipse;
//     size: Size;
//     rounding: number;
// };

// type TriangleObject = {
//     type: FigureObjects.Triangle;
//     point1: Point;
//     point2: Point;
//     point3: Point;
// };

type Point = {
    x: number;
    y: number;
};

// type RectangleObject = {
//     type: FigureObjects.Rectangle;
//     rounding: number;
//     size: Size;
// };

// type ImageObject = {
//     type: ObjectType;
//     size: Size;
//     imgUrl: string;
// };

// type VideoObject = {
//     type: ObjectType;
//     size: Size;
//     videoUrl: string;
// };

// type AudioObject = {
//     type: ObjectType;
//     size: Size;
//     audioUrl: string;
// };

// type FunctionGraphObject = {
//     type: ObjectType;
//     size: Size;
//     func: string;
// };

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
export type { RectangleElement };
