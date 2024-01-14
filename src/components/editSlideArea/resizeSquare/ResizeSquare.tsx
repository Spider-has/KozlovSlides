import { RefObject, useRef } from 'react';
import { Point, SlideElement } from '../../../model/figureTypes';
import { useAppActions } from '../../../store/hooks';
import {
    changeStyleHeight,
    changeStyleLeft,
    changeStylePosition,
    changeStyleSize,
    changeStyleTop,
    changeStyleWidth,
} from '../../../model/utils';
import { useObjectsDragAndDrop } from '../../../model/hooks';
import styles from './ResizeSquare.module.css';

const SelectedElementMode = (props: { element: SlideElement; parentRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.element };
    const { createChangeElementsPositionAction, createChangeElementsSizeAction } = useAppActions();
    const parent = props.parentRef;
    const startMousePos = { x: 0, y: 0 };
    const elemPos = { x: elem.position.x, y: elem.position.y };

    const changeElementSize = (startMousePos: Point, mousePos: Point) => {
        if (!(mousePos.x - startMousePos.x === 0 && mousePos.y - startMousePos.y === 0)) {
            createChangeElementsSizeAction({
                x: startMousePos.x - mousePos.x,
                y: startMousePos.y - mousePos.y,
            });
        }
    };

    const changeElementPos = (startMousePos: Point, mousePos: Point) => {
        if (!(mousePos.x - startMousePos.x === 0 && mousePos.y - startMousePos.y === 0)) {
            createChangeElementsPositionAction({
                x: mousePos.x - startMousePos.x,
                y: mousePos.y - startMousePos.y,
            });
        }
    };

    const changeElementPosAndSize = (startMousePos: Point, mousePos: Point) => {
        if (!(mousePos.x - startMousePos.x === 0 && mousePos.y - startMousePos.y === 0)) {
            createChangeElementsPositionAction({
                x: mousePos.x - startMousePos.x,
                y: mousePos.y - startMousePos.y,
            });
            createChangeElementsSizeAction({
                x: startMousePos.x - mousePos.x,
                y: startMousePos.y - mousePos.y,
            });
        }
    };

    const clickAction = (event: MouseEvent) => {
        startMousePos.x = event.pageX;
        startMousePos.y = event.pageY;
    };

    return (
        <>
            <ResizeSquare
                elemPos={elemPos}
                parentRef={parent}
                resizeDragParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeStylePosition(parent, elem.position, mousePostion, startMousePos);
                    changeStyleSize(parent, elem.size, mousePostion, startMousePos);
                }}
                resizeDropParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeElementPosAndSize(startMousePos, mousePostion);
                }}
                clickParams={event => {
                    clickAction(event);
                }}
                position={{ x: '-6px', y: '-5px' }}
                cursor="nwse-resize"
            />
            <ResizeSquare
                elemPos={elemPos}
                parentRef={parent}
                resizeDragParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeStyleTop(parent, elem.position.y, mousePostion.y, startMousePos.y);
                    changeStyleHeight(parent, elem.size.height, mousePostion.y, startMousePos.y);
                }}
                resizeDropParams={event => {
                    const mousePostion = { x: startMousePos.x, y: event.pageY };
                    changeElementPosAndSize(startMousePos, mousePostion);
                }}
                clickParams={event => {
                    clickAction(event);
                }}
                position={{ x: 'calc(50% - 4px)', y: '-5px' }}
                cursor="ns-resize"
            />
            <ResizeSquare
                elemPos={elemPos}
                parentRef={parent}
                resizeDragParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeStyleTop(parent, elem.position.y, mousePostion.y, startMousePos.y);
                    changeStyleWidth(parent, elem.size.width, startMousePos.x, mousePostion.x);
                    changeStyleHeight(parent, elem.size.height, mousePostion.y, startMousePos.y);
                }}
                resizeDropParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeElementSize(
                        { x: mousePostion.x, y: startMousePos.y },
                        { x: startMousePos.x, y: mousePostion.y },
                    );
                    changeElementPos({ x: 0, y: startMousePos.y }, { x: 0, y: mousePostion.y });
                }}
                clickParams={event => {
                    clickAction(event);
                }}
                position={{ x: 'calc(100% - 1px)', y: '-5px' }}
                cursor="nesw-resize"
            />
            <ResizeSquare
                elemPos={elemPos}
                parentRef={parent}
                resizeDragParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeStyleLeft(parent, elem.position.x, mousePostion.x, startMousePos.x);
                    changeStyleWidth(parent, elem.size.width, mousePostion.x, startMousePos.x);
                }}
                resizeDropParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeElementSize({ x: startMousePos.x, y: 0 }, { x: mousePostion.x, y: 0 });
                    changeElementPos({ x: startMousePos.x, y: 0 }, { x: mousePostion.x, y: 0 });
                }}
                clickParams={event => {
                    clickAction(event);
                }}
                position={{ x: '-6px', y: 'calc(50% - 5px)' }}
                cursor="ew-resize"
            />
            <ResizeSquare
                elemPos={elemPos}
                parentRef={parent}
                resizeDragParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeStyleWidth(parent, elem.size.width, startMousePos.x, mousePostion.x);
                }}
                resizeDropParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeElementSize({ x: mousePostion.x, y: 0 }, { x: startMousePos.x, y: 0 });
                }}
                clickParams={event => {
                    clickAction(event);
                }}
                position={{ x: 'calc(100% - 1px)', y: 'calc(50% - 5px)' }}
                cursor="ew-resize"
            />
            <ResizeSquare
                elemPos={elemPos}
                parentRef={parent}
                resizeDragParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeStyleLeft(parent, elem.position.x, mousePostion.x, startMousePos.x);
                    changeStyleWidth(parent, elem.size.width, mousePostion.x, startMousePos.x);
                    changeStyleHeight(parent, elem.size.height, startMousePos.y, mousePostion.y);
                }}
                resizeDropParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeElementSize(
                        { x: startMousePos.x, y: mousePostion.y },
                        { x: mousePostion.x, y: startMousePos.y },
                    );
                    changeElementPos({ x: startMousePos.x, y: 0 }, { x: mousePostion.x, y: 0 });
                }}
                clickParams={event => {
                    clickAction(event);
                }}
                position={{ x: '-5px', y: 'calc(100% - 1px)' }}
                cursor="nesw-resize"
            />
            <ResizeSquare
                elemPos={elemPos}
                parentRef={parent}
                resizeDragParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeStyleHeight(parent, elem.size.height, startMousePos.y, mousePostion.y);
                }}
                resizeDropParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeElementSize({ x: 0, y: mousePostion.y }, { x: 0, y: startMousePos.y });
                }}
                clickParams={event => {
                    clickAction(event);
                }}
                position={{ x: 'calc(50% - 4px)', y: 'calc(100% - 1px)' }}
                cursor="ns-resize"
            />
            <ResizeSquare
                elemPos={elemPos}
                parentRef={parent}
                resizeDragParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeStyleWidth(parent, elem.size.width, startMousePos.x, mousePostion.x);
                    changeStyleHeight(parent, elem.size.height, startMousePos.y, mousePostion.y);
                }}
                resizeDropParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeElementSize(
                        { x: mousePostion.x, y: mousePostion.y },
                        { x: startMousePos.x, y: startMousePos.y },
                    );
                }}
                clickParams={event => {
                    clickAction(event);
                }}
                position={{ x: 'calc(100% - 1px)', y: 'calc(100% - 1px)' }}
                cursor="nwse-resize"
            />
        </>
    );
};

