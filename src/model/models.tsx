
import * as ButtonIcons from '../components/button/icons/ButtonIcons';
import { EllipseElement, FigureObjects, ImageObject, ObjectType, RectangleElement, TextObject, TriangleElement } from './figureTypes';
import {
    ButtonType,
    ButtonWithActionListProps,
} from './types';


export const TextButtonList: ButtonWithActionListProps = {
    mainButton: {
        icon: <ButtonIcons.TextField></ButtonIcons.TextField>,
        type: ButtonType.Icon,
        action: () => { },
    },
    buttonList: []
};

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
            buttonList: []
        },
        {
            secondaryButton: {
                type: ButtonType.FullIcon,
                action: () => { },
                icon: <ButtonIcons.Download />,
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
                    text: 'Зачеркнутый',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.NotText />,
                },
                {
                    text: 'Надстрочный',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.LittleUp />,
                },
                {
                    text: 'Подстрочный',
                    type: ButtonType.FullIconText,
                    action: () => { },
                    icon: <ButtonIcons.LittleDown />,
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
            ]
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
                text: 'Маркеры и нумерация',
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
            ]
        },
        {
            secondaryButton: {
                text: 'Цвет',
                type: ButtonType.FullText,
                action: () => { },
            },
            buttonList: []
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
            buttonList: []
        },
        {
            secondaryButton: {
                type: ButtonType.FullIconText,
                text: 'Загрузить из интернета',
                action: () => { },
                icon: <ButtonIcons.Photo />,
            },
            buttonList: []
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
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Прямоугольник',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Rectangle />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Треугольник',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.Triangle />,
            },
            buttonList: []
        },
    ],
};
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
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Times New Roman',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.NoIcon />,
            },
            buttonList: []
        },
        {
            secondaryButton: {
                text: 'Roboto',
                type: ButtonType.FullIconText,
                action: () => { },
                icon: <ButtonIcons.NoIcon />,
            },
            buttonList: []
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
            ]
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
            ],
        }
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
        height: 150
    },
    elementType: ObjectType.Graphic,
    figureType: FigureObjects.Rectangle,
    properties: {
        rounding: 0,
        color: 'blue',
        rotateAngle: 0,
        opacity: 1,
    }
}

const defaultEllipseObject: EllipseElement = {
    id: '',
    position: {
        x: 0,
        y: 0,
    },
    size: {
        width: 150,
        height: 150
    },
    elementType: ObjectType.Graphic,
    figureType: FigureObjects.Ellipse,
    properties: {
        rounding: 0,
        color: 'blue',
        rotateAngle: 0,
        opacity: 1,
    }
}

const defaultTriangleObject: TriangleElement = {
    id: '',
    position: {
        x: 0,
        y: 0,
    },
    size: {
        width: 200,
        height: 150
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
    }
}

const defaultImageObject: ImageObject = {
    id: '',
    position: {
        x: 0,
        y: 0,
    },
    size: {
        width: 200,
        height: 150
    },
    elementType: ObjectType.Image,
    properties: {
        imgUrl: ""
    }
}

const defaultTextObject: TextObject = {
    id: '',
    position: {
        x: 0,
        y: 0,
    },
    size: {
        width: 100,
        height: 50
    },
    elementType: ObjectType.Text,
    properties: {
        chars: {
            value: "Hello, Ivan!",
            fontSize: 12,
            bold: false,
            cursive: false,
            underline: false,
        },
        rotateAngle: 0
    }
}


export { defaultEllipseObject, defaultRectangleObject, defaultTriangleObject, defaultImageObject, defaultTextObject }