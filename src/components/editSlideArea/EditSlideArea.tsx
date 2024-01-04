import { Id, Slide } from '../../model/types';
import {
    FigureObjects,
    ObjectType,
    Point,
    RectangleElement,
    SlideElement,
} from '../../model/figureTypes';
import './EditSlideArea.css';
import { RefObject, useRef } from 'react';
import { useAppActions } from '../../store/hooks';
import { useObjectsDragAndDrop } from '../../model/hooks';

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
    const ref = useRef(null);
    useObjectsDragAndDrop(
        ref,
        {
            x: elem.position.x,
            y: elem.position.y,
        },
        elem.id,
        {
            onDragAction: () => {},
            onDropAction: (newPosition: Point, id: Id[]) => {
                if (props.isSelected) {
                    createChangeElementsPositionAction(newPosition, id);
                } else {
                    createChangePositionAndSelectElementAction(
                        id[0],
                        newPosition,
                    );
                }
            },
            onClickAction: () => {
                setClass(ref, 'svg-wrapper_selected');
                if (!props.isSelected)
                    createChangeSelectedElementsAction([elem.id]);
            },
        },
    );
    switch (elem.elementType) {
        case ObjectType.Text: {
            Obj = <></>;
            break;
        }
        case ObjectType.Graphic: {
            switch (elem.figureType) {
                case FigureObjects.Rectangle: {
                    Obj = (
                        <Rectangle
                            elem={elem}
                            onClick={() => {
                                // if (!props.isSelected)
                                //     createChangeSelectedElementsAction([
                                //         elem.id,
                                //     ]);
                            }}
                        />
                    );
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
            }}
            ref={ref}
        >
            {Obj}
            {props.isSelected && <SelectedElementMode {...elem} />}
        </div>
    );
};

const SelectedElementMode = (props: SlideElement) => {
    const elem = { ...props };
    return (
        <>
            <div
                className="scale-square"
                style={{
                    top: '-5px',
                    left: '-6px',
                }}
            ></div>
            <div
                className="scale-square"
                style={{
                    top: '-5px',
                    left: elem.size.width / 2 - 4 + 'px',
                }}
            ></div>
            <div
                className="scale-square"
                style={{
                    top: '-5px',
                    right: '-6px',
                }}
            ></div>
            <div
                className="scale-square"
                style={{
                    top: elem.size.height / 2 - 5 + 'px',
                    left: '-6px',
                }}
            ></div>
            <div
                className="scale-square"
                style={{
                    top: elem.size.height / 2 - 5 + 'px',
                    right: '-6px',
                }}
            ></div>
            <div
                className="scale-square"
                style={{
                    bottom: '-5px',
                    left: '-6px',
                }}
            ></div>
            <div
                className="scale-square"
                style={{
                    bottom: '-5px',
                    left: elem.size.width / 2 - 6 + 'px',
                }}
            ></div>
            <div
                className="scale-square"
                style={{
                    bottom: '-5px',
                    right: '-6px',
                }}
            ></div>
        </>
    );
};

const Rectangle = (props: { elem: RectangleElement; onClick: () => void }) => {
    const elem = { ...props.elem };
    return (
        <svg
            onClick={() => {
                props.onClick();
            }}
            className="svg-space"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width: elem.size.width + 'px',
                height: elem.size.height + 'px',
            }}
        >
            <rect
                width={elem.size.width}
                height={elem.size.height}
                fill={elem.properties.color ? elem.properties.color : 'black'}
                stroke={elem.properties.border?.color}
            />
        </svg>
    );
};

export { SlideEditSpace, ActiveSlideArea };
