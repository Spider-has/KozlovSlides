// import { FigureObjects, ObjectType, Slide } from '../../model/types';
// import { RectangleElement } from '../../model/figureTypes';
import { Slide } from '../../model/types';
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
                ></svg>
            </div>
        </div>
    );
};

// const Rectangle = (props: RectangleElement) => {
//     const elem = { ...props };
//     return <rect x={elem.position.x} y={elem.position.y} />;
// };
export { SlideEditSpace };
