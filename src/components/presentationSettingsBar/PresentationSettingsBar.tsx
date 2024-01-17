import { useEffect, useRef, useState } from 'react';
import { Button } from '../button/Button';
import { BackgroundType, ButtonProps, ButtonType, ButtonWithActionListProps } from '../../model/types';
import {
    FigureButtonList,
    FileButtonList,
    FormatButtonList,
    GraphOpenMenu,
    ImageButtonList,
    InputButton,
    InsertionButtonList,
    ObjectButtonList,
    SlideButtonList,
    TextButton,
    TextFamilyList,
} from '../../model/models';
import * as ButtonIcon from '../buttons/icons/ButtonIcons';
import { Logo } from '../../logo';
import { useAppActions, useAppSelector } from '../../store/hooks';
import styles from './PresentationSettingsBar.module.css';
import { AlignTypes, FigureObjects, ObjectType } from '../../model/figureTypes';
import {
    ButtonWithActionList,
    DownloadPDF,
    ImageFileUploader,
    OpenPresentationButton,
    SavePresentationButton,
} from '../buttons/Buttons';
import { ActiveSlideAreaPreview } from '../editSlideArea/SlideAreaPreviewCopy';

const FullScreenButton = () => {
    let isFullscreen = false;
    const slides = useAppSelector(state => state.slideBar.presentation.slides);
    const [Slide, setSlide] = useState(0);
    const SlidesRef = useRef<HTMLDivElement>(null);
    const onClick = () => {
        console.log(Slide)
        console.log(slides.length)
        if (Slide + 1 < slides.length) {
            setSlide(Slide + 1)
        }
    }
    useEffect(() => {
        const onChangeFunc = () => {
            console.log('fullscreenChanged')
            if (isFullscreen) {
                if (SlidesRef) {
                    SlidesRef.current!.style.display = 'none'
                    SlidesRef.current!.style.zIndex = '-1'
                    SlidesRef.current!.removeEventListener('click', onClick)
                }
                setSlide(0)
                isFullscreen = false;
            }
            else {
                if (SlidesRef) {
                    SlidesRef.current!.style.display = 'block'
                    SlidesRef.current!.style.zIndex = '100'
                }
                isFullscreen = true;
                const preview = SlidesRef.current?.querySelector('div')
                if (preview) {
                    console.log(2)
                    preview.classList.add(styles.slidesPreviewArea)
                }
            }
        }
        document.addEventListener('fullscreenchange', onChangeFunc);
        return () => {
            document.removeEventListener('fullscreenchange', onChangeFunc);
        }
    }, [slides])
    return (<>
        <div onClick={() => { onClick() }} ref={SlidesRef} className={styles.slidesPreview}>
            <ActiveSlideAreaPreview slide={slides[Slide]} />
        </div>
        <Button
            text={'Слайд-шоу'}
            type={ButtonType.Text}
            action={() => {
                const fullScreen = (element: HTMLDivElement) => {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    }
                }
                if (SlidesRef.current) {
                    if (!isFullscreen) {
                        fullScreen(SlidesRef.current)
                        SlidesRef.current!.style.display = 'block'
                        SlidesRef.current!.style.zIndex = '100'
                    }
                }
            }}
        />
    </>)
}

const InputText = () => {
    const name = useAppSelector(state => state.slideBar.presentation.name);
    const { createChangePresentationNameAction } = useAppActions();
    const inputRef = useRef<HTMLInputElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.addEventListener('keydown', enterDownHandler);
            document.addEventListener('click', closeOnClick);
            inputRef.current.style.width = spanRef.current!.offsetWidth + 7 + 'px';
            inputRef.current.value = name;
            inputRef.current.classList.add(styles.inputTextInputActive);
            inputRef.current.focus();
        }
    };

    const enterDownHandler = (event: { code: string }) => {
        if (event.code == 'Enter') {
            document.removeEventListener('click', closeOnClick);
            if (inputRef.current) {
                inputRef.current.classList.remove(styles.inputTextInputActive);
                inputRef.current.blur();
                if (inputRef.current.value.length) {
                    createChangePresentationNameAction(inputRef.current.value);
                } else {
                    createChangePresentationNameAction('Презентация без названия');
                }
                inputRef.current.removeEventListener('keydown', enterDownHandler);
            }
        }
    };

    const changeInputWidth = () => {
        if (inputRef.current && spanRef.current) {
            inputRef.current.style.width = spanRef.current.offsetWidth + 7 + 'px';
            spanRef.current!.innerText = inputRef.current.value;
        }
    };

    const closeOnClick = (event: MouseEvent) => {
        const tar = event.target as HTMLElement;
        if (
            inputRef.current?.classList.contains(styles.inputTextInputActive) &&
            !(inputRef.current?.contains(tar) || spanRef.current?.contains(tar)) &&
            inputRef.current
        ) {
            createChangePresentationNameAction(inputRef.current.value);
            inputRef.current.classList.remove(styles.inputTextInputActive);
            inputRef.current.blur();
            document.removeEventListener('click', closeOnClick);
        }
    };
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

