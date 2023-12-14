import { Slide } from '../../model/types';
import { useAppActions } from '../../store/hooks';
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
    const { createSelectSlidesAction, createRemoveSelectSlidesAction } =
        useAppActions();
    const selectedSlideClass = props.slide.isSelected
        ? 'slide-preview-area__preview-area_selected'
        : '';
    // const isShift = useAppSelector(state => state.editor.shiftMode);
    return (
        <div
            className="slide-preview-area"
            onClick={() => {
                if (!props.slide.isSelected) {
                    createSelectSlidesAction([props.slide.id]);
                } else {
                    createRemoveSelectSlidesAction([props.slide.id]);
                }
            }}
        >
            <div className="slide-preview-area__id-area">{props.id}</div>
            <div
                className={`slide-preview-area__preview-area ${selectedSlideClass}`}
            >
                <SlidePreview slide={props.slide} />
            </div>
        </div>
    );
};

const SlidePreviewList = (props: { slides: Slide[] }) => {
    const slidesPreviewList = props.slides.map((slide, i) => (
        <SlidePreviewArea key={i} id={i + 1} slide={slide} />
    ));
    return <div className="slide-preview-list">{slidesPreviewList}</div>;
};

export { SlidePreviewList };
