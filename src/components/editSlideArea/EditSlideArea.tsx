import { Slide, UserActions } from '../../model/types';
import { FigureObjects, ObjectType, Point, SlideElement } from '../../model/figureTypes';
import styles from './EditSlideArea.module.css';
import { RefObject, useRef } from 'react';
import { useAppActions, useAppSelector } from '../../store/hooks';
import { useObjectsDragAndDrop, useObjectsDragAndDropWithClick } from '../../model/hooks';
import {
    changeStyleHeight,
    changeStyleLeft,
    changeStylePosition,
    changeStyleSize,
    changeStyleTop,
    changeStyleWidth,
    checkElemsCollision,
    generateRandomId,
} from '../../model/utils';
import { Ellipse, ImageObj, Rectangle, TextObj, Triangle, VideoObj } from '../figures/Figures';
import { defaultEllipseObject, defaultImageObject, defaultRectangleObject, defaultTextObject, defaultTriangleObject } from '../../model/models';

const SlideEditSpace = (props: { slide: Slide }) => {
    return (
        <div
            className={styles.editSlideArea}
            onSelect={() => {
                return false;
            }}
            onMouseMove={() => {
                return false;
            }}
        >
            <ActiveSlideArea slide={props.slide} />
        </div>
    );
};

const MultipleElementSelect = (props: { multipleSelectionRef: RefObject<HTMLDivElement> }) => {
    return <div className={styles.multipleSelectionBlock} ref={props.multipleSelectionRef}></div>;
};

