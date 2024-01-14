import { useEffect, useRef, useState } from 'react';
import { Button } from '../button/Button';
import { ButtonType, ButtonWithActionListProps } from '../../model/types';
import {
    EditButtonList,
    FigureButtonList,
    FileButtonList,
    FormatButtonList,
    ImageButtonList,
    InsertionButtonList,
    ObjectButtonList,
    SlideButtonList,
    TextButtonList,
    TextFamilyList,
} from '../../model/models';
import * as ButtonIcon from '../button/icons/ButtonIcons';
import { Logo } from '../../logo';
import { useAppActions, useAppSelector } from '../../store/hooks';
import styles from './PresentationSettingsBar.module.css';
import { FigureObjects, ObjectType } from '../../model/figureTypes';
import { useClickOut } from '../../model/hooks';
import { checkPresentationFileType } from '../../model/utils';

const InputText = () => {
    const [name, setName] = useState('Презентация без названия');
    const inputRef = useRef<HTMLInputElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.addEventListener('keydown', enterDownHandler);
            document.addEventListener('click', closeOnClick);
            inputRef.current.classList.add(styles.inputTextInputActive);
            inputRef.current.focus();
        }
    };

    const enterDownHandler = (event: { code: string }) => {
        if (event.code == 'Enter') {
            if (inputRef.current) {
                inputRef.current.classList.remove(styles.inputTextInputActive);
                inputRef.current.blur();
                if (inputRef.current.value.length) {
                    setName(inputRef.current.value);
                } else {
                    setName('Презентация без названия');
                }
                inputRef.current.removeEventListener('keydown', enterDownHandler);
            }
        }
    };

    const changeInputWidth = () => {
        if (inputRef.current && spanRef.current) {
            console.log(spanRef.current.offsetWidth);
            inputRef.current.style.width = spanRef.current.offsetWidth + 7 + 'px';
            console.log(inputRef.current.style.width);
            setName(inputRef.current.value);
        }
    };

    const closeOnClick = (event: MouseEvent) => {
        const tar = event.target as HTMLElement;
        if (
            inputRef.current?.classList.contains(styles.inputTextInputActive) &&
            !(inputRef.current?.contains(tar) || spanRef.current?.contains(tar)) &&
            inputRef.current
        ) {
            inputRef.current.classList.remove(styles.inputTextInputActive);
            inputRef.current.blur();
            document.removeEventListener('click', closeOnClick);
        }
    };

    useEffect(() => {
        console.log('Привет, Иван!');
    }, []);
    return (
        <div className={styles.inputText}>
            <span onClick={handleClick} className={styles.inputTextText} ref={spanRef}>
                {name}
            </span>
            <input
                className={styles.inputTextInput}
                type="text"
                ref={inputRef}
                placeholder={name}
                onChange={changeInputWidth}
            />
        </div>
    );
};

