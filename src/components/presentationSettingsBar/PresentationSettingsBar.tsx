import { useEffect, useRef, useState } from 'react';
import { Button } from '../button/Button';
import { ButtonType, ButtonWithActionListProps } from '../../model/types';
import {
    EditButtonList,
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

    const closeOnClick = (event: { target: Node | null }) => {
        if (
            inputRef.current?.classList.contains(styles.inputTextInputActive) &&
            !(
                inputRef.current?.contains(event.target) ||
                spanRef.current?.contains(event.target)
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
            const handle = (event: { target: Node }) => {
                if (
                    visibility &&
                    elementRef.current &&
                    !elementRef.current.contains(event.target as Node)
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
                            <Button
                                key={index}
                                text={button.secondaryButton.text}
                                type={button.secondaryButton.type}
                                icon={button.secondaryButton.icon}
                                action={button.secondaryButton.action || null}
                                iconSize={button.secondaryButton.iconSize || undefined}
                            />
                        </div>
                    ))
                    }
                </div>
            )}
        </div>
    );
};

const Colors = () => {
    const colorList = [["IndianRedLightCoral", "Salmon", "DarkSalmon", "Crimson", "FireBrick", "DarkRed", "Pink", "LightPink", "HotPink", "DeepPink", "MediumVioletRed", "PaleVioletRed", "LightSalmon", "Coral", "Tomato", "OrangeRed", "DarkOrange", "Orange", "Gold", "LightYellow", "LemonChiffon", "LightGoldenrodYellow", "PapayaWhip", "Moccasin", "PeachPuff", "PaleGoldenrod", "Khaki", "DarkKhaki", "Lavender", "Thistle", "Plum", "Violet", "Orchid", "Magenta", "MediumOrchid", "MediumPurple", "BlueViolet", "DarkViolet", "DarkOrchid", "DarkMagenta", "Indigo", "SlateBlue", "DarkSlateBlue", "Cornsilk", "BlanchedAlmond", "Bisque", "NavajoWhite", "Wheat", "BurlyWood", "Tan", "RosyBrown", "SandyBrown", "Goldenrod", "DarkGoldenRod", "Peru", "Chocolate", "SaddleBrown", "Sienna", "Brown", "Gray", "Silver", "Fuchsia", "Purple", "Red", "Maroon", "Yellow", "Olive", "Lime", "AquaTeal", "Blue", "GreenYellow", "Chartreuse"], ["LawnGreen", "Lime", "LimeGreen", "PaleGreen", "LightGreen", "MediumSpringGreen", "SpringGreen", "MediumSeaGreen", "SeaGreen", "ForestGreen", "Green", "DarkGreen", "YellowGreen", "OliveDrab", "Olive", "DarkOliveGreen", "MediumAquamarine", "DarkSeaGreen", "LightSeaGreen", "DarkCyan", "Teal", "Aqua", "Cyan", "LightCyan", "PaleTurquoise", "Aquamarine", "Turquoise", "MediumTurquoise", "DarkTurquoise", "CadetBlue", "SteelBlue", "LightSteelBlue", "PowderBlue", "LightBlue", "SkyBlue", "LightSkyBlue", "DeepSkyBlue", "DodgerBlue", "CornflowerBlue", "MediumSlateBlue", "RoyalBlue", "Blue", "MediumBlue", "DarkBlue", "Navy", "MidnightBlue", "White", "Snow", "Honeydew", "MintCream", "Azure", "AliceBlue", "GhostWhite", "WhiteSmoke", "Seashell", "Beige", "OldLace", "FloralWhite", "Ivory", "AntiqueWhite", "Linen", "LavenderBlush", "MistyRose", "Gainsboro", "LightGrey", "DarkGray", "Grey", "DimGray", "LightSlateGray", "SlateGray", "DarkSlateGray", "Black"]];
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
            <Button type={ButtonType.Icon} icon={<ButtonIcon.FillIcon />} action={() => { setVisible(true) }} />
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
                </div>
            }
        </div>
    )
};

const MainSettingsBar = () => {
    const { createAddSlideAction } = useAppActions();
    const FileButtonSection: ButtonWithActionListProps = FileButtonList;
    const EditButtonSection: ButtonWithActionListProps = EditButtonList;
    const InsertionButtonSection: ButtonWithActionListProps =
        InsertionButtonList;
    const FormatButtonSection: ButtonWithActionListProps = FormatButtonList;
    const SlideButtonSection: ButtonWithActionListProps = SlideButtonList;
    SlideButtonList.buttonList[0].secondaryButton.action = () => {
        createAddSlideAction();
        console.log('create');
    };
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
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Figure />}
                        action={() => { }}
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
                    <Colors />
                </div>
            </div>
        </header>
    );
};

export { Title };
