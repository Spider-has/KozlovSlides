import * as ButtonIcons from '../components/button/ButtonIcons';
import {
    // Span,
    // StrokeObject,
    // GraphicObject,
    // EllipseObject,
    // RectangleObject,
    // TriangleObject,
    // Slide,
    // Presentation,
    // Editor,
    // ImageObject,
    // VideoObject,
    // AudioObject,
    // ElementAnimation,
    // SlideElement,
    // FuncGraphObject as FunctionGraphObject,
    ButtonWithActionListProps,
} from './types';

// const spanMid: Span = {
//     value: 'a',
//     fontFamily: {
//         fontFamily: 'Times New Roman',
//     },
//     fontSize: 12,
//     //color: 'black',
//     bold: false,
//     cursive: true,
//     underline: false,
// };

// const spanMax: Span = {
//     value: 'abobus',
//     // fontFamily: 'Arial',
//     fontSize: 14,
//     //  color: '#FFFFFF',
//     bold: true,
//     cursive: true,
//     underline: true,
// };

// const strokeObjectMin: StrokeObject = {
//     type: 'text',
//     chars: [],
//     rotateAngle: 0,
// };

// const strokeObjectMid: StrokeObject = {
//     type: 'text',
//     chars: [spanMid],
//     rotateAngle: 0,
// };

// const strokeObjectMax: StrokeObject = {
//     type: 'text',
//     chars: [spanMid, spanMax],
//     rotateAngle: 43.9,
//     border: {
//         //   color: '#FDE138',
//         width: 10,
//         type: 'solid',
//     },
// };
// const ellipseObjectMin: EllipseObject = {
//     type: 'ellipse',
//     size: {
//         width: 10,
//         height: 10,
//     },
//     rounding: 0,
// };
// const rectangleObjectMid: RectangleObject = {
//     type: 'rectangle',
//     size: {
//         width: 10,
//         height: 10,
//     },
//     rounding: 0,
// };
// const triangleObjectMax: TriangleObject = {
//     type: 'triangle',
//     point1: {
//         x: 1,
//         y: 2,
//     },
//     point2: {
//         x: 3,
//         y: 2,
//     },
//     point3: {
//         x: 3,
//         y: 3,
//     },
// };
// const graphicObjectMin: GraphicObject = {
//     type: 'graphic',
//     // color: 'black',
//     rotateAngle: 0,
//     opacity: 1,
//     figureData: ellipseObjectMin,
// };
// const graphicObjectMid: GraphicObject = {
//     type: 'graphic',
//     // color: 'black',
//     rotateAngle: 0,
//     opacity: 1,
//     figureData: rectangleObjectMid,
//     textBlock: strokeObjectMid,
// };

// const graphicObjectMax: GraphicObject = {
//     type: 'graphic',
//     // color: 'black',
//     rotateAngle: 74.93,
//     opacity: 0.38,
//     figureData: triangleObjectMax,
//     textBlock: strokeObjectMax,
//     border: {
//         // color: '#FDE138',
//         width: 10,
//         type: 'solid',
//     },
// };

// const videoObject: VideoObject = {
//     type: 'video',
//     size: {
//         width: 10,
//         height: 10,
//     },
//     videoUrl: 'https://www.youtube.com/watch?v=1GrOo3SccEY',
// };

// const slideElementMin: SlideElement = {
//     id: '5',
//     position: {
//         x: 3,
//         y: 3,
//     },
//     data: strokeObjectMin,
// };

// const slideElementMid: SlideElement = {
//     id: '6',
//     position: {
//         x: 3,
//         y: 3,
//     },
//     data: strokeObjectMid,
// };

// const slideElementMax: SlideElement = {
//     id: '7',
//     position: {
//         x: 3,
//         y: 3,
//     },
//     data: graphicObjectMax,
// };

// const slideMin: Slide = {
//     id: '1',
//     elements: [],
//     selectedElements: [],
//     elementsAnimations: [],
//     background: {
//         type: 'color',
//         data: {
//             //   color: 'white',
//         },
//     },
// };

// const slideMid: Slide = {
//     id: '2',
//     elements: [slideElementMid],
//     transitionAnimation: {
//         type: 'front rectangle rotate',
//     },
//     selectedElements: [],
//     elementsAnimations: [],
//     background: {
//         type: 'color',
//         data: {
//             //   color: 'white',
//         },
//     },
// };

