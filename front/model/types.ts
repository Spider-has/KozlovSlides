type Id = string;

type Span = {
    value: string,
    fontFamily: string,
    fontSize: number,
    color: string,
    bold: boolean,
    cursive: boolean,
    underline: boolean,
}

type StrokeObject = {
    type: "text",
    chars: Array<Span>,
    rotateAngle: number,
    border: Border
}

type GraphicObject = {
    type: "graphic",
    color: string,
    border: Border,
    rotateAngle: number,
    opacity: number,
    figureType: EllipseObject | TriangleObject | RectangleObject,
    textBlock?: StrokeObject 
}

type EllipseObject = {
    type: "ellipse",
    size: Size,
    rounding: number
}

type TriangleObject = {
    type: "triangle",
    point1: Point,
    point2: Point,
    point3: Point,
}
type Point = {
    x: number,
    y: number
}
type RectangleObject = {
    type: "rectangle",
    rounding: number,
    size: Size,
}

type ImageObject = {
    type: "image",
    size: Size,
    imgUrl: string,
}


type VideoObject = {
    type: "video",
    size: Size,
    videoUrl: string,
}

type AudioObject = {
    type: "audio",
    size: Size,
    audioUrl: string,
}

type FuncGraphObject = {
    type: "functionGraph",
    size: Size,
}

type Border = {
    color: string,
    width: number,
    type: 'solid' | 'dashed'
}


type SlideElement = {
    id: Id,
    position: Point,
    type: StrokeObject | GraphicObject | ImageObject | VideoObject | AudioObject | FuncGraphObject
}

type SlideTransion = {
    type: string
}

type ElementAnimation = {
    type: string,
    id: Id
}

type SlideBackground = {
    type: "image" | "color",
    data: backgroundImg | backgroundColor,
}

type backgroundImg = {
    url: string
}

type backgroundColor = {
    color: string
}

type Slide = {
    id: Id,
    elements: Array<SlideElement>,
    transitionAnimation: SlideTransion,
    selectedElements: Array<Id>,
    elementsAnimations: Array<ElementAnimation>,
    background: SlideBackground,
}

type Size = {
    width: number,
    height: number,
}

type Presentation = {
    slides: Array<Slide>,
    size: Size,
    name: string   
}

type Editor = {
    presentation: Presentation,
    history: Array<Presentation>,
    selectedSlides: Array<Id>,
    viewMode: 'edit' | 'view'
}