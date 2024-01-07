import { getSlideById } from '../../model/utils';
import { useAppSelector } from '../../store/hooks';
import { SlideEditSpace } from '../editSlideArea/EditSlideArea';
import { SlidePreviewList } from '../slideBar/SlideBar';
import './SlidesArea.css';

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
