import { useEffect, useRef, useState } from 'react';
import { Button } from '../button/Button';
import { ButtonType, ButtonWithActionListProps } from '../../model/types';
import {
    EditButtonList,
    FigureButtonList,
    FileButtonList,
    FormatButtonList,
    InsertionButtonList,
    ObjectButtonList,
    SlideButtonList,
} from '../../model/models';
import * as ButtonIcon from '../button/icons/ButtonIcons';
import { Logo } from '../../logo';
import { useAppActions } from '../../store/hooks';
import styles from './PresentationSettingsBar.module.css';
import { FigureObjects, ObjectType } from '../../model/figureTypes';

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
                inputRef.current.removeEventListener(
                    'keydown',
                    enterDownHandler,
                );
            }
        }
    };

    const changeInputWidth = () => {
        if (inputRef.current && spanRef.current) {
            console.log(spanRef.current.offsetWidth);
            inputRef.current.style.width =
                spanRef.current.offsetWidth + 7 + 'px';
            console.log(inputRef.current.style.width);
            setName(inputRef.current.value);
        }
    };

    const closeOnClick = (event: MouseEvent) => {
        const tar = event.target as HTMLElement;
        if (
            inputRef.current?.classList.contains(styles.inputTextInputActive) &&
            !(
                inputRef.current?.contains(tar) ||
                spanRef.current?.contains(tar)
            ) &&
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
            <span
                onClick={handleClick}
                className={styles.inputTextText}
                ref={spanRef}
            >
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

const useClickOut = (
    action: () => void,
    visibility: boolean,
    elementRef: React.RefObject<Node>,
) => {
    useEffect(() => {
        if (visibility) {
            const handle = (event: MouseEvent) => {
                const tar = event.target as HTMLElement
                if (
                    visibility &&
                    elementRef.current &&
                    !elementRef.current.contains(tar)
                ) {
                    action();
                }
            };

            setTimeout(() => {
                document.addEventListener('click', handle);
            }, 0);

            return () => {
                document.removeEventListener('click', handle);
            };
        }
    }, [visibility]);
};

const ButtonWithActionList = (props: ButtonWithActionListProps) => {
    const [visible, setVisible] = useState(false);
    const ButtonListBar = useRef<HTMLDivElement>(null);
    const [visible2, setVisible2] = useState(false);
    const ButtonListBar2 = useRef<HTMLDivElement>(null);
    const [visible3, setVisible3] = useState(false);
    const ButtonListBar3 = useRef<HTMLDivElement>(null);
    const { mainButton, buttonList } = props;
    switch (mainButton.text) {
        case "Вставка":
            buttonList.forEach(element => {
                switch (element.secondaryButton.text) {
                    case "Фигура":
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
                }
            });
            break;
        case "Формат":
            buttonList.forEach(element => {
                switch (element.secondaryButton.text) {
                    case "Текст":
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
                    case "Выравнивание и отступы":
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
            />
            {visible && (
                <div ref={ButtonListBar} className={styles.buttonListList}>
                    {buttonList.map((button, index) => (
                        <div key={index} className={styles.buttonListListVerticalArea}>
                            {
                                ((visible2 && ((button.secondaryButton.text == 'Фигура') || (button.secondaryButton.text == 'Текст'))) &&
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
                                        ))
                                        }
                                    </div>) || (
                                    (visible3 && ((button.secondaryButton.text == 'Выравнивание и отступы'))) && <div ref={ButtonListBar3} className={styles.buttonListListVertical}>
                                        {button.buttonList.map((button, index) => (
                                            <Button
                                                key={index}
                                                text={button.text}
                                                type={button.type}
                                                icon={button.icon}
                                                action={button.action || null}
                                                iconSize={button.iconSize || undefined}
                                            />
                                        ))
                                        }

                                    </div>
                                )

                            }
                            {
                                ((button.secondaryButton.text !== 'Цвет') && (button.secondaryButton.text !== 'Цвет фона') &&
                                    <Button
                                        key={index}
                                        text={button.secondaryButton.text}
                                        type={button.secondaryButton.type}
                                        icon={button.secondaryButton.icon}
                                        action={button.secondaryButton.action || null}
                                        iconSize={button.secondaryButton.iconSize || undefined}
                                    />)
                            }
                            {
                                (((button.secondaryButton.text == 'Цвет') || (button.secondaryButton.text == 'Цвет фона')) && <Colors name={button.secondaryButton.text}></Colors>)
                            }
                        </div>
                    ))
                    }
                </div>
            )}
        </div>
    );
};
// window.onload = function () {
//     (function (H, D, s, h, r: number) {
//         for (; r < H; r += D) {
//             for (let g = 256; g < H; g += D)
//                 for (let b = 256; b < H; b += D) {
//                     const v = h(r) + h(g) + h(b);
//                     s += '<b class=picker style="background-color:' + v
//                         + '" onmouseover=this.title="' + v
//                         + '" onclick=prompt("' + v.replace(/(.)./g, '$1') + '","' + v + '") ></b>';
//                 }
//             s += '<br>';
//         }
//         document.body.innerHTML += s;
//     })(512, 51, '', function (a: number) { return a.toString(16).substr(1); }, 256)
// }
const Colors = (name: { name: string }) => {
    const colorList = [["IndianRedLightCoral", "Salmon", "DarkSalmon", "Crimson", "FireBrick", "DarkRed", "Pink", "LightPink", "HotPink", "DeepPink", "MediumVioletRed", "PaleVioletRed", "LightSalmon", "Coral", "Tomato", "OrangeRed", "DarkOrange", "Orange", "Gold", "LightYellow", "LemonChiffon", "LightGoldenrodYellow", "PapayaWhip", "Moccasin", "PeachPuff", "PaleGoldenrod", "Khaki", "DarkKhaki", "Lavender", "Thistle", "Plum", "Violet", "Orchid", "Magenta", "MediumOrchid", "MediumPurple", "BlueViolet", "DarkViolet", "DarkOrchid", "DarkMagenta", "Indigo", "SlateBlue", "DarkSlateBlue", "Cornsilk", "BlanchedAlmond", "Bisque", "NavajoWhite", "Wheat", "BurlyWood", "Tan", "RosyBrown", "SandyBrown", "Goldenrod", "DarkGoldenRod", "Peru", "Chocolate", "SaddleBrown", "Sienna", "Brown", "Gray", "Silver", "Fuchsia", "Purple", "Red", "Maroon", "Yellow", "Lime", "AquaTeal", "Blue", "GreenYellow", "Chartreuse", "LawnGreen", "LimeGreen", "PaleGreen", "LightGreen", "MediumSpringGreen", "SpringGreen", "MediumSeaGreen", "SeaGreen", "ForestGreen", "Green", "DarkGreen", "YellowGreen", "OliveDrab", "Olive", "DarkOliveGreen", "MediumAquamarine", "DarkSeaGreen", "LightSeaGreen", "DarkCyan", "Teal", "Aqua", "Cyan", "LightCyan", "PaleTurquoise", "Aquamarine", "Turquoise", "MediumTurquoise", "DarkTurquoise", "CadetBlue", "SteelBlue", "LightSteelBlue", "PowderBlue", "LightBlue", "SkyBlue", "LightSkyBlue", "DeepSkyBlue", "DodgerBlue", "CornflowerBlue", "MediumSlateBlue", "RoyalBlue", "MediumBlue", "DarkBlue", "Navy", "MidnightBlue", "White", "Snow", "Honeydew", "MintCream", "Azure", "AliceBlue", "GhostWhite", "WhiteSmoke", "Gainsboro", "LightGrey", "DarkGray", "Grey", "DimGray", "LightSlateGray", "SlateGray", "DarkSlateGray", "Black"]];
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
            <Button type={ButtonType.FullIconText} icon={<ButtonIcon.FillIcon />} text={name.name} action={() => { setVisible(true) }} />
            {visible &&
                <div ref={colorRef} className={styles.colorPanel}>
                    {
                        colorList.map((elem, i, index) => (
                            <div className={styles.colorPalitraRow} key={index[i][0]}>
                                {
                                    elem.map((elem, i, index) => (
                                        <button key={index[i]} className={styles.colorPalitraRowElement} style={{ backgroundColor: elem }}>
                                        </button>
                                    ))
                                }
                            </div>
                        ))
                    }

                    <div className={styles.newColorArea}>
                        <div className={styles.colorText}>Другой</div>
                        <div className={styles.newColorButtonsArea}>
                            <Button type={ButtonType.Icon} icon={<ButtonIcon.NewColor></ButtonIcon.NewColor>} action={() => { setVisible(true) }}></Button>
                            <Button type={ButtonType.Icon} icon={<ButtonIcon.Pipka></ButtonIcon.Pipka>} action={() => { setVisible(true) }}></Button>
                        </div>
                        <div className={styles.noColorButton}>
                            <div className={styles.noColorButtonArea}>
                                <Button type={ButtonType.FullIconText} icon={<ButtonIcon.NoColor></ButtonIcon.NoColor>} text={'Прозрачный'} action={() => { setVisible(true) }}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};


const ImageFileUploader = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { createChangeAddElementAction } = useAppActions();
    return (
        <div>
            <input id="inputFile" className={styles.inputFile} type="file" accept="image/*" ref={inputRef} onChange={() => {
                if (inputRef.current!.files) {
                    const imgReader = new FileReader();
                    imgReader.onload = () => {
                        createChangeAddElementAction(ObjectType.Image, undefined, imgReader.result as string)
                    }
                    imgReader.readAsDataURL(inputRef.current!.files[0])
                }

            }} />
            <label htmlFor="inputFile" className={styles.buttonInputBlockFull}>
                <ButtonIcon.Uploader />
                <span className={styles.inputTextUploader}>Загрузить фото с компьютера</span>
            </label>
        </div>
    )
}

const MainSettingsBar = () => {
    const { createAddSlideAction, createChangeAddElementAction, createChangeTextBold, createChangeTextCursive, createChangeTextUnderline, createChangeTextSize } = useAppActions();
    const FileButtonSection: ButtonWithActionListProps = FileButtonList;
    const EditButtonSection: ButtonWithActionListProps = EditButtonList;
    const InsertionButtonSection: ButtonWithActionListProps =
        InsertionButtonList;
    const FormatButtonSection: ButtonWithActionListProps = FormatButtonList;
    const SlideButtonSection: ButtonWithActionListProps = SlideButtonList;
    SlideButtonList.buttonList[0].secondaryButton.action = () => {
        createAddSlideAction();
    };
    InsertionButtonList.buttonList[4].buttonList[0].action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Ellipse)
    }

    InsertionButtonList.buttonList[4].buttonList[1].action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Rectangle)
    }
    InsertionButtonList.buttonList[4].buttonList[2].action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Triangle)
    }
    InsertionButtonList.buttonList[0].secondaryButton.icon = <ImageFileUploader />
    InsertionButtonList.buttonList[1].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Text)
    }

    FormatButtonList.buttonList[0].buttonList[0].action = () => {
        createChangeTextBold();
    }

    FormatButtonList.buttonList[0].buttonList[1].action = () => {
        createChangeTextCursive();
    }

    FormatButtonList.buttonList[0].buttonList[2].action = () => {
        createChangeTextUnderline();
    }
    FormatButtonList.buttonList[0].buttonList[6].action = () => {
        createChangeTextSize(2);
    }
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
    const { createChangeAddElementAction } = useAppActions();

    FigureButtonList.buttonList[0].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Ellipse)
    }

    FigureButtonList.buttonList[1].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Rectangle)
    }
    FigureButtonList.buttonList[2].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Triangle)
    }
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
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.NewSlide />}
                        action={() => { }}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.ArrowThatOpensTheListVertical />}
                        action={() => { }}
                    />
                    <div className={styles.createLine}></div>
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Undo />}
                        action={() => { }}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Redo />}
                        action={() => { }}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.CopyFormatting />}
                        action={() => { }}
                    />
                    <div className={styles.createLine}></div>
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Cursor />}
                        action={() => { }}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.TextField />}
                        action={() => { }}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Photo />}
                        action={() => { }}
                    />

                    <ButtonWithActionList
                        mainButton={FigureButtonSection.mainButton}
                        buttonList={FigureButtonSection.buttonList}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Line />}
                        action={() => { }}
                    />
                    <div className={styles.createLine}></div>
                    <Button
                        text={'Фон'}
                        type={ButtonType.Text}
                        action={() => { }}
                    />
                    <div className={styles.createLine}></div>
                    <Button
                        text={'Макет'}
                        type={ButtonType.Text}
                        action={() => { }}
                    />
                    <div className={styles.createLine}></div>
                    <Button
                        text={'Тема'}
                        type={ButtonType.Text}
                        action={() => { }}
                    />
                </div>
            </div>
        </header>
    );
};

export { Title };