const MainSettingsBar = () => {
    const {
        createAddSlideAction,
        createChangeAddElementAction,
        createChangeTextBold,
        createChangeTextCursive,
        createChangeTextUnderline,
        createChangeTextSize,
        createChangeTextsAlignAction,
        createChangeSlideBackgroundAction,
        createChangeElementLayerActionHigher,
        createChangeElementLayerActionLower
    } = useAppActions();
    const FileButtonSection: ButtonWithActionListProps = FileButtonList;
    const InsertionButtonSection: ButtonWithActionListProps = InsertionButtonList;
    const FormatButtonSection: ButtonWithActionListProps = FormatButtonList;
    const SlideButtonSection: ButtonWithActionListProps = SlideButtonList;

    const ObjectButtonSection: ButtonWithActionListProps = ObjectButtonList;
    SlideButtonSection.buttonList[2].secondaryButton.icon = (
        <ImageFileUploader
            onloadAction={(imageUrl: string) => {
                createChangeSlideBackgroundAction({ type: BackgroundType.Image, url: imageUrl });
            }}
        />
    );
    InsertionButtonSection.buttonList[2].buttonList[0].action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Ellipse);
    };

    InsertionButtonSection.buttonList[2].buttonList[1].action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Rectangle);
    };
    InsertionButtonSection.buttonList[2].buttonList[2].action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Triangle);
    };
    InsertionButtonSection.buttonList[0].buttonList[0].icon = (
        <ImageFileUploader
            onloadAction={(imageUrl: string) => {
                createChangeAddElementAction(ObjectType.Image, undefined, imageUrl);
            }}
        />
    );
    SlideButtonSection.buttonList[0].secondaryButton.action = () => {
        createAddSlideAction();
    };
    InsertionButtonSection.buttonList[1].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Text);
    };

    FormatButtonSection.buttonList[0].buttonList[0].action = () => {
        createChangeTextBold();
    };

    FormatButtonSection.buttonList[0].buttonList[1].action = () => {
        createChangeTextCursive();
    };
    ObjectButtonSection.buttonList[1].secondaryButton.action = () => {
        createChangeElementLayerActionLower();
    };
    ObjectButtonSection.buttonList[0].secondaryButton.action = () => {
        createChangeElementLayerActionHigher();
    };
    FormatButtonSection.buttonList[0].buttonList[2].action = () => {
        createChangeTextUnderline();
    };
    FormatButtonSection.buttonList[0].buttonList[3].action = () => {
        createChangeTextSize(2);
    };
    FormatButtonSection.buttonList[0].buttonList[4].action = () => {
        createChangeTextSize(-2);
    };
    FormatButtonSection.buttonList[1].buttonList[0].action = () => {
        createChangeTextsAlignAction(AlignTypes.LEFT);
    };
    FormatButtonSection.buttonList[1].buttonList[1].action = () => {
        createChangeTextsAlignAction(AlignTypes.CENTER);
    };
    FormatButtonSection.buttonList[1].buttonList[2].action = () => {
        createChangeTextsAlignAction(AlignTypes.RIGHT);
    };
    FormatButtonSection.buttonList[1].buttonList[3].action = () => {
        createChangeTextsAlignAction(AlignTypes.BY_WIDTH);
    };
    FileButtonSection.buttonList[0].secondaryButton.icon = <OpenPresentationButton />;
    FileButtonSection.buttonList[1].secondaryButton.icon = <SavePresentationButton />;
    FileButtonSection.buttonList[2].secondaryButton.icon = <DownloadPDF />;
    return (
        <div className={styles.docsMenubars}>
            <ButtonWithActionList
                mainButton={FileButtonSection.mainButton}
                buttonList={FileButtonSection.buttonList}
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
const InputGraph = () => {
    const { createChangeAddElementAction } = useAppActions();
    const inputRef = useRef<HTMLInputElement>(null);
    const fromRef = useRef<HTMLInputElement>(null);
    const toRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const onKeydown = (key: KeyboardEvent) => {
            if (key.code == 'Enter') {
                const func = inputRef.current!.value;
                let from = Number(fromRef.current!.value);
                let to = Number(toRef.current!.value);
                if (from != undefined && from == 0) from = -100
                if (to != undefined && to == 0) to = 100
                console.log(from, to, func)
                createChangeAddElementAction(ObjectType.FunctionGraph, undefined, undefined, { from, to, line: func })
            }
        }
        inputRef.current!.addEventListener('keydown', onKeydown)
    }, [])
    return (<div className={styles.graphicPlace}>
        График функции
        <label>
            <input ref={inputRef} type="text" placeholder='f(x)=' />
        </label>
        <label>
            <input placeholder='from' ref={fromRef} type="text" />
        </label>
        <label>
            <input placeholder='to' ref={toRef} type="text" />
        </label>
    </div>)
}

