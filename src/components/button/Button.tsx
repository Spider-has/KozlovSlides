<<<<<<< Updated upstream
/*import { ArrowThatOpensTheList } from './icons/CopyFormatting';
import { Audio } from './icons/Delete';
import { Border } from './icons/Download';
import { Center } from './icons/Insert';
import { ChangeBg } from './icons/Redo';
import { ChooseLayout } from './icons/Undo';
import { Copy } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';
import { Create } from './icons/Create';*/
import * as Buttons from './ButtonIcons';
=======
import * as Buttons from './icons/ButtonIcons';
>>>>>>> Stashed changes
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
    return (
        <div className="button-block" onClick={props.action}>
            {(props.type == ButtonType.Icon ||
                props.type == ButtonType.IconText) &&
                props.icon}
            {(props.type == ButtonType.Text ||
                props.type == ButtonType.IconText) && (
                <button className="button-block__button">{props.text}</button>
            )}
        </div>
    );
};

export { AllButtons, Button };
