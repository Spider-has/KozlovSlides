import { useRef } from 'react';
import styles from './ContextMenu.module.css';
import { useClickOut } from '../../model/hooks';
import { Point } from '../../model/figureTypes';
import { Button } from '../button/Button';
import { ButtonType } from '../../model/types';
import { useAppActions } from '../../store/hooks';

const ContextMenu = (props: {
    isOpened: boolean;
    setOpened: (isOpened: boolean) => void;
    menuPos: Point;
}) => {
    const { createChangeElementLayerActionHigher, createChangeElementLayerActionLower } = useAppActions();
    const menuRef = useRef<HTMLDivElement>(null);
    useClickOut(
        () => {
            console.log('close');
            props.setOpened(!props.isOpened);
        },
        props.isOpened,
        menuRef,
    );
    console.log(props.menuPos);
    return (
        props.isOpened && (
            <div
                style={{
                    top: props.menuPos.y + 'px',
                    left: props.menuPos.x + 'px',
                }}
                ref={menuRef}
                className={styles.contextMenu}
            >
                Контекстная менюшка
                <Button
                    type={ButtonType.Text}
                    text={'На передний план'}
                    action={() => {
                        createChangeElementLayerActionHigher();
                    }}
                />
                <Button
                    type={ButtonType.Text}
                    text={'На задний план'}
                    action={() => {
                        createChangeElementLayerActionLower();
                    }}
                />
            </div>
        )
    );
};

export { ContextMenu };
