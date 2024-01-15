import { useRef } from 'react';
import styles from './ContextMenu.module.css';
import { useClickOut } from '../../model/hooks';
import { Point } from '../../model/figureTypes';

const ContextMenu = (props: {
    isOpened: boolean;
    setOpened: (isOpened: boolean) => void;
    menuPos: Point;
}) => {
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
            </div>
        )
    );
};

export { ContextMenu };
