import { BackgroundType, Id, Slide, UserActions } from '../../model/types';
import { FigureObjects, ObjectType, SlideElement } from '../../model/figureTypes';
import styles from './EditSlideArea.module.css';
import { RefObject, useRef, useState } from 'react';
import { useAppActions, useAppSelector } from '../../store/hooks';
import { useObjectsDragAndDrop, useObjectsDragAndDropWithClick, useShiftAction } from '../../model/hooks';
import {
    changeStylePosition,
    changeStyleSize,
    checkElemsCollision,
    generateRandomId,
    getNumfromPxString,
} from '../../model/utils';
import {
    defaultEllipseObject,
    defaultImageObject,
    defaultRectangleObject,
    defaultTextObject,
    defaultTriangleObject,
} from '../../model/models';
import { ResizeSquareWithoutHooks, SelectedElementMode } from './resizeSquare/ResizeSquare';
import { getElementByType } from '../../model/reactUtils';
import { ContextMenu } from '../contextMenu/ContextMenu';

const SlideEditSpace = (props: { slide: Slide }) => {
    const areaRef = useRef<HTMLDivElement>(null);
    const [MenuParams, setParams] = useState({ isOpened: false, position: { x: 0, y: 0 } });
    return (
        <div
            onContextMenu={e => {
                e.preventDefault();
                setParams({
                    isOpened: true,
                    position: {
                        x: e.pageX - areaRef.current!.getBoundingClientRect().x,
                        y: e.pageY - areaRef.current!.getBoundingClientRect().y,
                    },
                });
            }}
            ref={areaRef}
            className={styles.editSlideArea}
        >
            <ContextMenu
                isOpened={MenuParams.isOpened}
                setOpened={(isOpened1: boolean) => {
                    setParams({ isOpened: isOpened1, position: MenuParams.position });
                }}
                menuPos={MenuParams.position}
            />
            <ActiveSlideArea slide={props.slide} editAreaRef={areaRef} />
        </div>
    );
};

const MultipleElementSelect = (props: { multipleSelectionRef: RefObject<HTMLDivElement> }) => {
    return <div className={styles.multipleSelectionBlock} ref={props.multipleSelectionRef}></div>;
};

