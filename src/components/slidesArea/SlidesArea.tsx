import { useEffect } from 'react';
import { getSlideById } from '../../model/utils';
import { useAppActions, useAppSelector } from '../../store/hooks';
import { SlideEditSpace } from '../editSlideArea/EditSlideArea';
import { SlidePreviewList } from '../slideBar/SlideBar';
import styles from './SlidesArea.module.css';
import { SelectModeTypes } from '../../model/types';

const SlidesArea = () => {
    const Slides = useAppSelector(state => state.slideBar.presentation.slides);
    const selectedSlidesId = useAppSelector(state => state.slideBar.selectedSlides);
    const selectMode = useAppSelector(state => state.slideBar.selectMode)
    console.log('SLIDES RERENDERED!');
    const selectedSlide = getSlideById(Slides, selectedSlidesId[0]);
    const { createDeleteSlideAction, createDeleteElementsAction } = useAppActions();
    useEffect(() => {
        const onKeyDown = (keyEvent: KeyboardEvent) => {
            if (keyEvent.key == "Delete") {
                if (selectMode == SelectModeTypes.Elements) {
                    createDeleteElementsAction()
                    console.log('elements')
                }
                else
                    if (selectMode == SelectModeTypes.Slides) {
                        createDeleteSlideAction()
                        console.log('slides')
                    }
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [selectMode])
    return (
        <div className={styles.slidesArea}>
            <SlidePreviewList slides={Slides} selectedSlides={selectedSlidesId} />
            <SlideEditSpace slide={selectedSlide} />
        </div>
    );
};

export { SlidesArea };
