import { Slide } from '../../model/types';
import './SlideBar.css';

const SlidePreview = (props: { slide: Slide }) => {
    const slideElementsList = props.slide.elements.map(
        ({ id, position, data }, i) => (
            <div key={i}>
                {id}
                {position.x}
                {position.y}
                {typeof data}
            </div>
        ),
    );
    return <div className="slide-preview">{slideElementsList}</div>;
};

const SlidePreviewArea = (props: { slide: Slide; id: number }) => {
    return (
        <div className="slide-preview-area">
            <div className="slide-preview-area__id-area">{props.slide.id}</div>
            <div className="slide-preview-area__preview-area">
                <SlidePreview slide={props.slide} />
            </div>
        </div>
    );
};

const SlidePreviewList = (props: { slides: Slide[] }) => {
    const slidesPreviewList = props.slides.map((slide, i) => (
        <SlidePreviewArea key={slide.id} id={i + 1} slide={slide} />
    ));
    return <div className="slide-preview-list">{slidesPreviewList}</div>;
};

export { SlidePreviewList };
