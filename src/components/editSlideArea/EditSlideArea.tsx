import { Slide } from '../../model/types';
import {
    FigureObjects,
    ObjectType,
    RectangleElement,
    SlideElement,
} from '../../model/figureTypes';
import './EditSlideArea.css';

const SlideEditSpace = (props: { slide: Slide }) => {
    return (
        <div className="edit-slide-area">
            {props.slide.id}
            <div className="main-edit-slide-space">
                <svg
                    width="200"
                    height="250"
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
    switch (elem.elementType) {
        case ObjectType.Text: {
            return;
        }
        case ObjectType.Graphic: {
            switch (elem.figureType) {
                case FigureObjects.Rectangle: {
                    return <Rectangle {...elem} />;
                }
                case FigureObjects.Triangle:
                    return;
                case FigureObjects.Ellipse: {
                    return;
                }
                default:
                    return;
            }
        }
        case ObjectType.Image: {
            return;
        }
        case ObjectType.Video: {
            return;
        }
        case ObjectType.Audio: {
            return;
        }
        case ObjectType.FunctionGraph: {
            return;
        }
        default:
            return;
    }
};

// type OnDragStartFunc = {
//     onDragAction: () => void;
//     onDropAction: () => void;
// };

// const useDragAndDrop = (ref, Actions: OnDragStartFunc) => {
//     useEffect(() => {
//         console.log('initDragAndDrop');
//         document.addEventListener('mousedown', e => {
//             // const startPosition = {
//             //     x: e.pageX,
//             //     y: e.pageY,
//             // };
//             document.addEventListener('mousemove', () => {
//                 console.log('move');
//                 Actions.onDragAction();
//             });
//             document.addEventListener('mouseup', () => {
//                 Actions.onDropAction();
//             });
//         });
//     }, []);
// };

const AllObjects = (props: { slideElements: SlideElement[] }) => {
    const objects = props.slideElements.map((elem, i) => {
        return <SlideObject {...elem} key={i} />;
    });
    return <>{objects}</>;
};

const Rectangle = (props: RectangleElement) => {
    const elem = { ...props };
    return (
        <rect
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
