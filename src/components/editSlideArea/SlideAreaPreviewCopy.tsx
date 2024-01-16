import { BackgroundType, Slide } from '../../model/types';
import { ObjectType, SlideElement } from '../../model/figureTypes';
import styles from './EditSlideArea.module.css';
import { useRef } from 'react';

import { getElementByType } from '../../model/reactUtils';

const ActiveSlideAreaPreview = (props: { slide: Slide }) => {
    const elems = props.slide.elements;
    const objects = elems.map(elem => {
        return <SlideObject element={elem} key={elem.id} />;
    });
    let backgroundSlide = '';
    if (props.slide.background.type == BackgroundType.Color) {
        backgroundSlide = props.slide.background.color;
    }

    if (props.slide.background.type == BackgroundType.Color) {
        backgroundSlide = props.slide.background.color;
    } else if (props.slide.background.type == BackgroundType.Image) {
        backgroundSlide = `url(${props.slide.background.url})`;
    }
    return (
        <div
            className={styles.mainEditSlideSpace}
            style={{
                backgroundColor: props.slide.background.type == BackgroundType.Color ? backgroundSlide : '',
                backgroundImage: props.slide.background.type == BackgroundType.Image ? backgroundSlide : '',
            }}
        >
            {objects}
        </div>
    );
};

const SlideObject = (props: { element: SlideElement }) => {
    const elem = { ...props.element };
    const svgRef = useRef<HTMLDivElement>(null);
    const Obj = getElementByType(elem, svgRef);
    const rotatation = elem.elementType == ObjectType.Audio ? 0 : elem.properties.rotateAngle;
    return (
        <div
            className={`${styles.svgWrapper}`}
            style={{
                zIndex: elem.layer,
                top: elem.position.y + 'px',
                left: elem.position.x + 'px',
                width: elem.size.width + 'px',
                height: elem.size.height + 'px',
                transform: `rotate(${rotatation}rad)`,
            }}
            id={`object_${elem.id}`}
        >
            {Obj}
        </div>
    );
};

export { ActiveSlideAreaPreview };
