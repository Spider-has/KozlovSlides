import { Id, Slide } from '../../model/types';
import { useAppActions } from '../../store/hooks';
import { ActiveSlidePreviewArea } from '../editSlideArea/SlideAreaPreviewCopy';
import styles from './SlideBar.module.css';
import { useEffect, useState } from 'react';

const SlidePreview = (props: { slide: Slide }) => {
    return (
        <div className={styles.slidePreview}>
            <div className={styles.slidePreviewMainArea}>
                <ActiveSlidePreviewArea slide={props.slide} />
            </div>
        </div>
    );
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
        ? styles.slidePreviewAreaPreviewAreaSelected
        : '';
    return (
        <div
            className={styles.slidePreviewArea}
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
            }}
        >
            <div className={styles.slidePreviewAreaIdArea}>{props.id}</div>
            <div
                className={`${styles.slidePreviewAreaPreviewArea} ${selectedSlideClass}`}
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

    return <div className={styles.slidePreviewList}>{slidesPreviewList}</div>;
};

export { SlidePreviewList };
