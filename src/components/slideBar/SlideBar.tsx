import { useObjectsDragAndDrop } from '../../model/hooks';
import { Id, Slide } from '../../model/types';
import { useAppActions } from '../../store/hooks';
import { ActiveSlideAreaPreview } from '../editSlideArea/SlideAreaPreviewCopy';
import styles from './SlideBar.module.css';
import { useEffect, useRef, useState } from 'react';

const SlidePreview = (props: { slide: Slide }) => {
    return (
        <div className={styles.slidePreview}>
            <div className={styles.slidePreviewMainArea}>
                <ActiveSlideAreaPreview slide={props.slide} />
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
    index: number;
    isShifted: boolean;
    isSelected: boolean;
    selectedSlides: Id[];
}) => {
    const { createChangeSelectedSlidesAction } = useAppActions();
    const slideRef = useRef<HTMLDivElement>(null)
    const slideIndex = props.index - 1;
    const selectedSlides = [...props.selectedSlides];
    const selectedSlideClass = props.isSelected
        ? styles.slidePreviewAreaPreviewAreaSelected
        : '';
    const slideDnD = useObjectsDragAndDrop(slideRef, { x: slideIndex, y: 0 });
    const slideParams = {
        y: 0
    }
    slideDnD({
        onClickAction(event) {
            if (props.isSelected) {
                console.log('сюда!')
                slideRef.current!.style.position = 'absolute'
                slideParams.y = slideRef.current!.getBoundingClientRect().y;
                slideRef.current!.style.top = event.pageY - slideParams.y + 'px';
            }
        },
        onDragAction(event) {
            if (props.isSelected) {
                slideRef.current!.style.top = event.pageY - slideParams.y + 'px';
            }
        },
        onDropAction() {
            if (props.isSelected) {
                slideRef.current!.style.position = ''
                slideRef.current!.style.top = '';
            }
        },
    })
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
            }}
            ref={slideRef}
        >
            <div className={styles.slidePreviewAreaIdArea}>{props.index}</div>
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
                index={i + 1}
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
