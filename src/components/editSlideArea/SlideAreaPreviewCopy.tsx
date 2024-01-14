import { Slide } from '../../model/types';
import { FigureObjects, ObjectType, SlideElement } from '../../model/figureTypes';
import styles from './EditSlideArea.module.css';
import { useRef } from 'react';

import { Ellipse, ImageObj, Rectangle, TextObj, Triangle, VideoObj } from '../figures/Figures';

const ActiveSlideAreaPreview = (props: { slide: Slide }) => {
    const elems = props.slide.elements;
    console.log('ActiveSlideAreaPreview ' + props.slide.id)
    const objects = elems.map((elem) => {
        return <SlideObject element={elem} key={elem.id} />;
    });
    return (
        <div className={styles.mainEditSlideSpace}>
            {objects}
        </div>
    );
};

const SlideObject = (props: { element: SlideElement; }) => {
    const elem = { ...props.element };
    let Obj = <></>;
    const svgRef = useRef<HTMLDivElement>(null)
    console.log('SlideObject ' + props.element.id)
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
    return (
        <div
            className={`${styles.svgWrapper}`}
            style={{
                top: elem.position.y + 'px',
                left: elem.position.x + 'px',
                width: elem.size.width + 'px',
                height: elem.size.height + 'px',
            }}
            id={`object_${elem.id}`}
        >
            {Obj}
        </div>
    );
};

export { ActiveSlideAreaPreview };
