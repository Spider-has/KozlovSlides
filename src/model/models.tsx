import * as ButtonIcons from '../components/buttons/icons/ButtonIcons';
import {
    AlignTypes,
    EllipseElement,
    FigureObjects,
    FunctionGraphObject,
    ImageObject,
    ObjectType,
    RectangleElement,
    TextObject,
    TriangleElement,
} from './figureTypes';
import { ButtonProps, ButtonType, ButtonWithActionListProps } from './types';

export const TextButton: ButtonProps = {
    icon: <ButtonIcons.TextField></ButtonIcons.TextField>,
    type: ButtonType.Icon,
    action: () => { },
};
export const InputButton: ButtonProps = {
    icon: <ButtonIcons.NewSlide></ButtonIcons.NewSlide>,
    type: ButtonType.Icon,
    action: () => { },
};
export const colorList = [
    [
        'IndianRedLightCoral',
        'Salmon',
        'DarkSalmon',
        'Crimson',
        'FireBrick',
        'DarkRed',
        'Pink',
        'LightPink',
        'HotPink',
        'DeepPink',
        'MediumVioletRed',
        'PaleVioletRed',
        'LightSalmon',
        'Coral',
        'Tomato',
        'OrangeRed',
        'DarkOrange',
        'Orange',
        'Gold',
        'LightYellow',
        'LemonChiffon',
        'LightGoldenrodYellow',
        'PapayaWhip',
        'Moccasin',
        'PeachPuff',
        'PaleGoldenrod',
        'Khaki',
        'DarkKhaki',
        'Lavender',
        'Thistle',
        'Plum',
        'Violet',
        'Orchid',
        'Magenta',
        'MediumOrchid',
        'MediumPurple',
        'BlueViolet',
        'DarkViolet',
        'DarkOrchid',
        'DarkMagenta',
        'Indigo',
        'SlateBlue',
        'DarkSlateBlue',
        'Cornsilk',
        'BlanchedAlmond',
        'Bisque',
        'NavajoWhite',
        'Wheat',
        'BurlyWood',
        'Tan',
        'RosyBrown',
        'SandyBrown',
        'Goldenrod',
        'DarkGoldenRod',
        'Peru',
        'Chocolate',
        'SaddleBrown',
        'Sienna',
        'Brown',
        'Gray',
        'Silver',
        'Fuchsia',
        'Purple',
        'Red',
        'Maroon',
        'Yellow',
        'Lime',
        'AquaTeal',
        'Blue',
        'GreenYellow',
        'Chartreuse',
        'LawnGreen',
        'LimeGreen',
        'PaleGreen',
        'LightGreen',
        'MediumSpringGreen',
        'SpringGreen',
        'MediumSeaGreen',
        'SeaGreen',
        'ForestGreen',
        'Green',
        'DarkGreen',
        'YellowGreen',
        'OliveDrab',
        'Olive',
        'DarkOliveGreen',
        'MediumAquamarine',
        'DarkSeaGreen',
        'LightSeaGreen',
        'DarkCyan',
        'Teal',
        'Aqua',
        'Cyan',
        'LightCyan',
        'PaleTurquoise',
        'Aquamarine',
        'Turquoise',
        'MediumTurquoise',
        'DarkTurquoise',
        'CadetBlue',
        'SteelBlue',
        'LightSteelBlue',
        'PowderBlue',
        'LightBlue',
        'SkyBlue',
        'LightSkyBlue',
        'DeepSkyBlue',
        'DodgerBlue',
        'CornflowerBlue',
        'MediumSlateBlue',
        'RoyalBlue',
        'MediumBlue',
        'DarkBlue',
        'Navy',
        'MidnightBlue',
        'White',
        'Snow',
        'Honeydew',
        'MintCream',
        'Azure',
        'AliceBlue',
        'GhostWhite',
        'WhiteSmoke',
        'Gainsboro',
        'LightGrey',
        'DarkGray',
        'Grey',
        'DimGray',
        'LightSlateGray',
        'SlateGray',
        'DarkSlateGray',
        'Black',
    ],
];
export const FileButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Файл',
        type: ButtonType.Text,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                type: ButtonType.FullIcon,
                action: () => { },
                icon: <ButtonIcons.Open />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                type: ButtonType.FullIcon,
                action: () => { },
                icon: <ButtonIcons.Download />,
            },
            buttonList: [],
        },
    ],
};

