import { Id, Slide, SlideElement } from '../../model/types';

type slidePreview = {
    id: Id;
    elements: Array<SlideElement>;
};

const SlidePreview = (props: { elements: Array<SlideElement> }) => {
    const slideElementsList = props.elements.map(
        ({ id, position, data }, i) => (
            <div key={i}>
                {id}
                {position.x}
                {position.y}
                {typeof data}
            </div>
        ),
    );
    return <div>{slideElementsList}</div>;
};

const SlidePreviewArea = (props: slidePreview) => {
    return (
        <div className="slide-preview-area">
            <div className="slide-preview-area__id-area">{props.id}</div>
            <div className="slide-preview-area__preview-area">
                <SlidePreview elements={props.elements} />
            </div>
        </div>
    );
};

const SlidePreviewList = (props: { elements: Array<Slide> }) => {
    const slidesPreviewList = props.elements.map(({ id, elements }) => (
        <SlidePreviewArea key={id} id={id} elements={elements} />
    ));
    return <div>{slidesPreviewList}</div>;
};

export { SlidePreviewList };
