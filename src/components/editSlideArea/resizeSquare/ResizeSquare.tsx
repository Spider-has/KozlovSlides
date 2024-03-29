import { RefObject, useRef } from 'react';
import { FigureObjects, ObjectType, Point, Size, SlideElement } from '../../../model/figureTypes';
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
    const rotatation = elem.elementType == ObjectType.Audio ? 0 : elem.properties.rotateAngle;

    const onTriangleChange = () => {
        if (elem.elementType == ObjectType.Graphic && elem.figureType == FigureObjects.Triangle) {
            const coefX = parent.current!.getBoundingClientRect().width / 100;
            const coefY = parent.current!.getBoundingClientRect().height / 100;
            const triangleSvg = parent.current!.querySelector(`#${elem.id}triangle`) as SVGPathElement;
            if (triangleSvg) {
                triangleSvg.setAttribute("d", `m${elem.properties.point1.x * coefX} ${elem.properties.point1.y * coefY
                    } L ${elem.properties.point2.x * coefX} ${elem.properties.point2.y * coefY
                    } L ${elem.properties.point3.x * coefX} ${elem.properties.point3.y * coefY
                    }`)
            }
        }
    }

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
            <RotationPoint
                elemPos={elemPos}
                parentRef={parent}
                startRotatation={rotatation}
                elemSize={elem.size}
            />
            <ResizeSquare
                elemPos={elemPos}
                parentRef={parent}
                resizeDragParams={event => {
                    const mousePostion = { x: event.pageX, y: event.pageY };
                    changeStylePosition(parent, elem.position, mousePostion, startMousePos);
                    changeStyleSize(parent, elem.size, mousePostion, startMousePos);
                    onTriangleChange();
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
                    onTriangleChange();
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
                    onTriangleChange();
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
                    onTriangleChange();
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
                    onTriangleChange();
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
                    onTriangleChange();
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
                    onTriangleChange();
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
                    onTriangleChange();
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

const RotationPoint = (props: {
    elemPos: Point;
    parentRef: RefObject<HTMLDivElement>;
    startRotatation: number;
    elemSize: Size;
}) => {
    const { createChangeElementsRotateAngleAction } = useAppActions();
    const squareRef = useRef<HTMLDivElement>(null);
    const startRotatation = props.startRotatation;
    const startMousePos = {
        x: 0,
        y: 0,
    };
    const figureResizeDnD = useObjectsDragAndDrop(squareRef, {
        x: startRotatation,
        y: 0,
    });

    const calculateAngle = (deltaX: number, deltaY: number): number => {
        let angle = 0;
        if (deltaX > 0 && deltaY >= 0) angle = Math.atan(deltaX / deltaY);
        if (deltaX > 0 && deltaY <= 0) angle = Math.atan(-deltaY / deltaX) + Math.PI / 2;
        if (deltaX <= 0 && deltaY <= 0) angle = Math.atan(deltaX / deltaY) + Math.PI;
        if (deltaX <= 0 && deltaY >= 0) angle = Math.atan(deltaY / -deltaX) + Math.PI * 1.5;
        return angle;
    };

    figureResizeDnD({
        onDragAction(event) {
            const deltaY = -(event.pageY - startMousePos.y);
            const deltaX = event.pageX - startMousePos.x;
            const angle = calculateAngle(deltaX, deltaY);
            props.parentRef.current!.style.transform = `rotate(${angle}rad)`;
        },
        onDropAction(event) {
            const deltaY = -(event.pageY - startMousePos.y);
            const deltaX = event.pageX - startMousePos.x;
            const angle = calculateAngle(deltaX, deltaY);
            createChangeElementsRotateAngleAction(angle);
        },
        onClickAction() {
            startMousePos.x =
                props.parentRef.current!.getBoundingClientRect().left + props.elemSize.width / 2;
            startMousePos.y =
                props.parentRef.current!.getBoundingClientRect().top + props.elemSize.height / 2;
        },
    });
    return (
        <div>
            <div className={styles.rotationPointLine}></div>
            <div ref={squareRef} className={styles.rotationPoint}></div>
        </div>
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
