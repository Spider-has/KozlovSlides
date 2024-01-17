import { useRef } from 'react';
import styles from './ContextMenu.module.css';
import { useClickOut } from '../../model/hooks';
import { Point } from '../../model/figureTypes';
import { Button } from '../button/Button';
import { ButtonType } from '../../model/types';
import { useAppActions } from '../../store/hooks';
import * as ButtonIcons from '../buttons/icons/ButtonIcons';

const ContextMenu = (props: {
    isOpened: boolean;
    setOpened: (isOpened: boolean) => void;
    menuPos: Point;
}) => {
    const { createChangeElementLayerActionHigher, createChangeElementLayerActionLower } = useAppActions();
    const menuRef = useRef<HTMLDivElement>(null);
    useClickOut(
        () => {
            props.setOpened(!props.isOpened);
        },
        props.isOpened,
        menuRef,
    );
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
                <div className={styles.text}>Контекстная менюшка</div>
                <Button
                    text={'Вырезать'}
                    type={ButtonType.FullIconText}
                    action={() => { }}
                    icon={<ButtonIcons.Cut />}
                />
                <Button
                    text={'Копировать'}
                    type={ButtonType.FullIconText}
                    action={() => { }}
                    icon={<ButtonIcons.Copy />}
                />
                <Button
                    text={'Вставить'}
                    type={ButtonType.FullIconText}
                    action={() => { }}
                    icon={<ButtonIcons.Insert />}
                />
                <Button

                    type={ButtonType.FullIconText}
                    text={'Удалить'}
                    action={() => { }}
                    icon={<ButtonIcons.Delete />}
                />
                <Button
                    type={ButtonType.FullText}
                    text={'Переместить вперед'}
                    action={() => {
                        createChangeElementLayerActionHigher();
                    }}
                />
                <Button
                    type={ButtonType.FullText}
                    text={'Переместить назад'}
                    action={() => {
                        createChangeElementLayerActionLower();
                    }}
                />
            </div>
        )
    );
};

export { ContextMenu };
