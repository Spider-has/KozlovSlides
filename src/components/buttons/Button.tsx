import styles from './Button.module.css';
import { ButtonProps, ButtonType } from '../../model/types';
const Button = (props: ButtonProps) => {
    return (
        <div className={props.type >= 3 ? styles.buttonBlockFull : styles.buttonBlock} onClick={props.action}>
            {
                ((props.type == ButtonType.Icon) || (props.type == ButtonType.IconText) || (props.type == ButtonType.FullIcon) ||
                    (props.type == ButtonType.FullIconText)) && !props.right && props.icon
            }
            {
                ((props.type == ButtonType.Text) || (props.type == ButtonType.IconText) || (props.type == ButtonType.FullText) ||
                    (props.type == ButtonType.FullIconText)) && (
                    <button className={styles.buttonBlockButton} id={props.text}>{props.text}</button>
                )
            }
            {
                ((props.type == ButtonType.Icon) || (props.type == ButtonType.IconText) || (props.type == ButtonType.FullIcon) ||
                    (props.type == ButtonType.FullIconText)) && props.right && props.icon
            }
        </div>
    )
};

export { Button };
