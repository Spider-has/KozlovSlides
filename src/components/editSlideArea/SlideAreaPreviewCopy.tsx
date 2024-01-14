import { Slide } from '../../model/types';
import { SlideElement } from '../../model/figureTypes';
import styles from './EditSlideArea.module.css';
import { useRef } from 'react';

import { getElementByType } from '../../model/reactUtils';

const ActiveSlideAreaPreview = (props: { slide: Slide }) => {
    const elems = props.slide.elements;
    const objects = elems.map(elem => {
        return <SlideObject element={elem} key={elem.id} />;
    });
    return <div className={styles.mainEditSlideSpace}>{objects}</div>;
};

const SlideObject = (props: { element: SlideElement }) => {
    const elem = { ...props.element };
    const svgRef = useRef<HTMLDivElement>(null);
    const Obj = getElementByType(elem, svgRef);
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
