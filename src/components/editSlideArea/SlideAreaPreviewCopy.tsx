import { Slide } from '../../model/types';
import { FigureObjects, ObjectType, RectangleElement, SlideElement } from '../../model/figureTypes';
import styles from './EditSlideArea.module.css';

const ActiveSlidePreviewArea = (props: { slide: Slide }) => {
    const objects = props.slide.elements.map((elem, i) => {
        return <SlideObject elements={elem} key={i} />;
    });
    return <div className={styles.mainEditSlideSpace}>{objects}</div>;
};

const SlideObject = (props: { elements: SlideElement }) => {
    const elem = { ...props.elements };
    let Obj = <></>;
    switch (elem.elementType) {
        case ObjectType.Text: {
            Obj = <></>;
            break;
        }
        case ObjectType.Graphic: {
            switch (elem.figureType) {
                case FigureObjects.Rectangle: {
                    Obj = <Rectangle elem={elem} />;
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

    return (
        <div
            className="svg-wrapper"
            style={{
                top: elem.position.y + 'px',
                left: elem.position.x + 'px',
            }}
        >
            {Obj}
        </div>
    );
};

const Rectangle = (props: { elem: RectangleElement }) => {
    const elem = { ...props.elem };
    return (
        <svg
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

export { ActiveSlidePreviewArea };
