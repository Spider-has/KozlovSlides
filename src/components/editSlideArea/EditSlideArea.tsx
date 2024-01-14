import { Slide, UserActions } from '../../model/types';
import { FigureObjects, ObjectType, SlideElement } from '../../model/figureTypes';
import styles from './EditSlideArea.module.css';
import { RefObject, useRef } from 'react';
import { useAppActions, useAppSelector } from '../../store/hooks';
import { useObjectsDragAndDrop, useObjectsDragAndDropWithClick } from '../../model/hooks';
import {
    changeStylePosition,
    changeStyleSize,
    checkElemsCollision,
    generateRandomId,
} from '../../model/utils';
import {
    defaultEllipseObject,
    defaultImageObject,
    defaultRectangleObject,
    defaultTextObject,
    defaultTriangleObject,
} from '../../model/models';
import { SelectedElementMode } from './resizeSquare/ResizeSquare';
import { getElementByType } from '../../model/reactUtils';

const SlideEditSpace = (props: { slide: Slide }) => {
    return (
        <div className={styles.editSlideArea}>
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
            defaultObject = { ...defaultImageObject, properties: { imgUrl: userAction.Url } };
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
    } else if (userAction.ActionType == UserActions.ADD_ELEMENT) {
        const addFigureDnd = useObjectsDragAndDropWithClick({ x: 0, y: 0 });
        addFigureDnd({
            onDragAction(event) {
                newFigureRef.current!.style.top =
                    event.pageY - editAreaRef.current!.getBoundingClientRect().y + 'px';
                newFigureRef.current!.style.left =
                    event.pageX - editAreaRef.current!.getBoundingClientRect().x + 'px';
            },
            onClick(event) {
                const tar = event.target as HTMLElement;
                if (editAreaRef.current!.contains(tar)) {
                    createCreateNewAlementAction({
                        ...defaultObject,
                        id: generateRandomId(),
                        position: {
                            x: event.pageX - editAreaRef.current!.getBoundingClientRect().x,
                            y: event.pageY - editAreaRef.current!.getBoundingClientRect().y,
                        },
                    });
                }
            },
        });
    }
    return (
        <div className={styles.mainEditSlideSpace} ref={editAreaRef}>
            <MultipleElementSelect multipleSelectionRef={multipleSelectRef} />
            {objects}
            {userAction.ActionType == UserActions.ADD_ELEMENT && (
                <FigureCreationPreview element={defaultObject} svgRef={newFigureRef} />
            )}
        </div>
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
        </div>
    );
};

const SlideObject = (props: { element: SlideElement; isSelected: boolean }) => {
    const { createChangeSelectedElementsAction, createChangeElementsPositionAction } = useAppActions();
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

    const Obj = getElementByType(elem, svgRef);

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

export { SlideEditSpace, ActiveSlideArea };
