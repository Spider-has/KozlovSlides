const Button = (props: {ButtonName: "file" | "edit" | "object" | "format" | "insert" | "slide"}) => {
    let ButtonName = props.ButtonName as string;
    const ButtonClass = ButtonName + "-button";
    const ButtonClick = () => {
        document.addEventListener('click', closeOnClick);
    };
    const closeOnClick = event => {
        if (
            !event.target.classList.contains(ButtonClass)
        ) {
            document.removeEventListener('click', closeOnClick);
        }
    };
    switch(ButtonName) {
        case "edit": 
        {
            ButtonName="Правка"; 
            break;
        }
        case "file": 
        {
            ButtonName="Файл"; 
            break;
        }
        case "format": 
        {
            ButtonName="Формат"; 
            break;
        }
        case "object": 
        {
            ButtonName="Объект"; 
            break;
        }
        case "slide": 
        {
            ButtonName="Слайд"; 
            break;
        }
        case "insert": 
        {
            ButtonName="Вставка"; 
            break;
        }
    }
    return (
        <div className={"menu-button " + ButtonClass} onClick={ButtonClick}>
            {ButtonName}
        </div>
    );
};

const MainMenuButtons = () => {
    return (
        <div className = "docs-menubars">
            <Button ButtonName="file" />
            <Button ButtonName="edit" />
            <Button ButtonName="insert" />
            <Button ButtonName="format" />
            <Button ButtonName="slide" />
            <Button ButtonName="object" />
        </div>
    );
};

export {MainMenuButtons};