const ActiveSlideArea = (props: { slide: Slide }) => {
    const elems = props.slide.elements;
    const objects = elems.map((elem, i) => {
        const isSelected = props.slide.selectedElements.includes(elem.id);
        return <SlideObject element={elem} key={i} isSelected={isSelected} />;
    });
    const editAreaRef = useRef<HTMLDivElement>(null);
    const multipleSelectRef = useRef<HTMLDivElement>(null);
    const newFigureRef = useRef<HTMLDivElement>(null);
    const { createChangeSelectedElementsAction, createCreateNewAlementAction } = useAppActions();
    const userAction = useAppSelector(state => state.slideBar.presentation.userAction)
    let defaultObject: SlideElement = defaultRectangleObject;
    switch (userAction.AddedElementType) {
        case ObjectType.Text: {
            defaultObject = defaultTextObject
            break;
        }
        case ObjectType.Graphic: {
            switch (userAction.AddedFigureType) {
                case FigureObjects.Rectangle: {
                    defaultObject = defaultRectangleObject
                    break;
                }
                case FigureObjects.Ellipse: {
                    defaultObject = defaultEllipseObject
                    break;
                }
                case FigureObjects.Triangle: {
                    defaultObject = defaultTriangleObject
                    break;
                }
            }
            break;
        }
        case ObjectType.Image: {
            defaultObject = { ...defaultImageObject, properties: { imgUrl: userAction.Url } }
            break;
        }
        default:
            defaultObject = defaultRectangleObject
    }
    if (userAction.ActionType == UserActions.SLIDE_EDIT) {
        const figureDnD = useObjectsDragAndDrop(editAreaRef, {
            x: 0,
            y: 0,
        });
        const MultipleSelectionManager = {
            canSelect: false,
            startPos: {
                x: 0,
                y: 0,
            },
            startMousePos: {
                x: 0,
                y: 0,
            },
            selectedElemsId: new Set<string>(),
        };
        figureDnD({
            onClickAction(event) {
                const tar = event.target as HTMLElement;
                if (tar.classList.contains(styles.mainEditSlideSpace)) {
                    console.log('Выделяем');
                    MultipleSelectionManager.canSelect = true;
                    multipleSelectRef.current!.style.display = 'block';
                    multipleSelectRef.current!.style.zIndex = '9999';
                    MultipleSelectionManager.startPos.x =
                        event.pageX - editAreaRef.current!.getBoundingClientRect().x;
                    MultipleSelectionManager.startPos.y =
                        event.pageY - editAreaRef.current!.getBoundingClientRect().y;
                    multipleSelectRef.current!.style.left = MultipleSelectionManager.startPos.x + 'px';
                    multipleSelectRef.current!.style.top = MultipleSelectionManager.startPos.y + 'px';
                    MultipleSelectionManager.startMousePos.x = event.pageX;
                    MultipleSelectionManager.startMousePos.y = event.pageY;
                }
            },
            onDragAction(event) {
                if (MultipleSelectionManager.canSelect) {
                    changeStyleSize(
                        multipleSelectRef,
                        { width: 0, height: 0 },
                        MultipleSelectionManager.startMousePos,
                        { x: event.pageX, y: event.pageY },
                    );
                    elems.forEach(elem => {
                        if (
                            checkElemsCollision(
                                {
                                    x: MultipleSelectionManager.startPos.x,
                                    y: MultipleSelectionManager.startPos.y,
                                    width: event.pageX - MultipleSelectionManager.startMousePos.x,
                                    height: event.pageY - MultipleSelectionManager.startMousePos.y,
                                },
                                {
                                    x: elem.position.x,
                                    y: elem.position.y,
                                    width: elem.size.width,
                                    height: elem.size.height,
                                },
                            )
                        ) {
                            const elemNode = editAreaRef.current!.querySelector(`#object_${elem.id}`);
                            elemNode?.classList.add(styles.svgWrapperSelected);
                            MultipleSelectionManager.selectedElemsId.add(elem.id);
                        } else {
                            MultipleSelectionManager.selectedElemsId.delete(elem.id);
                        }
                    });
                }
            },
            onDropAction() {
                if (MultipleSelectionManager.canSelect) {
                    MultipleSelectionManager.canSelect = false;
                    multipleSelectRef.current!.style.display = 'none';
                    multipleSelectRef.current!.style.left = '';
                    multipleSelectRef.current!.style.top = '';
                    multipleSelectRef.current!.style.width = '';
                    multipleSelectRef.current!.style.height = '';
                    console.log('не выделяем');
                    createChangeSelectedElementsAction(Array.from(MultipleSelectionManager.selectedElemsId));
                }
            },
        });
    }
    else
        if (userAction.ActionType == UserActions.ADD_ELEMENT) {
            const addFigureDnd = useObjectsDragAndDropWithClick({ x: 0, y: 0 })
            addFigureDnd({
                onDragAction(event) {
                    newFigureRef.current!.style.top = event.pageY - editAreaRef.current!.getBoundingClientRect().y + 'px';
                    newFigureRef.current!.style.left = event.pageX - editAreaRef.current!.getBoundingClientRect().x + 'px';
                }, onClick(event) {
                    const tar = event.target as HTMLElement
                    if (editAreaRef.current!.contains(tar)) {
                        createCreateNewAlementAction({
                            ...defaultObject,
                            id: generateRandomId(),
                            position: { x: event.pageX - editAreaRef.current!.getBoundingClientRect().x, y: event.pageY - editAreaRef.current!.getBoundingClientRect().y }
                        })
                    }
                },
            })
        }
    return (
        <div className={styles.mainEditSlideSpace} ref={editAreaRef}>
            <MultipleElementSelect multipleSelectionRef={multipleSelectRef} />
            {objects}
            {userAction.ActionType == UserActions.ADD_ELEMENT && <FigureCreationPreview element={defaultObject} svgRef={newFigureRef} />}
        </div>
    );
};

