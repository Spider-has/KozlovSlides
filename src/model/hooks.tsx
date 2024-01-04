import { RefObject, useEffect } from 'react';
import { Id } from './types';
import { Point } from './figureTypes';

type OnDragStartFunc = {
    onDragAction: () => void;
    onDropAction: (newPosition: Point, id: Id[]) => void;
    onClickAction: () => void;
};

const useObjectsDragAndDrop = (
    ref: RefObject<HTMLDivElement>,
    startElemPos: { x: number; y: number },
    elemId: Id,
    Actions: OnDragStartFunc,
) => {
    useEffect(() => {
        const startMousePosition = {
            x: 0,
            y: 0,
        };
        const onMouseUp = (e: MouseEvent) => {
            console.log('up');
            if (
                !(
                    e.pageX - startMousePosition.x === 0 &&
                    e.pageY - startMousePosition.y === 0
                )
            ) {
                Actions.onDropAction(
                    {
                        x: e.pageX - startMousePosition.x,
                        y: e.pageY - startMousePosition.y,
                    },
                    [elemId],
                );
            }
            ref.current!.style.position = '';
            ref.current!.style.zIndex = '';
            ref.current!.style.border = '';

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
            ref.current!.style.zIndex = '1';
            ref.current!.style.left =
                startElemPos.x + e.pageX - startMousePosition.x + 'px';
            ref.current!.style.top =
                startElemPos.y + e.pageY - startMousePosition.y + 'px';
            Actions.onDragAction();
        };

        const onMouseDown = (e: MouseEvent) => {
            startMousePosition.x = e.pageX;
            startMousePosition.y = e.pageY;
            Actions.onClickAction();
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        ref.current!.addEventListener('mousedown', onMouseDown);
        return () => {
            if (ref.current! != null)
                ref!.current!.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [startElemPos]);
};

export { useObjectsDragAndDrop };
