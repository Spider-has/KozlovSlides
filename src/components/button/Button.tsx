import * as Buttons from './icons/ButtonIcons';
import styles from './Button.module.css';
import { ButtonProps, ButtonType } from '../../model/types';
const AllButtons = () => {
    return (
        <div>
            <Buttons.ArrowThatOpensTheListHorisontal />
            <Buttons.ArrowThatOpensTheListVertical />
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
            <Buttons.Cursor />
            <Buttons.ArrowThatCloseTheList />
            <Buttons.Pattern />
            <Buttons.BorderColor />
            <Buttons.BorderWidth />
            <Buttons.BorderStyle />
            <Buttons.Draw />
            <Buttons.Arrow />
            <Buttons.Broken />
            <Buttons.Circle />
            <Buttons.Triangle />
            <Buttons.Rectangle />
            <Buttons.TextLeft />
            <Buttons.TextCenterX />
            <Buttons.TextRight />
            <Buttons.TextWidth />
            <Buttons.MoreTab />
            <Buttons.LessTab />
            <Buttons.TextCenterY />
            <Buttons.TextUp />
            <Buttons.NumList />
            <Buttons.TextDown />
            <Buttons.MarkList />
        </div>
    );
};

const Button = (props: ButtonProps) => {
    return (
        <div className={props.type >= 3 ? styles.buttonBlockFull : styles.buttonBlock} onClick={props.action}>
            {
                ((props.type == ButtonType.Icon) || (props.type == ButtonType.IconText) || (props.type == ButtonType.FullIcon) ||
                    (props.type == ButtonType.FullIconText)) && props.icon
            }
            {
                ((props.type == ButtonType.Text) || (props.type == ButtonType.IconText) || (props.type == ButtonType.FullText) ||
                    (props.type == ButtonType.FullIconText)) && (
                    <button className={styles.buttonBlockButton} id={props.text}>{props.text}</button>
                )
            }
        </div>
    )
};

export { AllButtons, Button };
