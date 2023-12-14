import { Slide } from '../../model/types';
import './EditSlideArea.css';

const SlideEditSpace = (props: { slide: Slide }) => {
    return <div className="edit-slide-area">{props.slide.id}</div>;
};

export { SlideEditSpace };
