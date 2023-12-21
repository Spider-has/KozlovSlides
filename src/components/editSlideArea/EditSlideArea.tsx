import { Id, Slide } from '../../model/types';
import {
    FigureObjects,
    ObjectType,
    RectangleElement,
    SlideElement,
} from '../../model/figureTypes';
import './EditSlideArea.css';
import { useEffect, useRef } from 'react';
import { useAppActions } from '../../store/hooks';

const SlideEditSpace = (props: { slide: Slide }) => {
    return (
        <div className="edit-slide-area">
            {props.slide.id}
            <div className="main-edit-slide-space">
                <svg
                    className="svg-space"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <AllObjects slideElements={props.slide.elements} />
                </svg>
            </div>
        </div>
    );
};

const SlideObject = (props: SlideElement) => {
    const { createChangeSelectedElementsAction } = useAppActions();
    const elem = { ...props };
    let Obj = <></>;
    const ref = useRef(null);
    useDragAndDrop(
        ref,
        {
            x: elem.position.x,
            y: elem.position.y,
        },
        elem.id,
        {
            onDragAction: () => {},
            onDropAction: () => {},
            onClickAction: () => {
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
                    Obj = <Rectangle elem={elem} elemRef={ref} />;
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

    return <g>{Obj}</g>;
};

type OnDragStartFunc = {
    onDragAction: () => void;
    onDropAction: () => void;
    onClickAction: () => void;
};

const useDragAndDrop = (
    ref: React.RefObject<SVGGElement>,
    startElemPos: { x: number; y: number },
    elemId: Id,
    Actions: OnDragStartFunc,
) => {
    const { createChangeElementsPositionAction } = useAppActions();
    console.log('start1', startElemPos);
    useEffect(() => {
        const startMousePosition = {
            x: 0,
            y: 0,
        };
        const elementOldPosition = {
            x: 0,
            y: 0,
        };
        const onMouseUp = (e: MouseEvent) => {
            console.log('up');
            Actions.onDropAction();
            createChangeElementsPositionAction(
                {
                    x: e.pageX - startMousePosition.x,
                    y: e.pageY - startMousePosition.y,
                },
                [elemId],
            );
            ref.current!.style.position = '';
            ref.current!.style.zIndex = '';
            ref.current!.style.border = '';

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousedown', onMouseDown);
        };

        const onMouseMove = (e: MouseEvent) => {
            ref.current!.style.zIndex = '1';
            ref.current!.setAttribute(
                'x',
                elementOldPosition.x + e.pageX - startMousePosition.x + 'px',
            );

            ref.current!.setAttribute(
                'y',
                elementOldPosition.y + e.pageY - startMousePosition.y + 'px',
            );
            Actions.onDragAction();
        };
        const onMouseDown = (e: MouseEvent) => {
            startMousePosition.x = e.pageX;
            startMousePosition.y = e.pageY;
            elementOldPosition.x = Number(ref.current!.getAttribute('x'));
            elementOldPosition.y = Number(ref.current!.getAttribute('y'));
            elementOldPosition.x = elementOldPosition.x
                ? elementOldPosition.x
                : 0;
            elementOldPosition.y = elementOldPosition.y
                ? elementOldPosition.y
                : 0;
            Actions.onClickAction();
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        console.log('initDragAndDrop');
        ref.current!.addEventListener('mousedown', onMouseDown);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousedown', onMouseDown);
        };
    }, []);
};

const AllObjects = (props: { slideElements: SlideElement[] }) => {
    const objects = props.slideElements.map((elem, i) => {
        return <SlideObject {...elem} key={i} />;
    });
    return <>{objects}</>;
};

const Rectangle = (props: {
    elem: RectangleElement;
    elemRef: React.RefObject<SVGRectElement>;
}) => {
    const elem = { ...props.elem };
    const ref = props.elemRef;
    return (
        <rect
            ref={ref}
            x={elem.position.x}
            y={elem.position.y}
            width={elem.properties.size.width}
            height={elem.properties.size.height}
            fill={elem.properties.color ? elem.properties.color : 'black'}
            stroke={elem.properties.border?.color}
        />
    );
};

export { SlideEditSpace };