const FigureCreationPreview = (props: { element: SlideElement, svgRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.element };
    let Obj = <></>;
    const svgRef = useRef<HTMLDivElement>(null)
    switch (elem.elementType) {
        case ObjectType.Graphic: {
            switch (elem.figureType) {
                case FigureObjects.Rectangle: {
                    Obj = <Rectangle elem={elem} svgRef={svgRef} />;
                    break;
                }
                case FigureObjects.Triangle: {
                    Obj = <Triangle elem={elem} svgRef={svgRef} />;
                    break;
                }
                case FigureObjects.Ellipse: {
                    Obj = <Ellipse elem={elem} svgRef={svgRef} />;
                    break;
                }
                default:
                    Obj = <></>;
                    break;
            }
            break;
        }
        case ObjectType.Text: {
            Obj = <TextObj elem={elem} svgRef={svgRef} />
            break;
        }
        case ObjectType.Image: {
            Obj = <ImageObj elem={elem} svgRef={svgRef} />
            break;
        }
        default:
            Obj = <></>;
    }
    return (<div
        className={`${styles.svgWrapper} ${styles.figurePreview} ${styles.svgWrapperSelected}`}
        style={{
            top: elem.position.y + 'px',
            left: elem.position.x + 'px',
            width: elem.size.width + 'px',
            height: elem.size.height + 'px',
        }}
        ref={props.svgRef}
    >
        {Obj}
        <div
            className={styles.scaleSquare}
            style={{
                top: "-5px",
                left: "-6px",
            }}
        ></div>
        <div
            className={styles.scaleSquare}
            style={{
                top: "-5px",
                left: "calc(50% - 4px)",
            }}
        ></div>
        <div
            className={styles.scaleSquare}
            style={{
                top: "-5px",
                right: "-6px",
            }}
        ></div>
        <div
            className={styles.scaleSquare}
            style={{
                top: "calc(50% - 5px)",
                left: "-6px",
            }}
        ></div>
        <div
            className={styles.scaleSquare}
            style={{
                top: "calc(50% - 5px)",
                right: "-6px",
            }}
        ></div>
        <div
            className={styles.scaleSquare}
            style={{
                bottom: "-5px",
                left: "-6px",
            }}
        ></div>
        <div
            className={styles.scaleSquare}
            style={{
                bottom: "-5px",
                left: "calc(50% - 6px)",
            }}
        ></div>
        <div
            className={styles.scaleSquare}
            style={{
                bottom: "-5px",
                right: "-6px",
            }}
        ></div>
    </div>)
}

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
    const startMousePos = {
        x: 0,
        y: 0,
    };
    figureDnD({
        onDragAction(event) {
            changeStylePosition(ref, elem.position, { x: event.pageX, y: event.pageY }, startMousePos);
        },
        onDropAction(event) {
            if (!(event.pageX - startMousePos.x === 0 && event.pageY - startMousePos.y === 0)) {
                if (props.isSelected) {
                    createChangeElementsPositionAction({
                        x: event.pageX - startMousePos.x,
                        y: event.pageY - startMousePos.y,
                    });
                } else {
                    createChangePositionAndSelectElementAction(elem.id, {
                        x: event.pageX - startMousePos.x,
                        y: event.pageY - startMousePos.y,
                    });
                }
            }
            ref.current!.style.zIndex = '';
        },
        onClickAction(event) {
            startMousePos.x = event.pageX;
            startMousePos.y = event.pageY;
            setClass(ref, styles.svgWrapperSelected);
            console.log('КЛИКНУЛИ');
            if (!props.isSelected) createChangeSelectedElementsAction([elem.id]);
        },
    });

    switch (elem.elementType) {
        case ObjectType.Text: {
            Obj = <TextObj elem={elem} svgRef={svgRef} />;
            break;
        }
        case ObjectType.Graphic: {
            switch (elem.figureType) {
                case FigureObjects.Rectangle: {
                    Obj = <Rectangle elem={elem} svgRef={svgRef} />;
                    break;
                }
                case FigureObjects.Triangle: {
                    Obj = <Triangle elem={elem} svgRef={svgRef} />;
                    break;
                }
                case FigureObjects.Ellipse: {
                    Obj = <Ellipse elem={elem} svgRef={svgRef} />;
                    break;
                }
                default:
                    Obj = <></>;
                    break;
            }
            break;
        }
        case ObjectType.Image: {
            Obj = <ImageObj elem={elem} svgRef={svgRef} />;
            break;
        }
        case ObjectType.Video: {
            Obj = <VideoObj elem={elem} svgRef={svgRef} />;
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

    const SelectedClass = props.isSelected ? styles.svgWrapperSelected : '';
    return (
        <div
            className={`${styles.svgWrapper} ${SelectedClass}`}
            style={{
                top: elem.position.y + 'px',
                left: elem.position.x + 'px',
                width: elem.size.width + 'px',
                height: elem.size.height + 'px',
            }}
            ref={ref}
            id={`object_${elem.id}`}
        >
            {Obj}
            {props.isSelected && <SelectedElementMode element={{ ...elem }} parentRef={ref} />}
        </div>
    );
};

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

export { SlideEditSpace, ActiveSlideArea };
