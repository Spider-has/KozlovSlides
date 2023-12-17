import { Slide } from '../../model/types';
import {
    FigureObjects,
    ObjectType,
    RectangleElement,
    SlideElement,
} from '../../model/figureTypes';
import './EditSlideArea.css';
import { useEffect, useRef } from 'react';

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
    const elem = { ...props };
    let Obj = <></>;
    switch (elem.elementType) {
        case ObjectType.Text: {
            Obj = <></>;
            break;
        }
        case ObjectType.Graphic: {
            switch (elem.figureType) {
                case FigureObjects.Rectangle: {
                    Obj = <Rectangle {...elem} />;
                    console.log(1);
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
};

const useDragAndDrop = (
    ref: React.RefObject<SVGGElement>,
    startElemPos: { x: number; y: number },
    Actions: OnDragStartFunc,
) => {
    useEffect(() => {
        const startMousePosition = {
            x: 0,
            y: 0,
        };
        const onMouseUp = () => {
            console.log('up');
            Actions.onDropAction();
            ref.current!.style.position = '';
            ref.current!.style.zIndex = '';
            ref.current!.style.border = '';
            ref.current!.style.left = '';
            ref.current!.style.top = '';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
            ref.current!.style.zIndex = '1';
            ref.current!.style.border = '2px solid black';
            ref.current!.setAttribute(
                'x',
                startElemPos.x + e.pageX - startMousePosition.x + 'px',
            );

            ref.current!.setAttribute(
                'y',
                startElemPos.y + e.pageY - startMousePosition.y + 'px',
            );
            Actions.onDragAction();
        };

        console.log('initDragAndDrop');
        ref.current!.addEventListener('mousedown', (e: MouseEvent) => {
            startMousePosition.x = e.pageX;
            startMousePosition.y = e.pageY;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }, []);
};

const AllObjects = (props: { slideElements: SlideElement[] }) => {
    const objects = props.slideElements.map((elem, i) => {
        return <SlideObject {...elem} key={i} />;
    });
    return <>{objects}</>;
};

const Rectangle = (props: RectangleElement) => {
    const elem = { ...props };
    const ref = useRef<SVGRectElement>(null);
    useDragAndDrop(
        ref,
        {
            x: elem.position.x,
            y: elem.position.y,
        },
        {
            onDragAction: () => {},
            onDropAction: () => {},
        },
    );

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
