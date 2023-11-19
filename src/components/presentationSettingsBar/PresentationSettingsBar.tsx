import { useEffect, useRef, useState } from 'react';
import './PresentationSettingsBar.css';
import { Button } from '../button/Button';
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
            inputRef.current.style.width =
                spanRef.current.offsetWidth + 3 + 'px';
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

// const ActionList = () => {
//     return <div></div>;
// };

const Title = () => {
    return (
        <header className="docs-bars">
            <div className="docs-bars__activity-panel">
                <InputText />
                <div className="docs-menubars">
                    <Button text={'Файл'} type="text" action={() => {}} />
                    <Button text={'Правка'} type="text" action={() => {}} />
                    <Button text={'Вставка'} type="text" action={() => {}} />
                    <Button text={'Формат'} type="text" action={() => {}} />
                    <Button text={'Слайд'} type="text" action={() => {}} />
                    <Button text={'Объект'} type="text" action={() => {}} />
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
