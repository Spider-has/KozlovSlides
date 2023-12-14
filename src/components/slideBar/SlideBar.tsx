import { Id, Slide } from '../../model/types';
import { useAppActions } from '../../store/hooks';
import './SlideBar.css';
import { useEffect, useState } from 'react';

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

const useShiftAction = (DownAction: () => void, UpAction: () => void) => {
    useEffect(() => {
        const handleDown = (event: { key: string }) => {
            if (event.key == 'Shift') {
                console.log('shift!');
                DownAction();
            }
        };
        const handleUp = (event: { key: string }) => {
            if (event.key == 'Shift') {
                console.log('not shift!');
                UpAction();
            }
        };

        document.addEventListener('keydown', handleDown);
        document.addEventListener('keyup', handleUp);
        return () => {
            document.removeEventListener('keyup', handleUp);
            document.removeEventListener('keydown', handleDown);
        };
    }, []);
};

const SlidePreviewArea = (props: {
    slide: Slide;
    id: number;
    isShifted: boolean;
    isSelected: boolean;
    selectedSlides: Id[];
}) => {
    const { createChangeSelectedSlidesAction } = useAppActions();
    const selectedSlides = [...props.selectedSlides];
    const selectedSlideClass = props.isSelected
        ? 'slide-preview-area__preview-area_selected'
        : '';
    return (
        <div
            className="slide-preview-area"
            onClick={() => {
                if (!props.isSelected && !props.isShifted) {
                    createChangeSelectedSlidesAction([props.slide.id]);
                } else {
                    if (props.isShifted) {
                        console.log('mnogo');
                    }
                    if (props.isSelected) {
                        if (!selectedSlides.includes(props.slide.id))
                            createChangeSelectedSlidesAction([props.slide.id]);
                    }
                }
                console.log(selectedSlides);
                // console.log(props.isShifted);
                //console.log('selected: ', props.isSelected);
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

const SlidePreviewList = (props: { slides: Slide[]; selectedSlides: Id[] }) => {
    const [isShifted, setShifted] = useState(false);
    const selectedSlides = [...props.selectedSlides];
    useShiftAction(
        () => {
            setShifted(true);
        },
        () => {
            setShifted(false);
        },
    );
    const slidesPreviewList = props.slides.map((slide, i) => {
        const selected = selectedSlides.includes(slide.id);
        return (
            <SlidePreviewArea
                key={i}
                id={i + 1}
                slide={slide}
                isShifted={isShifted}
                isSelected={selected}
                selectedSlides={selectedSlides}
            />
        );
    });

    return <div className="slide-preview-list">{slidesPreviewList}</div>;
};

export { SlidePreviewList };
