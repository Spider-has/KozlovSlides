import { Slide } from '../../model/types';
import { FigureObjects, ObjectType, Point, RectangleElement, SlideElement } from '../../model/figureTypes';
import './EditSlideArea.css';
import { RefObject, useRef } from 'react';
import { useAppActions } from '../../store/hooks';
import { useObjectsDragAndDrop } from '../../model/hooks';
import {
    changeStyleHeight,
    changeStyleLeft,
    // changeStyleLeft,
    changeStylePosition,
    changeStyleSize,
    changeStyleTop,
    changeStyleWidth,
} from '../../model/utils';

const SlideEditSpace = (props: { slide: Slide }) => {
    return (
        <div className="edit-slide-area">
            {props.slide.id}
            <ActiveSlideArea slide={props.slide} />
        </div>
    );
};

const ActiveSlideArea = (props: { slide: Slide }) => {
    const objects = props.slide.elements.map((elem, i) => {
        const isSelected = props.slide.selectedElements.includes(elem.id);
        return <SlideObject element={elem} key={i} isSelected={isSelected} />;
    });
    return <div className="main-edit-slide-space">{objects}</div>;
};

const SlideObject = (props: { element: SlideElement; isSelected: boolean }) => {
    const {
        createChangeSelectedElementsAction,
        createChangeElementsPositionAction,
        createChangePositionAndSelectElementAction,
    } = useAppActions();
    const elem = { ...props.element };
    let Obj = <></>;
    const ref = useRef<HTMLDivElement>(null);
    const svgRef = useRef<HTMLDivElement>(null);
    const figureDnD = useObjectsDragAndDrop(svgRef, {
        x: elem.position.x,
        y: elem.position.y,
    });
    console.log('ELEMENT RERENDERED!');
    const startMousePos = {
        x: 0,
        y: 0,
    };
    figureDnD({
        onDragAction(event) {
            changeStylePosition(ref, elem.position, { x: event.pageX, y: event.pageY }, startMousePos);
            console.log('МЕНЯ ТАЩАТ');
        },
        onDropAction(event) {
            if (!(event.pageX - startMousePos.x === 0 && event.pageY - startMousePos.y === 0)) {
                if (props.isSelected) {
                    createChangeElementsPositionAction(
                        {
                            x: event.pageX - startMousePos.x,
                            y: event.pageY - startMousePos.y,
                        },
                        [elem.id],
                    );
                } else {
                    createChangePositionAndSelectElementAction(elem.id, {
                        x: event.pageX - startMousePos.x,
                        y: event.pageY - startMousePos.y,
                    });
                }
            }
            console.log('МЕНЯ НЕ ТАЩАТ');
            ref.current!.style.zIndex = '';
        },
        onClickAction(event) {
            console.log('МЕНЯ СЕЙЧАС ПОТАЩАТ');
            startMousePos.x = event.pageX;
            startMousePos.y = event.pageY;
            setClass(ref, 'svg-wrapper_selected');
            if (!props.isSelected) createChangeSelectedElementsAction([elem.id]);
        },
    });

    switch (elem.elementType) {
        case ObjectType.Text: {
            Obj = <></>;
            break;
        }
        case ObjectType.Graphic: {
            switch (elem.figureType) {
                case FigureObjects.Rectangle: {
                    Obj = <Rectangle elem={elem} svgRef={svgRef} />;
                    break;
                }
                case FigureObjects.Triangle: {
                    Obj = <></>;
                    break;
                }
                case FigureObjects.Ellipse: {
                    Obj = <></>;
                    break;
                }
                default:
                    Obj = <></>;
                    break;
            }
            break;
        }
        case ObjectType.Image: {
            Obj = <></>;
            break;
        }
        case ObjectType.Video: {
            Obj = <></>;
            break;
        }
        case ObjectType.Audio: {
            Obj = <></>;
            break;
        }
        case ObjectType.FunctionGraph: {
            Obj = <></>;
            break;
        }
        default: {
            Obj = <></>;
        }
    }

    const setClass = (ref: RefObject<HTMLDivElement>, className: string) => {
        if (ref.current!) {
            ref.current!.classList.add(className);
        }
    };

    const SelectedClass = props.isSelected ? 'svg-wrapper_selected' : '';
    return (
        <div
            className={`svg-wrapper ${SelectedClass}`}
            style={{
                top: elem.position.y + 'px',
                left: elem.position.x + 'px',
                width: elem.size.width + 'px',
                height: elem.size.height + 'px',
            }}
            ref={ref}
        >
            {Obj}
            {props.isSelected && <SelectedElementMode element={{ ...elem }} parentRef={ref} />}
        </div>
    );
};

const SelectedElementMode = (props: { element: SlideElement; parentRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.element };
    const { createChangeElementsPositionAction, createChangeElementsSize } = useAppActions();
    const parent = props.parentRef;
    const startMousePos = { x: 0, y: 0 };
    const elemPos = { x: elem.position.x, y: elem.position.y };

    const changeElementSize = (startMousePos: Point, mousePos: Point) => {
        if (!(mousePos.x - startMousePos.x === 0 && mousePos.y - startMousePos.y === 0)) {
            createChangeElementsSize(
                {
                    x: startMousePos.x - mousePos.x,
                    y: startMousePos.y - mousePos.y,
                },
                [elem.id],
            );
        }
    };

    const changeElementPos = (startMousePos: Point, mousePos: Point) => {
        if (!(mousePos.x - startMousePos.x === 0 && mousePos.y - startMousePos.y === 0)) {
            createChangeElementsPositionAction(
                {
                    x: mousePos.x - startMousePos.x,
                    y: mousePos.y - startMousePos.y,
                },
                [elem.id],
            );
        }
    };

    const changeElementPosAndSize = (startMousePos: Point, mousePos: Point) => {
        if (!(mousePos.x - startMousePos.x === 0 && mousePos.y - startMousePos.y === 0)) {
            createChangeElementsPositionAction(
                {
                    x: mousePos.x - startMousePos.x,
                    y: mousePos.y - startMousePos.y,
                },
                [elem.id],
            );
            createChangeElementsSize(
                {
                    x: startMousePos.x - mousePos.x,
                    y: startMousePos.y - mousePos.y,
                },
                [elem.id],
            );
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
            className="scale-square"
            style={{
                cursor: props.cursor,
                top: props.position.y,
                left: props.position.x,
            }}
        ></div>
    );
};

const Rectangle = (props: { elem: RectangleElement; svgRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.elem };
    const svgRef = props.svgRef;
    return (
        <div className="svg-space" ref={svgRef}>
            <svg className="svg-space" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <rect
                    width="100%"
                    height="100%"
                    fill={elem.properties.color ? elem.properties.color : 'black'}
                    stroke={elem.properties.border?.color}
                />
            </svg>
        </div>
    );
};

export { SlideEditSpace, ActiveSlideArea };