const ResizeSquare = (props: {
    elemPos: Point;
    parentRef: RefObject<HTMLDivElement>;
    resizeDragParams: (e: MouseEvent) => void;
    resizeDropParams: (e: MouseEvent) => void;
    clickParams: (e: MouseEvent) => void;
    position: { x: string; y: string };
    cursor: string;
}) => {
    const squareRef = useRef<HTMLDivElement>(null);
    const figureResizeDnD = useObjectsDragAndDrop(squareRef, {
        x: props.elemPos.x,
        y: props.elemPos.y,
    });
    figureResizeDnD({
        onDragAction(event) {
            props.parentRef.current!.style.zIndex = '2';
            props.resizeDragParams(event);
        },
        onDropAction(event) {
            props.resizeDropParams(event);
        },
        onClickAction(event) {
            props.clickParams(event);
        },
    });
    return (
        <div
            ref={squareRef}
            className={styles.scaleSquare}
            style={{
                cursor: props.cursor,
                top: props.position.y,
                left: props.position.x,
            }}
        ></div>
    );
};

const ResizeSquareWithoutHooks = () => {
    return (
        <>
            <div
                className={styles.scaleSquare}
                style={{
                    top: '-5px',
                    left: '-6px',
                }}
            ></div>
            <div
                className={styles.scaleSquare}
                style={{
                    top: '-5px',
                    left: 'calc(50% - 4px)',
                }}
            ></div>
            <div
                className={styles.scaleSquare}
                style={{
                    top: '-5px',
                    right: '-6px',
                }}
            ></div>
            <div
                className={styles.scaleSquare}
                style={{
                    top: 'calc(50% - 5px)',
                    left: '-6px',
                }}
            ></div>
            <div
                className={styles.scaleSquare}
                style={{
                    top: 'calc(50% - 5px)',
                    right: '-6px',
                }}
            ></div>
            <div
                className={styles.scaleSquare}
                style={{
                    bottom: '-5px',
                    left: '-6px',
                }}
            ></div>
            <div
                className={styles.scaleSquare}
                style={{
                    bottom: '-5px',
                    left: 'calc(50% - 6px)',
                }}
            ></div>
            <div
                className={styles.scaleSquare}
                style={{
                    bottom: '-5px',
                    right: '-6px',
                }}
            ></div>
        </>
    );
};

export { ResizeSquare, SelectedElementMode, ResizeSquareWithoutHooks };