const Title = () => {
    const {
        createAddSlideAction,
        createChangeAddElementAction,
        createChangeTextFontFamily,
        createUndoAction,
        createRedoAction,
    } = useAppActions();
    const FigureButtonSection: ButtonWithActionListProps = FigureButtonList;
    const ImageButtonSection: ButtonWithActionListProps = ImageButtonList;
    const TextFamilySection: ButtonWithActionListProps = TextFamilyList;
    const TextButtonSection: ButtonProps = TextButton;
    const InputButtonSection: ButtonProps = InputButton;
    const GraphOpenMenuSection = GraphOpenMenu;
    GraphOpenMenuSection.buttonList[0].secondaryButton.icon = <InputGraph />
    InputButtonSection.action = () => {
        createAddSlideAction();
    };
    FigureButtonSection.buttonList[0].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Ellipse);
    };

    FigureButtonSection.buttonList[1].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Rectangle);
    };
    FigureButtonSection.buttonList[2].secondaryButton.action = () => {
        createChangeAddElementAction(ObjectType.Graphic, FigureObjects.Triangle);
    };
    TextButtonSection.action = () => {
        createChangeAddElementAction(ObjectType.Text)
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
                        type={InputButtonSection.type}
                        icon={InputButtonSection.icon}
                        action={InputButtonSection.action}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Undo />}
                        action={() => {
                            createUndoAction();
                        }}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Redo />}
                        action={() => {
                            createRedoAction();
                        }}
                    />
                    <Button
                        type={TextButtonSection.type}
                        icon={TextButtonSection.icon}
                        action={TextButtonSection.action}
                    />
                    <ButtonWithActionList
                        mainButton={ImageButtonSection.mainButton}
                        buttonList={[
                            {
                                secondaryButton: {
                                    type: ButtonType.FullIcon,
                                    action: () => { },
                                    icon: <ImageFileUploader
                                        onloadAction={(imageUrl: string) => {
                                            createChangeAddElementAction(ObjectType.Image, undefined, imageUrl);
                                        }}
                                    />
                                },
                                buttonList: [],
                            },
                            {
                                secondaryButton: {
                                    type: ButtonType.FullIconText,
                                    text: 'Загрузить из интернета',
                                    action: () => { },
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
                    <ButtonWithActionList
                        mainButton={GraphOpenMenuSection.mainButton}
                        buttonList={GraphOpenMenuSection.buttonList}
                    />
                    <ButtonWithActionList
                        mainButton={TextFamilySection.mainButton}
                        buttonList={[
                            ...TextFamilySection.buttonList.map(button => {
                                const fontFamily = button.secondaryButton.text
                                    ? button.secondaryButton.text
                                    : '';
                                return {
                                    ...button,
                                    secondaryButton: {
                                        ...button.secondaryButton,
                                        action: () => {
                                            createChangeTextFontFamily(fontFamily.replaceAll(' ', '_') + ' Regular');
                                        },
                                    },
                                };
                            }),
                        ]}
                        right={TextFamilySection.right}
                    />
                    <FullScreenButton />
                </div>
            </div>
        </header>
    );
};

export { Title };
