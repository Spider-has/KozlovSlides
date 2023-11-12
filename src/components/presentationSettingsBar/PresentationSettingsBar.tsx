import { useRef, useState } from 'react';
import './PresentationSettingsBar.css';
const InputText = () => {
    const [name, setName] = useState('Презентация без названия');
    const inputRef = useRef<HTMLInputElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.classList.add('input-text__input_active');
            inputRef.current.focus();
            inputRef.current.addEventListener('keydown', enterDownHandler);
            inputRef.current.addEventListener('click', closeOnClick);
        }
    };

    const enterDownHandler = event => {
        console.log(event.code);
        if (event.code == 'Enter') {
            if (inputRef.current) {
                inputRef.current.classList.remove('input-text__input_active');
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
                spanRef.current.offsetWidth + 15 + 'px';
            setName(inputRef.current.value);
        }
    };

    const closeOnClick = event => {
        if (
            !event.target.classList.contains('input-text__input') &&
            inputRef.current
        ) {
            inputRef.current.classList.remove('input-text__input_active');
            inputRef.current.removeEventListener('click', closeOnClick);
        }
    };
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
                onInput={changeInputWidth}
            />
        </div>
    );
};

const Title = () => {
    return (
        <div>
            <InputText />
        </div>
    );
};

export { Title };
