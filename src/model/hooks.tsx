import { RefObject, useEffect } from 'react';
import { Point } from './figureTypes';

type OnDragStartFunc = (args: {
    onDragAction: (event: MouseEvent) => void;
    onDropAction: (event: MouseEvent) => void;
    onClickAction: (event: MouseEvent) => void;
}) => void;

const useObjectsDragAndDrop = (ref: RefObject<HTMLElement>, startElemPos: Point) => {
    const onDragStart: OnDragStartFunc = ({ onDragAction, onDropAction, onClickAction }) => {
        useEffect(() => {
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

type DnDManager = (args: { onDrag: (event: MouseEvent) => void; onDrop: (event: MouseEvent) => void }) => {
    onDragStart: () => void;
    clearDragListeners: () => void;
};

const useDnDManager: DnDManager = ({ onDrag, onDrop }) => {
    const onMouseUp = (e: MouseEvent) => {
        onDrop(e);
    };

    const onMouseMove = (e: MouseEvent) => {
        onDrag(e);
    };

    const onDragStart = () => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    const clearDragListeners = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
    return { onDragStart, clearDragListeners };
};

export { useObjectsDragAndDrop, useDnDManager };
