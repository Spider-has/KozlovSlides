import { useRef, useState } from "react";
import { useClickOut } from "../../../model/hooks";
import { Button } from "../../button/Button";
import styles from "./Colors.module.css";
import { ButtonType } from "../../../model/types";
import * as ButtonIcon from '../icons/ButtonIcons';
import { colorList } from "../../../model/models";
import NewColorButtonButton from "./SketchPicker/SketchPicker";

export const Colors = (props: { name: string; onColorClick: (colorName: string) => void }) => {
    const [visible, setVisible] = useState(false);
    const colorRef = useRef(null);
    useClickOut(
        () => {
            setVisible(!visible);
        },
        visible,
        colorRef,
    );
    return (
        <div className={styles.colorPalitra}>
            {props.name === 'Цвет' && (
                <Button
                    type={ButtonType.FullIconText}
                    icon={<ButtonIcon.FillIcon />}
                    text={props.name}
                    action={() => {
                        setVisible(true);
                    }}
                />
            )}
            {props.name === 'Изменить цвет фона' && (
                <Button
                    type={ButtonType.FullIconText}
                    icon={<ButtonIcon.ChangeBg />}
                    text={props.name}
                    action={() => {
                        setVisible(true);
                    }}
                />
            )}
            {visible && (
                <div ref={colorRef} className={styles.colorPanel}>
                    {colorList.map((elem, i) => (
                        <div className={styles.colorPalitraRow} key={i}>
                            {elem.map((elem, i) => (
                                <button
                                    id={elem}
                                    key={i}
                                    className={styles.colorPalitraRowElement}
                                    onClick={() => {
                                        const newColor = elem;
                                        props.onColorClick(newColor);
                                    }}
                                    style={{ backgroundColor: elem }}
                                ></button>
                            ))
                            }
                        </div>
                    ))}

                    <div className={styles.newColorArea}>
                        <div className={styles.colorText}>Другой</div>
                        <div className={styles.newColorButtonsArea}>
                            <div className={styles.NewColorButton}>
                                <Button
                                    type={ButtonType.Icon}
                                    icon={<NewColorButtonButton />}
                                    action={() => {
                                        setVisible(true);
                                    }}
                                ></Button>
                            </div>
                        </div>
                        <div className={styles.noColorButton}>
                            <div className={styles.noColorButtonArea}>
                                <Button
                                    type={ButtonType.FullIconText}
                                    icon={<ButtonIcon.NoColor></ButtonIcon.NoColor>}
                                    text={'Прозрачный'}
                                    action={() => {
                                        setVisible(true);
                                    }}
                                ></Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
