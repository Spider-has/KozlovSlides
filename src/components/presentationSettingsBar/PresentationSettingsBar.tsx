import { useEffect, useRef, useState } from 'react';
import './PresentationSettingsBar.css';
import { Button } from '../button/Button';
import { ButtonWithActionListProps } from '../../model/types';
import {
    EditButtonList,
    FileButtonList,
    FormatButtonList,
    InsertionButtonList,
    ObjectButtonList,
    SlideButtonList,
} from '../../model/models';
import * as ButtonIcon from '../button/ButtonIcons';

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

    const enterDownHandler = event => {
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
                spanRef.current.offsetWidth + 1000 + 'px';
            console.log(inputRef.current.style.width);
            setName(inputRef.current.value);
        }
    };

    const closeOnClick = event => {
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
            const handle = event => {
                console.log(visibility);
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

const Title = () => {
    const FileButtonSection: ButtonWithActionListProps = FileButtonList;
    const EditButtonSection: ButtonWithActionListProps = EditButtonList;
    const InsertionButtonSection: ButtonWithActionListProps =
        InsertionButtonList;
    const FormatButtonSection: ButtonWithActionListProps = FormatButtonList;
    const SlideButtonSection: ButtonWithActionListProps = SlideButtonList;
    const ObjectButtonSection: ButtonWithActionListProps = ObjectButtonList;
    return (
        <header className="docs-bars">
            <div className="docs-bars__activity-panel">
                <InputText />
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
                <div className="docs-primary-toolbars">
                    <Button
                        type="icon"
                        icon={<ButtonIcon.NewSlide />}
                        action={() => {}}
                    />
                    <Button
                        type="icon"
                        icon={<ButtonIcon.Undo />}
                        action={() => {}}
                    />
                    <Button
                        type="icon"
                        icon={<ButtonIcon.Redo />}
                        action={() => {}}
                    />
                    <Button
                        type="icon"
                        icon={<ButtonIcon.CopyFormatting />}
                        action={() => {}}
                    />
                    <Button
                        type="icon"
                        icon={<ButtonIcon.Cursor />}
                        action={() => {}}
                    />
                    <Button
                        type="icon"
                        icon={<ButtonIcon.TextField />}
                        action={() => {}}
                    />
                    <Button
                        type="icon"
                        icon={<ButtonIcon.Photo />}
                        action={() => {}}
                    />
                    <Button
                        type="icon"
                        icon={<ButtonIcon.Figure />}
                        action={() => {}}
                    />
                    <Button
                        type="icon"
                        icon={<ButtonIcon.Line />}
                        action={() => {}}
                    />
                    <Button text={'Фон'} type="text" action={() => {}} />
                    <Button text={'Макет'} type="text" action={() => {}} />
                    <Button text={'Тема'} type="text" action={() => {}} />
                </div>
            </div>
        </header>
    );
};

export { Title };