const ActiveSlideArea = (props: { slide: Slide; editAreaRef: RefObject<HTMLDivElement> }) => {
    const elems = props.slide.elements;
    const editAreaRef = props.editAreaRef;
    const figureAreaRef = useRef<HTMLDivElement>(null);
    const multipleSelectRef = useRef<HTMLDivElement>(null);
    const newFigureRef = useRef<HTMLDivElement>(null);
    const { createChangeSelectedElementsAction, createCreateNewAlementAction } = useAppActions();
    const userAction = useAppSelector(state => state.slideBar.presentation.userAction);
    let defaultObject: SlideElement = defaultRectangleObject;

    switch (userAction.AddedElementType) {
        case ObjectType.Text: {
            defaultObject = defaultTextObject;
            break;
        }
        case ObjectType.Graphic: {
            switch (userAction.AddedFigureType) {
                case FigureObjects.Rectangle: {
                    defaultObject = defaultRectangleObject;
                    break;
                }
                case FigureObjects.Ellipse: {
                    defaultObject = defaultEllipseObject;
                    break;
                }
                case FigureObjects.Triangle: {
                    defaultObject = defaultTriangleObject;
                    break;
                }
            }
            break;
        }
        case ObjectType.Image: {
            defaultObject = { ...defaultImageObject, properties: { rotateAngle: 0, imgUrl: userAction.Url } };
            break;
        }
        default:
            defaultObject = defaultRectangleObject;
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

                if (
                    tar.classList.contains(styles.mainEditSlideSpace) ||
                    tar.classList.contains(styles.editSlideArea)
                ) {
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
                        {
                            x:
                                MultipleSelectionManager.startMousePos.x > event.pageX
                                    ? event.pageX
                                    : MultipleSelectionManager.startMousePos.x,
                            y:
                                MultipleSelectionManager.startMousePos.y > event.pageY
                                    ? event.pageY
                                    : MultipleSelectionManager.startMousePos.y,
                        },
                        {
                            x:
                                MultipleSelectionManager.startMousePos.x > event.pageX
                                    ? MultipleSelectionManager.startMousePos.x
                                    : event.pageX,
                            y:
                                MultipleSelectionManager.startMousePos.y > event.pageY
                                    ? MultipleSelectionManager.startMousePos.y
                                    : event.pageY,
                        },
                    );
                    changeStylePosition(
                        multipleSelectRef,
                        {
                            x: MultipleSelectionManager.startPos.x,
                            y: MultipleSelectionManager.startPos.y,
                        },
                        {
                            x: MultipleSelectionManager.startMousePos.x > event.pageX ? event.pageX : 0,
                            y: MultipleSelectionManager.startMousePos.y > event.pageY ? event.pageY : 0,
                        },
                        {
                            x:
                                MultipleSelectionManager.startMousePos.x > event.pageX
                                    ? MultipleSelectionManager.startMousePos.x
                                    : 0,
                            y:
                                MultipleSelectionManager.startMousePos.y > event.pageY
                                    ? MultipleSelectionManager.startMousePos.y
                                    : 0,
                        },
                    );
                    elems.forEach(elem => {
                        if (
                            checkElemsCollision(
                                {
                                    x: getNumfromPxString(multipleSelectRef.current!.style.left),
                                    y: getNumfromPxString(multipleSelectRef.current!.style.top),
                                    width: multipleSelectRef.current!.getBoundingClientRect().width,
                                    height: multipleSelectRef.current!.getBoundingClientRect().height,
                                },
                                {
                                    x:
                                        elem.position.x +
                                        (figureAreaRef.current!.getBoundingClientRect().x -
                                            editAreaRef.current!.getBoundingClientRect().x),
                                    y:
                                        elem.position.y +
                                        (figureAreaRef.current!.getBoundingClientRect().y -
                                            editAreaRef.current!.getBoundingClientRect().y),
                                    width: elem.size.width,
                                    height: elem.size.height,
                                },
                            )
                        ) {
                            const elemNode = editAreaRef.current!.querySelector(`#object_${elem.id}`);
                            elemNode?.classList.add(styles.svgWrapperSelected);
                            MultipleSelectionManager.selectedElemsId.add(elem.id);
                        } else {
                            const elemNode = editAreaRef.current!.querySelector(`#object_${elem.id}`);
                            elemNode?.classList.remove(styles.svgWrapperSelected);
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
                    createChangeSelectedElementsAction(Array.from(MultipleSelectionManager.selectedElemsId));
                }
            },
        });
    } else if (userAction.ActionType == UserActions.ADD_ELEMENT) {
        const addFigureDnd = useObjectsDragAndDropWithClick({ x: 0, y: 0 });
        addFigureDnd({
            onDragAction(event) {
                newFigureRef.current!.style.top =
                    event.pageY - figureAreaRef.current!.getBoundingClientRect().y + 'px';
                newFigureRef.current!.style.left =
                    event.pageX - figureAreaRef.current!.getBoundingClientRect().x + 'px';
            },
            onClick(event) {
                const tar = event.target as HTMLElement;
                if (editAreaRef.current!.contains(tar)) {
                    createCreateNewAlementAction({
                        ...defaultObject,
                        id: generateRandomId(),
                        position: {
                            x: event.pageX - figureAreaRef.current!.getBoundingClientRect().x,
                            y: event.pageY - figureAreaRef.current!.getBoundingClientRect().y,
                        },
                    });
                }
            },
        });
    }
    let backgroundSlide = '';
    if (props.slide.background.type == BackgroundType.Color) {
        backgroundSlide = props.slide.background.color;
    }
    const [isShifted, setShifted] = useState(false);
    useShiftAction(
        () => {
            setShifted(true);
        },
        () => {
            setShifted(false);
        },
    );
    const onSelectDnDAction = (isSelected: boolean, elemId: Id) => {
        if (!isSelected) {
            if (isShifted) {
                createChangeSelectedElementsAction([...props.slide.selectedElements, elemId]);
            } else createChangeSelectedElementsAction([elemId]);
        }
    };
    const objects = elems.map((elem, i) => {
        const isSelected = props.slide.selectedElements.includes(elem.id);
        return (
            <SlideObject
                element={elem}
                key={i}
                isSelected={isSelected}
                onSelectDnDAction={onSelectDnDAction}
            />
        );
    });

    return (
        <>
            <MultipleElementSelect multipleSelectionRef={multipleSelectRef} />
            <div
                ref={figureAreaRef}
                className={styles.mainEditSlideSpace}
                style={{ backgroundColor: backgroundSlide }}
            >
                {objects}
                {userAction.ActionType == UserActions.ADD_ELEMENT && (
                    <FigureCreationPreview element={defaultObject} svgRef={newFigureRef} />
                )}
            </div>
        </>
    );
};

const FigureCreationPreview = (props: { element: SlideElement; svgRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.element };
    const svgRef = useRef<HTMLDivElement>(null);
    const Obj = getElementByType(elem, svgRef);
    return (
        <div
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
            <ResizeSquareWithoutHooks />
        </div>
    );
};

const SlideObject = (props: {
    element: SlideElement;
    isSelected: boolean;
    onSelectDnDAction: (isSelected: boolean, elementId: Id) => void;
}) => {
    const { createChangeElementsPositionAction } = useAppActions();
    const elem = { ...props.element };
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
                }
            }
        },
        onClickAction(event) {
            startMousePos.x = event.pageX;
            startMousePos.y = event.pageY;
            setClass(ref, styles.svgWrapperSelected);
            props.onSelectDnDAction(props.isSelected, elem.id);
        },
    });

    const Obj = getElementByType(elem, svgRef);

    const setClass = (ref: RefObject<HTMLDivElement>, className: string) => {
        if (ref.current!) {
            ref.current!.classList.add(className);
        }
    };

    const rotatation = elem.elementType == ObjectType.Audio ? 0 : elem.properties.rotateAngle;
    const SelectedClass = props.isSelected ? styles.svgWrapperSelected : '';
    return (
        <div
            className={`${styles.svgWrapper} ${SelectedClass}`}
            style={{
                zIndex: elem.layer,
                top: elem.position.y + 'px',
                left: elem.position.x + 'px',
                width: elem.size.width + 'px',
                height: elem.size.height + 'px',
                transform: `rotate(${rotatation}rad)`,
            }}
            ref={ref}
            id={`object_${elem.id}`}
        >
            {Obj}
            {props.isSelected && <SelectedElementMode element={{ ...elem }} parentRef={ref} />}
        </div>
    );
};

export { SlideEditSpace, ActiveSlideArea };
