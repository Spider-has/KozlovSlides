import {
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
   FuncGraphObject as FunctionGraphObject,
} from './types';

const spanMid: Span = {
   value: 'a',
   fontFamily: 'Times New Roman',
   fontSize: 12,
   color: 'black',
   bold: false,
   cursive: true,
   underline: false,
};

const spanMax: Span = {
   value: 'abobus',
   fontFamily: 'Arial',
   fontSize: 14,
   color: '#FFFFFF',
   bold: true,
   cursive: true,
   underline: true,
};

const strokeObjectMin: StrokeObject = {
   type: 'text',
   chars: [],
   rotateAngle: 0,
};

const strokeObjectMid: StrokeObject = {
   type: 'text',
   chars: [spanMid],
   rotateAngle: 0,
};

const strokeObjectMax: StrokeObject = {
   type: 'text',
   chars: [spanMid, spanMax],
   rotateAngle: 43.9,
   border: {
      color: '#FDE138',
      width: 10,
      type: 'solid',
   },
};
const ellipseObjectMin: EllipseObject = {
   type: 'ellipse',
   size: {
      width: 10,
      height: 10,
   },
   rounding: 0,
};
const rectangleObjectMid: RectangleObject = {
   type: 'rectangle',
   size: {
      width: 10,
      height: 10,
   },
   rounding: 0,
};
const triangleObjectMax: TriangleObject = {
   type: 'triangle',
   point1: {
      x: 1,
      y: 2,
   },
   point2: {
      x: 3,
      y: 2,
   },
   point3: {
      x: 3,
      y: 3,
   },
};
const graphicObjectMin: GraphicObject = {
   type: 'graphic',
   color: 'black',
   rotateAngle: 0,
   opacity: 1,
   figureData: ellipseObjectMin,
};
const graphicObjectMid: GraphicObject = {
   type: 'graphic',
   color: 'black',
   rotateAngle: 0,
   opacity: 1,
   figureData: rectangleObjectMid,
   textBlock: strokeObjectMid,
};

const graphicObjectMax: GraphicObject = {
   type: 'graphic',
   color: 'black',
   rotateAngle: 74.93,
   opacity: 0.38,
   figureData: triangleObjectMax,
   textBlock: strokeObjectMax,
   border: {
      color: '#FDE138',
      width: 10,
      type: 'solid',
   },
};

const videoObject: VideoObject = {
   type: 'video',
   size: {
      width: 10,
      height: 10,
   },
   videoUrl: 'https://www.youtube.com/watch?v=1GrOo3SccEY',
};

const slideElementMin: SlideElement = {
   id: '5',
   position: {
      x: 3,
      y: 3,
   },
   data: strokeObjectMin,
};

const slideElementMid: SlideElement = {
   id: '6',
   position: {
      x: 3,
      y: 3,
   },
   data: strokeObjectMid,
};

const slideElementMax: SlideElement = {
   id: '7',
   position: {
      x: 3,
      y: 3,
   },
   data: graphicObjectMax,
};

const slideMin: Slide = {
   id: '1',
   elements: [],
   selectedElements: [],
   elementsAnimations: [],
   background: {
      type: 'color',
      data: {
         color: 'white',
      },
   },
};

const slideMid: Slide = {
   id: '2',
   elements: [slideElementMid],
   transitionAnimation: {
      type: 'front rectangle rotate',
   },
   selectedElements: [],
   elementsAnimations: [],
   background: {
      type: 'color',
      data: {
         color: 'white',
      },
   },
};

const slideMax: Slide = {
   id: '4',
   elements: [slideElementMin, slideElementMid, slideElementMax],
   transitionAnimation: {
      type: 'front rectangle rotate',
   },
   selectedElements: ['5', '6'],
   elementsAnimations: [
      {
         type: 'rotate',
         id: '7',
      },
      {
         type: '-rotate',
         id: '5',
      },
   ],
   background: {
      type: 'image',
      data: {
         url: 'https://yandex-search.clstorage.net/hbzWt6992/5c9e41yB_/wvTu9tQPQh3pXFWiEElc9cE-R9_7z_LTd138A5XmV1kjFOP8k8HUhS1QNH7LiI3vlRGXjUgSW8IcbVnAizp8CpfMcqLcU_JtvbDkHvDFmFkd--NDV_rK93MYqS_l4o_0',
      },
   },
};

const presentationMin: Presentation = {
   slides: [],
   size: {
      width: 10,
      height: 10,
   },
   name: 'how to cook pork',
};

const presentationMid: Presentation = {
   slides: [slideMid],
   size: {
      width: 10,
      height: 10,
   },
   name: 'how to cook pork',
};

const presentationMax: Presentation = {
   slides: [slideMin, slideMid, slideMax],
   size: {
      width: 10,
      height: 10,
   },
   name: 'how to cook pork',
};

const editorMin: Editor = {
   presentation: presentationMin,
   history: [],
   selectedSlides: [],
   viewMode: 'view',
};

const editorMid: Editor = {
   presentation: presentationMid,
   history: [presentationMin],
   selectedSlides: ['4'],
   viewMode: 'view',
};

const editorMax: Editor = {
   presentation: presentationMax,
   history: [presentationMin, presentationMid],
   selectedSlides: ['4', '2'],
   viewMode: 'edit',
};

const asd = 0;
