import * as ButtonIcons from '../components/button/icons/ButtonIcons';
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
<<<<<<< Updated upstream
//     type: 'text',
=======
//     type: ButtonType.FullText,
>>>>>>> Stashed changes
//     chars: [],
//     rotateAngle: 0,
// };

// const strokeObjectMid: StrokeObject = {
<<<<<<< Updated upstream
//     type: 'text',
=======
//     type: ButtonType.FullText,
>>>>>>> Stashed changes
//     chars: [spanMid],
//     rotateAngle: 0,
// };

// const strokeObjectMax: StrokeObject = {
<<<<<<< Updated upstream
//     type: 'text',
=======
//     type: ButtonType.FullText,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
        type: ButtonType.FullText,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                text: 'Создать',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Create />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Открыть',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Open />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Скачать',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Download />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Переименовать',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Rename />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Удалить',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Delete />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Предварительный просмотр',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Preview />,
            },
            buttonList: []
>>>>>>> Stashed changes
        },
    ],
};

export const FormatButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Формат',
<<<<<<< Updated upstream
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
=======
        type: ButtonType.FullText,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                text: 'Текст',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Text />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Выравнивание и отступы',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Leveling />,
            },
            buttonList: [
                {
                    text: 'По левому краю',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.TextLeft />,
                },
                {
                    text: 'По центру',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.TextCenterX />,
                },
                {
                    text: 'По правому краю',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.TextRight />,
                },
                {
                    text: 'По ширине',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.TextWidth />,
                },
                {
                    text: 'Увеличить отступ',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.MoreTab />,
                },
                {
                    text: 'Уменьшить отступ',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.LessTab />,
                },
                {
                    text: 'По верхнему краю',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.TextUp />,
                },
                {
                    text: 'По центру',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.TextCenterY />,
                },
                {
                    text: 'По нижнему краю',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.TextDown />,
                },
            ]
        },
        {
            secondaryButton: {
                text: 'Интервалы между абзацами или строками',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Intervals />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Маркеры и нумерация',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Numbering />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Изображение',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Photo />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Границы и линии',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Line />,
            },
            buttonList: []
>>>>>>> Stashed changes
        },
    ],
};

export const SlideButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Слайд',
<<<<<<< Updated upstream
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
=======
        type: ButtonType.FullText,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                text: 'Новый слайд',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.NewSlide />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Дублировать слайд',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Duplication />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Удалить слайд',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Delete />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Пропустить слайд',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Skip />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Переместить слайд',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Move />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Изменить фон',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.ChangeBg />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Выбрать макет',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.ChooseLayout />,
            },
            buttonList: []
>>>>>>> Stashed changes
        },
    ],
};

export const ObjectButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Объект',
<<<<<<< Updated upstream
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
=======
        type: ButtonType.FullText,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                text: 'Переместить',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Remove />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Центрировать на странице',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Center />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Повернуть',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Rotate />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Сгруппировать',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Group />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Отменить группировку',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.GroupCancel />,
            },
            buttonList: []
>>>>>>> Stashed changes
        },
    ],
};

export const EditButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Правка',
<<<<<<< Updated upstream
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
=======
        type: ButtonType.FullText,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                text: 'Отменить',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Undo />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Повторить',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Redo />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Вырезать',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Cut />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Копировать',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Copy />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Вставить',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Insert />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Выбрать все',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.SelectAll />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Удалить',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Delete />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Создать копию',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Copy />,
            },
            buttonList: []
>>>>>>> Stashed changes
        },
    ],
};

export const InsertionButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Вставка',
<<<<<<< Updated upstream
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
=======
        type: ButtonType.FullText,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                text: 'Изображение',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Photo />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Текстовое поле',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.TextField />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Аудио',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Audio />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Видео',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Video />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Фигура',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Figure />,
            },
            buttonList: [
                {
                    text: 'Круг',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.Circle />,
                },
                {
                    text: 'Прямоугольник',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.Rectangle />,
                },
                {
                    text: 'Треугольник',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.Triangle />,
                },
            ]
        },
        {
            secondaryButton: {
                text: 'График',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Diagram />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Линия',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Line />,
            },
            buttonList: [
                {
                    text: 'Линия',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.Line />,
                },
                {
                    text: 'Стрелка',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.Arrow />,
                },
                {
                    text: 'Ломаная линия',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.Broken />,
                },
                {
                    text: 'Рисованная линия',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.Draw />,
                },
            ]
        },
        {
            secondaryButton: {
                text: 'Новый слайд',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.NewSlide />,
            },
            buttonList: []
>>>>>>> Stashed changes
        },
    ],
};