// const slideMax: Slide = {
//     id: '4',
//     elements: [slideElementMin, slideElementMid, slideElementMax],
//     transitionAnimation: {
//         type: 'front rectangle rotate',
//     },
//     selectedElements: ['5', '6'],
//     elementsAnimations: [
//         {
//             type: 'rotate',
//             id: '7',
//         },
//         {
//             type: '-rotate',
//             id: '5',
//         },
//     ],
//     background: {
//         type: 'image',
//         data: {
//             url: 'https://yandex-search.clstorage.net/hbzWt6992/5c9e41yB_/wvTu9tQPQh3pXFWiEElc9cE-R9_7z_LTd138A5XmV1kjFOP8k8HUhS1QNH7LiI3vlRGXjUgSW8IcbVnAizp8CpfMcqLcU_JtvbDkHvDFmFkd--NDV_rK93MYqS_l4o_0',
//         },
//     },
// };

// const presentationMin: Presentation = {
//     slides: [],
//     size: {
//         width: 10,
//         height: 10,
//     },
//     name: 'how to cook pork',
// };

// const presentationMid: Presentation = {
//     slides: [slideMid],
//     size: {
//         width: 10,
//         height: 10,
//     },
//     name: 'how to cook pork',
// };

// const presentationMax: Presentation = {
//     slides: [slideMin, slideMid, slideMax],
//     size: {
//         width: 10,
//         height: 10,
//     },
//     name: 'how to cook pork',
// };

// const editorMin: Editor = {
//     presentation: presentationMin,
//     history: [],
//     selectedSlides: [],
//     viewMode: 'view',
// };

// const editorMid: Editor = {
//     presentation: presentationMid,
//     history: [presentationMin],
//     selectedSlides: ['4'],
//     viewMode: 'view',
// };

// const editorMax: Editor = {
//     presentation: presentationMax,
//     history: [presentationMin, presentationMid],
//     selectedSlides: ['4', '2'],
//     viewMode: 'edit',
// };

export const FileButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Файл',
        type: 'text',
        action: () => {},
    },
    buttonList: [
        {
            text: 'Создать',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Create />,
        },
        {
            text: 'Открыть',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Open />,
        },
        {
            text: 'Скачать',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Download />,
        },
        {
            text: 'Переименовать',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Rename />,
        },
        {
            text: 'Удалить',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Delete />,
        },
        {
            text: 'Предварительный просмотр',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Preview />,
        },
    ],
};

export const FormatButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Формат',
        type: 'text',
        action: () => {},
    },
    buttonList: [
        {
            text: 'Текст',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Text />,
        },
        {
            text: 'Выравнивание и отступы',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Leveling />,
        },
        {
            text: 'Интервалы между абзацами или строками',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Intervals />,
        },
        {
            text: 'Маркеры и нумерация',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Numbering />,
        },
        {
            text: 'Изображение',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Photo />,
        },
        {
            text: 'Границы и линии',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Line />,
        },
    ],
};

export const SlideButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Слайд',
        type: 'text',
        action: () => {},
    },
    buttonList: [
        {
            text: 'Новый слайд',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.NewSlide />,
        },
        {
            text: 'Дублировать слайд',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Duplication />,
        },
        {
            text: 'Удалить слайд',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Delete />,
        },
        {
            text: 'Пропустить слайд',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Skip />,
        },
        {
            text: 'Переместить слайд',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Move />,
        },
        {
            text: 'Изменить фон',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.ChangeBg />,
        },
        {
            text: 'Выбрать макет',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.ChooseLayout />,
        },
    ],
};

export const ObjectButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Объект',
        type: 'text',
        action: () => {},
    },
    buttonList: [
        {
            text: 'Переместить',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Move />,
        },
        {
            text: 'Центрировать на странице',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Center />,
        },
        {
            text: 'Повернуть',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Rotate />,
        },
        {
            text: 'Сгруппировать',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Group />,
        },
        {
            text: 'Отменить группировку',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.GroupCancel />,
        },
    ],
};

export const EditButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Правка',
        type: 'text',
        action: () => {},
    },
    buttonList: [
        {
            text: 'Отменить',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Undo />,
        },
        {
            text: 'Повторить',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Redo />,
        },
        {
            text: 'Вырезать',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Cut />,
        },
        {
            text: 'Копировать',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Copy />,
        },
        {
            text: 'Вставить',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Insert />,
        },
        {
            text: 'Выбрать все',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.SelectAll />,
        },
        {
            text: 'Удалить',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Delete />,
        },
        {
            text: 'Создать копию',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Copy />,
        },
    ],
};

export const InsertionButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Вставка',
        type: 'text',
        action: () => {},
    },
    buttonList: [
        {
            text: 'Изображение',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Photo />,
        },
        {
            text: 'Текстовое поле',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.TextField />,
        },
        {
            text: 'Аудио',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Audio />,
        },
        {
            text: 'Видео',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Video />,
        },
        {
            text: 'Фигура',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Figure />,
        },
        {
            text: 'График',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Diagram />,
        },
        {
            text: 'Линия',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.Line />,
        },
        {
            text: 'Новый слайд',
            type: 'icon-text',
            action: () => {},
            icon: <ButtonIcons.NewSlide />,
        },
    ],
};
