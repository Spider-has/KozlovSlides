import { RefObject, useEffect } from 'react';
import { Point } from './figureTypes';

type OnDragStartFunc = (args: {
    onDragAction: (event: MouseEvent) => void;
    onDropAction: (event: MouseEvent) => void;
    onClickAction: (event: MouseEvent) => void;
}) => void;

type OnDragStartFuncWithClick = (args: {
    onDragAction: (event: MouseEvent) => void;
    onClick: (event: MouseEvent) => void;
}) => void;

const useClickOut = (action: () => void, visibility: boolean, elementRef: React.RefObject<Node>) => {
    useEffect(() => {
        if (visibility) {
            const handle = (event: MouseEvent) => {
                const tar = event.target as HTMLElement;
                if (visibility && elementRef.current && !elementRef.current.contains(tar)) {
                    action();
                }
            };

            setTimeout(() => {
                document.addEventListener('click', handle);
            }, 0);

            return () => {
                document.removeEventListener('click', handle);
            };
        }
    }, [visibility]);
};

const useObjectsDragAndDrop = (ref: RefObject<HTMLElement>, startElemPos: Point) => {
    const onDragStart: OnDragStartFunc = ({ onDragAction, onDropAction, onClickAction }) => {
        useEffect(() => {
            console.log(1);
            const onMouseUp = (e: MouseEvent) => {
                onDropAction(e);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            const onMouseMove = (e: MouseEvent) => {
                onDragAction(e);
            };

            const onMouseDown = (e: MouseEvent) => {
                onClickAction(e);
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            };

            ref.current!.addEventListener('mousedown', onMouseDown);
            return () => {
                if (ref.current! != null) ref!.current!.removeEventListener('mousedown', onMouseDown);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
        }, [startElemPos]);
    };
    return onDragStart;
};

const useObjectsDragAndDropWithClick = (startElemPos: Point) => {
    const onDragStart: OnDragStartFuncWithClick = ({ onDragAction, onClick }) => {
        useEffect(() => {
            const onMouseDown = (e: MouseEvent) => {
                onClick(e);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseDown);
            };

            const onMouseMove = (e: MouseEvent) => {
                onDragAction(e);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mousedown', onMouseDown);

            return () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mousedown', onMouseDown);
            };
        }, [startElemPos]);
    };
    return onDragStart;
};

export { useObjectsDragAndDrop, useObjectsDragAndDropWithClick, useClickOut };
