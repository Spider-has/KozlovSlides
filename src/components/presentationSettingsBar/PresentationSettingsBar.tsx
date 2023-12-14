import { useEffect, useRef, useState } from 'react';
import './PresentationSettingsBar.css';
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

const InputText = () => {
    const [name, setName] = useState('Презентация без названия');
    const inputRef = useRef<HTMLInputElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.addEventListener('keydown', enterDownHandler);
            document.addEventListener('click', closeOnClick);
            inputRef.current.classList.add('input-text__input_active');
            inputRef.current.focus();
        }
    };

    const enterDownHandler = (event: { code: string }) => {
        if (event.code == 'Enter') {
            if (inputRef.current) {
                inputRef.current.classList.remove('input-text__input_active');
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
            inputRef.current?.classList.contains('input-text__input_active') &&
            !(
                inputRef.current?.contains(event.target) ||
                spanRef.current?.contains(event.target)
            ) &&
            inputRef.current
        ) {
            inputRef.current.classList.remove('input-text__input_active');
            inputRef.current.blur();
            document.removeEventListener('click', closeOnClick);
        }
    };

    useEffect(() => {
        console.log('Привет, Иван!');
    }, []);
    return (
        <div className="input-text">
            <span
                onClick={handleClick}
                className="input-text__text"
                ref={spanRef}
            >
                {name}
            </span>
            <input
                className="input-text__input"
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

    const { mainButton, buttonList } = props;

    // const Buttons = buttonList.map((button, index) => (
    //     <Button
    //         key={index}
    //         text={button.text}
    //         type={button.type}
    //         icon={button.icon}
    //         action={button.action || null}
    //         iconSize={button.iconSize || undefined}
    //     />
    // ));

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
        <div className="button-list">
            <Button
                text={mainButton.text}
                type={mainButton.type}
                action={mainButton.action}
                icon={mainButton.icon || null}
                iconSize={mainButton.iconSize || undefined}
            />
            {visible && (
                <div ref={ButtonListBar} className="button-list__list">
                    {buttonList.map((button, index) => (
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
            )}
        </div>
    );
};

const MainSettingsBar = () => {
    const { createAddSlideAction } = useAppActions();
    const FileButtonSection: ButtonWithActionListProps = FileButtonList;
    const EditButtonSection: ButtonWithActionListProps = EditButtonList;
    const InsertionButtonSection: ButtonWithActionListProps =
        InsertionButtonList;
    const FormatButtonSection: ButtonWithActionListProps = FormatButtonList;
    const SlideButtonSection: ButtonWithActionListProps = SlideButtonList;
    SlideButtonList.buttonList[0].action = () => {
        createAddSlideAction();
        console.log('create');
    };
    const ObjectButtonSection: ButtonWithActionListProps = ObjectButtonList;
    return (
        <div className="docs-menubars">
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
        <header className="docs-bars">
            <div className="docs-titlebar-container">
                <div className="logo">
                    <Logo />
                </div>
                <div className="docs-bars__activity-panel">
                    <InputText />
                    <MainSettingsBar />
                </div>
            </div>
            <div className="docs-primary-toolbars">
                <div className="docs-primary-toolbars__buttons-place">
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.NewSlide />}
                        action={() => {}}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.ArrowThatOpensTheListVertical />}
                        action={() => {}}
                    />
                    <div className="create-line"></div>
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Undo />}
                        action={() => {}}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Redo />}
                        action={() => {}}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.CopyFormatting />}
                        action={() => {}}
                    />
                    <div className="create-line"></div>
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Cursor />}
                        action={() => {}}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.TextField />}
                        action={() => {}}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Photo />}
                        action={() => {}}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Figure />}
                        action={() => {}}
                    />
                    <Button
                        type={ButtonType.Icon}
                        icon={<ButtonIcon.Line />}
                        action={() => {}}
                    />
                    <div className="create-line"></div>
                    <Button
                        text={'Фон'}
                        type={ButtonType.Text}
                        action={() => {}}
                    />
                    <div className="create-line"></div>
                    <Button
                        text={'Макет'}
                        type={ButtonType.Text}
                        action={() => {}}
                    />
                    <div className="create-line"></div>
                    <Button
                        text={'Тема'}
                        type={ButtonType.Text}
                        action={() => {}}
                    />
                </div>
            </div>
        </header>
    );
};

export { Title };
