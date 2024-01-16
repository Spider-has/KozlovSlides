import { useRef, useState } from "react";
import { BackgroundType, ButtonWithActionListProps } from "../../model/types";
import { useAppActions, useAppSelector } from "../../store/hooks";
import { useClickOut } from "../../model/hooks";
import { Button } from "./Button";
import styles from "./Buttons.module.css";
import { Colors } from "../colorButton/Colors";
import * as ButtonIcon from './icons/ButtonIcons';
import { ObjectType } from "../../model/figureTypes";
import { checkPresentationFileType } from "../../model/utils";
export const ButtonWithActionList = (props: ButtonWithActionListProps) => {
    const { createChangeElementsColorAction, createChangeSlideBackgroundAction } = useAppActions();
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
                    case 'Выравнивание':
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
                    case 'Нумерация':
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
                                    (button.secondaryButton.text == 'Выравнивание' ||
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
                                (visible4 && button.secondaryButton.text == 'Нумерация' && (
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
                            {button.secondaryButton.text == 'Цвет' && (
                                <Colors
                                    name={button.secondaryButton.text}
                                    onColorClick={(colorName: string) => {
                                        createChangeElementsColorAction(colorName);
                                    }}
                                ></Colors>
                            )}
                            {button.secondaryButton.text == 'Изменить фон' && (
                                <Colors
                                    name={button.secondaryButton.text}
                                    onColorClick={(colorName: string) => {
                                        createChangeSlideBackgroundAction({
                                            type: BackgroundType.Color,
                                            color: colorName,
                                        });
                                    }}
                                ></Colors>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export const ImageFileUploader = () => {
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

export const SavePresentationButton = () => {
    const presentation = useAppSelector(state => state.slideBar.presentation);
    const getJsonHref = () => {
        const objText = JSON.stringify(presentation);
        const name = presentation.name + '.json';
        const file = new Blob([objText], { type: 'text/plain' });
        const href = URL.createObjectURL(file);
        return { href: href, name: name };
    };
    return (
        <div className={styles.buttonBlockFull}>
            <ButtonIcon.Download />
            <a className={styles.DownloadButton} href={getJsonHref().href} download={getJsonHref().name}>
                Скачать
            </a>
        </div>
    );
};
export const OpenPresentationButton = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { createUpdatePresentationFromFileAction } = useAppActions();
    return (
        <div className={styles.buttonBlockFull}>
            <input
                id="OpenPresentationButton"
                ref={inputRef}
                className={styles.fileInputButton}
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
                                else console.log('Формат файла ненорм');
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