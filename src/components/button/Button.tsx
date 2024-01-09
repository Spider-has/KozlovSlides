import * as Buttons from './icons/ButtonIcons';
import './Button.css';
import { ButtonProps, ButtonType } from '../../model/types';
const AllButtons = () => {
    return (
        <div>
            <Buttons.ArrowThatOpensTheList />
            <Buttons.Audio />
            <Buttons.Border />
            <Buttons.Center />
            <Buttons.ChangeBg />
            <Buttons.ChooseLayout />
            <Buttons.Copy />
            <Buttons.CopyFormatting />
            <Buttons.Create />
            <Buttons.Cut />
            <Buttons.Delete />
            <Buttons.Diagram />
            <Buttons.Download />
            <Buttons.Duplication />
            <Buttons.Figure />
            <Buttons.Group />
            <Buttons.GroupCancel />
            <Buttons.Insert />
            <Buttons.Intervals />
            <Buttons.Leveling />
            <Buttons.Line />
            <Buttons.Move />
            <Buttons.NewSlide />
            <Buttons.Numbering />
            <Buttons.Open />
            <Buttons.Photo />
            <Buttons.Preview />
            <Buttons.Redo />
            <Buttons.Remove />
            <Buttons.Rename />
            <Buttons.Rotate />
            <Buttons.SelectAll />
            <Buttons.Skip />
            <Buttons.Text />
            <Buttons.TextField />
            <Buttons.Undo />
            <Buttons.Video />
        </div>
    );
};

const Button = (props: ButtonProps) => {
    console.log(props.type, props.type >= 4, props.text)
    return (
        <div className={props.type >= 4 ? "button-block__full" : 'button-block'} onClick={props.action}>
            {(props.type == ButtonType.Icon ||
                props.type == ButtonType.IconText) || (props.type == ButtonType.FullIcon ||
                    props.type == ButtonType.FullIconText) &&
                props.icon}
            {(props.type == ButtonType.Text ||
                props.type == ButtonType.IconText) || (props.type == ButtonType.FullText ||
                    props.type == ButtonType.FullIconText) && (
                    <button className="button-block__button" id={props.text}>{props.text}</button>
                )}
        </div>
    );
};

export { AllButtons, Button };