export const FormatButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Формат',
        type: ButtonType.Text,
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
            buttonList: [
                {
                    text: 'Полужирный',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.Text />,
                },
                {
                    text: 'Курсив',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.Italic />,
                },
                {
                    text: 'Подчеркнутый',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.Underlined />,
                },
                {
                    text: 'Увеличить размер',
                    type: ButtonType.FullText,
                    action: () => { },
                },
                {
                    text: 'Уменьшить размер',
                    type: ButtonType.FullText,
                    action: () => { },
                },
            ],
        },
        {
            secondaryButton: {
                text: 'Выравнивание',
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
            ],
        },
        {
            secondaryButton: {
                text: 'Нумерация',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Numbering />,
            },
            buttonList: [
                {
                    text: 'Нумерованный список',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.NumList />,
                },
                {
                    text: 'Маркерованный список',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.MarkList />,
                },
            ],
        },
        {
            secondaryButton: {
                text: 'Цвет',
                type: ButtonType.FullText,
                action: () => { },
            },
            buttonList: [],
        },
    ],
};

export const SlideButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Слайд',
        type: ButtonType.Text,
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
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Дублировать слайд',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Duplication />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Удалить слайд',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Delete />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Изменить фон',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.ChangeBg />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: '',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Photo />,
            },
            buttonList: [],
        },
    ],
};
export const ImageButtonList: ButtonWithActionListProps = {
    mainButton: {
        type: ButtonType.Icon,
        icon: <ButtonIcons.Photo />,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                type: ButtonType.FullIcon,
                action: () => { },
                icon: <ButtonIcons.Uploader />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                type: ButtonType.FullIconText,
                text: 'Загрузить из интернета',
                action: () => { },
                icon: <ButtonIcons.Photo />,
            },
            buttonList: [],
        },
    ],
};
export const FigureButtonList: ButtonWithActionListProps = {
    mainButton: {
        type: ButtonType.Icon,
        icon: <ButtonIcons.Figure></ButtonIcons.Figure>,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                text: 'Круг',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Circle />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Прямоугольник',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Rectangle />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Треугольник',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Triangle />,
            },
            buttonList: [],
        },
    ],
};

export const GraphOpenMenu: ButtonWithActionListProps = {
    mainButton: {
        type: ButtonType.Icon,
        text: 'Arial',
        icon: <ButtonIcons.Diagram />,
        action: () => { },
    },
    buttonList: [{
        secondaryButton: {
            text: "",
            type: ButtonType.FullIconText,
            action: () => { },
            icon: <ButtonIcons.SelectedFont />,
        }, buttonList: []
    }]
}

export const TextFamilyList: ButtonWithActionListProps = {
    mainButton: {
        type: ButtonType.IconText,
        text: 'Arial',
        icon: <ButtonIcons.ArrowThatOpensTheListVertical />,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                text: 'Arial',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.SelectedFont />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Times New Roman',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.NoIcon />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Roboto',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.NoIcon />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Pacifico',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.NoIcon />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Montserrat',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.NoIcon />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Open Sans',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.NoIcon />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Oswald',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.NoIcon />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Press Start 2P',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.NoIcon />,
            },
            buttonList: [],
        },
    ],
    right: true,
};
export const ObjectButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Объект',
        type: ButtonType.Text,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                text: 'Переместить на передний план',
                type: ButtonType.FullText,
                action: () => { },
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Переместить на задний план',
                type: ButtonType.FullText,
                action: () => { },
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Переместить вперед',
                type: ButtonType.FullText,
                action: () => { },
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Переместить назад',
                type: ButtonType.FullText,
                action: () => { },
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Цвет',
                type: ButtonType.FullText,
                action: () => { },
            },
            buttonList: [],
        },
    ],
};