const ButtonWithActionList = (props: ButtonWithActionListProps) => {
    const [visible, setVisible] = useState(false);
    const ButtonListBar = useRef<HTMLDivElement>(null);
    const [visible2, setVisible2] = useState(false);
    const ButtonListBar2 = useRef<HTMLDivElement>(null);
    const [visible3, setVisible3] = useState(false);
    const ButtonListBar3 = useRef<HTMLDivElement>(null);
    const [visible4, setVisible4] = useState(false);
    const ButtonListBar4 = useRef<HTMLDivElement>(null);
    const { mainButton, buttonList } = props;
    switch (mainButton.text) {
        case 'Вставка':
            buttonList.forEach(element => {
                switch (element.secondaryButton.text) {
                    case 'Фигура':
                        element.secondaryButton.action = () => {
                            setVisible2(!visible2);
                        };

                        useClickOut(
                            () => {
                                setVisible2(!visible2);
                            },
                            visible2,
                            ButtonListBar2,
                        );
                        break;
                    case 'Изображение':
                        element.secondaryButton.action = () => {
                            setVisible3(!visible3);
                        };

                        useClickOut(
                            () => {
                                setVisible3(!visible3);
                            },
                            visible3,
                            ButtonListBar3,
                        );
                        break;
                }
            });
            break;
        case 'Формат':
            buttonList.forEach(element => {
                switch (element.secondaryButton.text) {
                    case 'Текст':
                        element.secondaryButton.action = () => {
                            setVisible2(!visible2);
                        };

                        useClickOut(
                            () => {
                                setVisible2(!visible2);
                            },
                            visible2,
                            ButtonListBar2,
                        );
                        break;
                    case 'Выравнивание и отступы':
                        element.secondaryButton.action = () => {
                            setVisible3(!visible3);
                        };

                        useClickOut(
                            () => {
                                setVisible3(!visible3);
                            },
                            visible3,
                            ButtonListBar3,
                        );
                        break;
                    case 'Маркеры и нумерация':
                        element.secondaryButton.action = () => {
                            setVisible4(!visible4);
                        };
                        useClickOut(
                            () => {
                                setVisible4(!visible4);
                            },
                            visible4,
                            ButtonListBar4,
                        );
                        break;
                }
            });
            break;
    }

    mainButton.action = () => {
        setVisible(!visible);
    };

    useClickOut(
        () => {
            setVisible(!visible);
        },
        visible,
        ButtonListBar,
    );

    return (
        <div className={styles.buttonList}>
            <Button
                text={mainButton.text}
                type={mainButton.type}
                action={mainButton.action}
                icon={mainButton.icon || null}
                iconSize={mainButton.iconSize || undefined}
                right={props.right}
            />
            {visible && buttonList.length > 0 && (
                <div ref={ButtonListBar} className={styles.buttonListList}>
                    {buttonList.map((button, index) => (
                        <div key={index} className={styles.buttonListListVerticalArea}>
                            {(visible2 &&
                                (button.secondaryButton.text == 'Фигура' ||
                                    button.secondaryButton.text == 'Текст') && (
                                    <div ref={ButtonListBar2} className={styles.buttonListListVertical}>
                                        {button.buttonList.map((button, index) => (
                                            <Button
                                                key={index}
                                                text={button.text}
                                                type={button.type}
                                                icon={button.icon}
                                                action={button.action || null}
                                                iconSize={button.iconSize || undefined}
                                            />
                                        ))}
                                    </div>
                                )) ||
                                (visible3 &&
                                    (button.secondaryButton.text == 'Выравнивание и отступы' ||
                                        button.secondaryButton.text == 'Изображение') && (
                                        <div ref={ButtonListBar3} className={styles.buttonListListVertical}>
                                            {button.buttonList.map((button, index) => (
                                                <Button
                                                    key={index}
                                                    text={button.text}
                                                    type={button.type}
                                                    icon={button.icon}
                                                    action={button.action || null}
                                                    iconSize={button.iconSize || undefined}
                                                />
                                            ))}
                                        </div>
                                    )) ||
                                (visible4 && button.secondaryButton.text == 'Маркеры и нумерация' && (
                                    <div ref={ButtonListBar4} className={styles.buttonListListVertical}>
                                        {button.buttonList.map((button, index) => (
                                            <Button
                                                key={index}
                                                text={button.text}
                                                type={button.type}
                                                icon={button.icon}
                                                action={button.action || null}
                                                iconSize={button.iconSize || undefined}
                                            />
                                        ))}
                                    </div>
                                ))}
                            {button.secondaryButton.text !== 'Цвет' &&
                                button.secondaryButton.text !== 'Изменить фон' && (
                                    <Button
                                        key={index}
                                        text={button.secondaryButton.text}
                                        type={button.secondaryButton.type}
                                        icon={button.secondaryButton.icon}
                                        action={button.secondaryButton.action || null}
                                        iconSize={button.secondaryButton.iconSize || undefined}
                                    />
                                )}
                            {(button.secondaryButton.text == 'Цвет' ||
                                button.secondaryButton.text == 'Изменить фон') && (
                                <Colors name={button.secondaryButton.text}></Colors>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
const Colors = (name: { name: string }) => {
    const colorList = [
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
    const [visible, setVisible] = useState(false);
    const colorRef = useRef(null);
    useClickOut(
        () => {
            setVisible(!visible);
        },
        visible,
        colorRef,
    );
    return (
        <div className={styles.colorPalitra}>
            {name.name === 'Цвет' && (
                <Button
                    type={ButtonType.FullIconText}
                    icon={<ButtonIcon.FillIcon />}
                    text={name.name}
                    action={() => {
                        setVisible(true);
                    }}
                />
            )}
            {name.name === 'Изменить фон' && (
                <Button
                    type={ButtonType.FullIconText}
                    icon={<ButtonIcon.ChangeBg />}
                    text={name.name}
                    action={() => {
                        setVisible(true);
                    }}
                />
            )}
            {visible && (
                <div ref={colorRef} className={styles.colorPanel}>
                    {colorList.map((elem, i, index) => (
                        <div className={styles.colorPalitraRow} key={index[i][0]}>
                            {elem.map((elem, i, index) => (
                                <button
                                    key={index[i]}
                                    className={styles.colorPalitraRowElement}
                                    style={{ backgroundColor: elem }}
                                ></button>
                            ))}
                        </div>
                    ))}

                    <div className={styles.newColorArea}>
                        <div className={styles.colorText}>Другой</div>
                        <div className={styles.newColorButtonsArea}>
                            <Button
                                type={ButtonType.Icon}
                                icon={<ButtonIcon.NewColor></ButtonIcon.NewColor>}
                                action={() => {
                                    setVisible(true);
                                }}
                            ></Button>
                            <Button
                                type={ButtonType.Icon}
                                icon={<ButtonIcon.Pipka></ButtonIcon.Pipka>}
                                action={() => {
                                    setVisible(true);
                                }}
                            ></Button>
                        </div>
                        <div className={styles.noColorButton}>
                            <div className={styles.noColorButtonArea}>
                                <Button
                                    type={ButtonType.FullIconText}
                                    icon={<ButtonIcon.NoColor></ButtonIcon.NoColor>}
                                    text={'Прозрачный'}
                                    action={() => {
                                        setVisible(true);
                                    }}
                                ></Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ImageFileUploader = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { createChangeAddElementAction } = useAppActions();
    return (
        <div className={styles.buttonBlockFull}>
            <input
                id="inputFile"
                className={styles.fileInputButton}
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={() => {
                    if (inputRef.current!.files) {
                        const imgReader = new FileReader();
                        imgReader.onload = () => {
                            createChangeAddElementAction(
                                ObjectType.Image,
                                undefined,
                                imgReader.result as string,
                            );
                        };
                        imgReader.readAsDataURL(inputRef.current!.files[0]);
                    }
                }}
            />
            <label htmlFor="inputFile" className={styles.buttonInputBlockFull}>
                <ButtonIcon.Uploader />
                <span className={styles.fileTextButton}>Загрузить с компьютера</span>
            </label>
        </div>
    );
};

const SavePresentationButton = () => {
    const presentation = useAppSelector(state => state.slideBar.presentation);
    const getJsonHref = () => {
        const objText = JSON.stringify(presentation);
        const name = presentation.name + '.json';
        const file = new Blob([objText], { type: 'text/plain' });
        const href = URL.createObjectURL(file);
        return { href: href, name: name };
    };
    return (
        <div>
            <ButtonIcon.Download />
            <a className={styles.buttonBlockButton} href={getJsonHref().href} download={getJsonHref().name}>
                Скачать
            </a>
        </div>
    );
};
const OpenPresentationButton = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { createUpdatePresentationFromFileAction } = useAppActions();
    return (
        <div className={styles.buttonBlockFull}>
            <input
                ref={inputRef}
                className={''}
                type={'file'}
                accept={'.json'}
                onChange={() => {
                    if (inputRef.current! && inputRef.current!.files) {
                        if (inputRef.current!.files[0]) {
                            inputRef.current!.files[0].text().then(data => {
                                const jsonObj = JSON.parse(data);
                                console.log(jsonObj);
                                if (checkPresentationFileType(jsonObj))
                                    createUpdatePresentationFromFileAction(jsonObj);
                                else console.log('Формат файла нормальным сделай, сука!');
                            });
                        }
                    }
                }}
            />
            <label htmlFor="OpenPresentationButton" className={styles.buttonInputBlockFull}>
                <ButtonIcon.Open />
                <span className={styles.fileTextButton}>Открыть</span>
            </label>
        </div>
    );
};

const MainSettingsBar = () => {
    const {
        createAddSlideAction,
        createChangeAddElementAction,
        createChangeTextBold,
        createChangeTextCursive,
        createChangeTextUnderline,
        createChangeTextSize,
    } = useAppActions();
    const FileButtonSection: ButtonWithActionListProps = FileButtonList;
    const EditButtonSection: ButtonWithActionListProps = EditButtonList;
    const InsertionButtonSection: ButtonWithActionListProps = InsertionButtonList;
    const FormatButtonSection: ButtonWithActionListProps = FormatButtonList;
    const SlideButtonSection: ButtonWithActionListProps = SlideButtonList;
    SlideButtonList.buttonList[0].secondaryButton.action = () => {
        createAddSlideAction();
    };
    InsertionButtonList.buttonList[4].buttonList[0].action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Ellipse);
    };

    InsertionButtonList.buttonList[4].buttonList[1].action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Rectangle);
    };
    InsertionButtonList.buttonList[4].buttonList[2].action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Triangle);
    };
    InsertionButtonList.buttonList[0].buttonList[0].icon = <ImageFileUploader />;
    InsertionButtonList.buttonList[1].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Text);
    };

    FormatButtonList.buttonList[0].buttonList[0].action = () => {
        createChangeTextBold();
    };

    FormatButtonList.buttonList[0].buttonList[1].action = () => {
        createChangeTextCursive();
    };

    FormatButtonList.buttonList[0].buttonList[2].action = () => {
        createChangeTextUnderline();
    };
    FormatButtonList.buttonList[0].buttonList[6].action = () => {
        createChangeTextSize(2);
    };
    FileButtonList.buttonList[0].secondaryButton.icon = <OpenPresentationButton />;
    FileButtonList.buttonList[1].secondaryButton.icon = <SavePresentationButton />;
    console.log('buttons Rendered!');
    const ObjectButtonSection: ButtonWithActionListProps = ObjectButtonList;
    return (
        <div className={styles.docsMenubars}>
            <ButtonWithActionList
                mainButton={FileButtonSection.mainButton}
                buttonList={FileButtonSection.buttonList}
            />
            <ButtonWithActionList
                mainButton={EditButtonSection.mainButton}
                buttonList={EditButtonSection.buttonList}
            />
            <ButtonWithActionList
                mainButton={InsertionButtonSection.mainButton}
                buttonList={InsertionButtonSection.buttonList}
            />
            <ButtonWithActionList
                mainButton={FormatButtonSection.mainButton}
                buttonList={FormatButtonSection.buttonList}
            />
            <ButtonWithActionList
                mainButton={SlideButtonSection.mainButton}
                buttonList={SlideButtonSection.buttonList}
            />
            <ButtonWithActionList
                mainButton={ObjectButtonSection.mainButton}
                buttonList={ObjectButtonSection.buttonList}
            />
        </div>
    );
};

const Title = () => {
    const FigureButtonSection: ButtonWithActionListProps = FigureButtonList;
    const ImageButtonSection: ButtonWithActionListProps = ImageButtonList;
    const TextFamilySection: ButtonWithActionListProps = TextFamilyList;
    const TextButtonSection: ButtonWithActionListProps = TextButtonList;
    const { createChangeAddElementAction } = useAppActions();
    TextButtonList.mainButton.action = () => {
        createChangeAddElementAction(ObjectType.Text);
    };
    FigureButtonList.buttonList[0].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Ellipse);
    };

    FigureButtonList.buttonList[1].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Rectangle);
    };
    FigureButtonList.buttonList[2].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Triangle);
    };

    return (
        <header className={styles.docsBars}>
            <div className={styles.docsTitlebarContainer}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.docsBarsActivityPanel}>
                    <InputText />
                    <MainSettingsBar />
                </div>
            </div>
            <div className={styles.docsPrimaryToolbars}>
                <div className={styles.docsPrimaryToolbarsButtonsPlace}>
                    <Button type={ButtonType.Icon} icon={<ButtonIcon.NewSlide />} action={() => {}} />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.ArrowThatOpensTheListVertical />}
                        action={() => {}}
                    />
                    <div className={styles.createLine}></div>
                    <Button type={ButtonType.Icon} icon={<ButtonIcon.Undo />} action={() => {}} />
                    <Button type={ButtonType.Icon} icon={<ButtonIcon.Redo />} action={() => {}} />
                    <Button type={ButtonType.Icon} icon={<ButtonIcon.CopyFormatting />} action={() => {}} />
                    <div className={styles.createLine}></div>
                    <Button type={ButtonType.Icon} icon={<ButtonIcon.Cursor />} action={() => {}} />
                    <ButtonWithActionList
                        mainButton={TextButtonSection.mainButton}
                        buttonList={TextButtonSection.buttonList}
                    />
                    <ButtonWithActionList
                        mainButton={ImageButtonSection.mainButton}
                        buttonList={[
                            {
                                secondaryButton: {
                                    type: ButtonType.FullIcon,
                                    action: () => {},
                                    icon: <ImageFileUploader />,
                                },
                                buttonList: [],
                            },
                            {
                                secondaryButton: {
                                    type: ButtonType.FullIconText,
                                    text: 'Загрузить из интернета',
                                    action: () => {},
                                    icon: <ButtonIcon.Photo />,
                                },
                                buttonList: [],
                            },
                        ]}
                    />
                    <ButtonWithActionList
                        mainButton={FigureButtonSection.mainButton}
                        buttonList={FigureButtonSection.buttonList}
                    />
                    <Button type={ButtonType.Icon} icon={<ButtonIcon.Line />} action={() => {}} />
                    <div className={styles.createLine}></div>
                    <Button text={'Фон'} type={ButtonType.Text} action={() => {}} />
                    <div className={styles.createLine}></div>
                    <Button text={'Макет'} type={ButtonType.Text} action={() => {}} />
                    <div className={styles.createLine}></div>
                    <Button text={'Тема'} type={ButtonType.Text} action={() => {}} />
                    <div className={styles.createLine}></div>
                    <ButtonWithActionList
                        mainButton={TextFamilySection.mainButton}
                        buttonList={TextFamilySection.buttonList}
                        right={TextFamilySection.right}
                    />
                </div>
            </div>
        </header>
    );
};

export { Title };
