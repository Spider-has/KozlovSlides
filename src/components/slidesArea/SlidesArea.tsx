import { BackgroundType, Id, Slide } from '../../model/types';
import { useAppSelector } from '../../store/hooks';
import { SlideEditSpace } from '../editSlideArea/EditSlideArea';
import { SlidePreviewList } from '../slideBar/SlideBar';
import './SlidesArea.css';

const getSlideById = (slides: Slide[], slideId: Id): Slide => {
    for (const slide of slides) {
        if (slide.id === slideId) {
            return slide;
        }
    }
    if (slides[0]) return slides[0];
    else
        return {
            id: '0',
            elements: [],
            selectedElements: [],
            elementsAnimations: [],
            background: { type: BackgroundType.Color, data: { color: '' } },
        };
};

const SlidesArea = () => {
    const Slides = useAppSelector(state => state.slideBar.presentation.slides);
    const selectedSlidesId = useAppSelector(state => state.slideBar.selectedSlides);
    console.log('SLIDES RERENDERED!');
    const selectedSlide = getSlideById(Slides, selectedSlidesId[0]);
    return (
        <div className="slides-area">
            <SlidePreviewList slides={Slides} selectedSlides={selectedSlidesId} />
            <SlideEditSpace slide={selectedSlide} />
        </div>
    );
};

export { SlidesArea };