export const EditButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Правка',
        type: ButtonType.Text,
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
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Повторить',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Redo />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Вырезать',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Cut />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Копировать',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Copy />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Вставить',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Insert />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Выбрать все',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.SelectAll />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Удалить',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Delete />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Создать копию',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Copy />,
            },
            buttonList: [],
        },
    ],
};

export const InsertionButtonList: ButtonWithActionListProps = {
    mainButton: {
        text: 'Вставка',
        type: ButtonType.Text,
        action: () => { },
    },
    buttonList: [
        {
            secondaryButton: {
                type: ButtonType.FullIconText,
                action: () => { },
                text: 'Изображение',
                icon: <ButtonIcons.Photo />,
            },
            buttonList: [
                {
                    type: ButtonType.FullIcon,
                    action: () => { },
                    icon: <ButtonIcons.Uploader />,
                },
                {
                    type: ButtonType.FullIconText,
                    text: 'Загрузить из интернета',
                    action: () => { },
                    icon: <ButtonIcons.Photo />,
                },
            ],
        },
        {
            secondaryButton: {
                text: 'Текстовое поле',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.TextField />,
            },
            buttonList: [],
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
            ],
        },
        {
            secondaryButton: {
                text: 'График',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Diagram />,
            },
            buttonList: [],
        },
        {
            secondaryButton: {
                text: 'Линия',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Line />,
            },
            buttonList: [],
        },
    ],
};

const defaultRectangleObject: RectangleElement = {
    id: '',
    position: {
        x: 0,
        y: 0,
    },
    size: {
        width: 200,
        height: 150,
    },
    elementType: ObjectType.Graphic,
    figureType: FigureObjects.Rectangle,
    properties: {
        rounding: 0,
        color: 'blue',
        rotateAngle: 0,
        opacity: 1,
    },
    layer: 1,
};

const defaultEllipseObject: EllipseElement = {
    id: '',
    position: {
        x: 0,
        y: 0,
    },
    size: {
        width: 150,
        height: 150,
    },
    layer: 1,
    elementType: ObjectType.Graphic,
    figureType: FigureObjects.Ellipse,
    properties: {
        rounding: 0,
        color: 'blue',
        rotateAngle: 0,
        opacity: 1,
    },
};

const defaultTriangleObject: TriangleElement = {
    id: '',
    layer: 1,
    position: {
        x: 0,
        y: 0,
    },
    size: {
        width: 200,
        height: 150,
    },
    elementType: ObjectType.Graphic,
    figureType: FigureObjects.Triangle,
    properties: {
        point1: { x: 0, y: 100 },
        point2: { x: 100, y: 100 },
        point3: { x: 50, y: 0 },
        color: 'blue',
        rotateAngle: 0,
        opacity: 1,
    },
};

const defaultImageObject: ImageObject = {
    id: '',
    position: {
        x: 0,
        y: 0,
    },
    layer: 1,
    size: {
        width: 200,
        height: 150,
    },
    elementType: ObjectType.Image,
    properties: {
        imgUrl: '',
        rotateAngle: 0,
    },
};

const defaultTextObject: TextObject = {
    id: '',
    position: {
        x: 0,
        y: 0,
    },
    layer: 1,
    size: {
        width: 100,
        height: 50,
    },
    elementType: ObjectType.Text,
    properties: {
        chars: {
            value: 'Hello, Ivan!',
            fontSize: 12,
            bold: false,
            cursive: false,
            underline: false,
            align: AlignTypes.LEFT,
        },
        rotateAngle: 0,
    },
};

const defaultFuncObject: FunctionGraphObject = {
    id: '',
    position: {
        x: 0,
        y: 0,
    },
    layer: 1,
    size: {
        width: 100,
        height: 50,
    },
    elementType: ObjectType.FunctionGraph,
    properties: {
        func: '',
        rotateAngle: 0,
        range: {
            from: 100,
            to: 100
        },
        color: 'blue',
    },
};

export {
    defaultEllipseObject,
    defaultRectangleObject,
    defaultTriangleObject,
    defaultImageObject,
    defaultTextObject,
    defaultFuncObject
};
