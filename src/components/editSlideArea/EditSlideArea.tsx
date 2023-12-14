// import {
//     FigureObjects,
//     GraphicObject,
//     ObjectType,
//     RectangleObject,
//     Slide,
//     SlideElement,
// } from '../../model/types';
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

// const Rectangle = (props: { element: SlideElement }) => {
//     let elem: SlideElement = {
//         id: '',
//         position: {
//             x: 0,
//             y: 0,
//         },
//         type: ObjectType.Graphic,
//         data: {
//             type: FigureObjects.Rectangle,
//             rotateAngle: 0,
//             opacity: 0,
//             figureData: {
//                 type: FigureObjects.Rectangle,
//                 rounding: 0,
//                 size: {
//                     width: 0,
//                     height: 0,
//                 },
//             },
//         },
//     };
//     if (
//         props.element.type === ObjectType.Graphic &&
//         props.element.data.type === FigureObjects.Rectangle
//     ) {
//         elem = { ...props.element };
//     }
//     return <rect x={elem.position.x} y={elem.position.y} />;
// };
export { SlideEditSpace };
