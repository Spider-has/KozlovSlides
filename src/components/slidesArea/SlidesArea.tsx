import { useAppSelector } from '../../store/reducers/store';
import { SlideEditSpace } from '../editSlideArea/EditSlideArea';
import { SlidePreviewList } from '../slideBar/SlideBar';
import './SlidesArea.css';

const SlidesArea = () => {
    const Slides = useAppSelector(state => state.slideBar.slides);
    return (
        <div className="slides-area">
            <SlidePreviewList slides={Slides} />
            <SlideEditSpace slide={Slides[0]} />
        </div>
    );
};

export { SlidesArea };
