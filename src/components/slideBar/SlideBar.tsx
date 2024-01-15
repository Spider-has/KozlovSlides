import { useObjectsDragAndDrop, useShiftAction } from '../../model/hooks';
import { Id, Slide } from '../../model/types';
import { getShiftSelectedSlides } from '../../model/utils';
import { useAppActions } from '../../store/hooks';
import { ActiveSlideAreaPreview } from '../editSlideArea/SlideAreaPreviewCopy';
import styles from './SlideBar.module.css';
import { RefObject, useEffect, useRef, useState } from 'react';

const SlidePreview = (props: { slide: Slide }) => {
    return (
        <div className={styles.slidePreview}>
            <div className={styles.slidePreviewMainArea}>
                <ActiveSlideAreaPreview slide={props.slide} />
            </div>
        </div>
    );
};

const SlidePreviewArea = (props: {
    slide: Slide;
    index: number;
    isShifted: boolean;
    isSelected: boolean;
    selectedSlides: Id[];
    setRef: (slideRef: RefObject<HTMLDivElement>, newPosRef: RefObject<HTMLDivElement>) => void;
    getNewOrder: (ref: RefObject<HTMLDivElement>) => number;
    showNewPosition: (slideRef: RefObject<HTMLDivElement>, newPosRef: RefObject<HTMLDivElement>) => void;
    onSelectAction: (isSelected: boolean, slideId: Id) => void;
}) => {
    const { createChangeSlidesOrderAction } = useAppActions();
    const slideIndex = props.index - 1;
    const selectedSlideClass = props.isSelected ? styles.slidePreviewAreaPreviewAreaSelected : '';
    const slideRef = useRef<HTMLDivElement>(null);
    const newPosRef = useRef<HTMLDivElement>(null);
    const clearSpace = useRef<HTMLDivElement>(null);
    const slideDnD = useObjectsDragAndDrop(slideRef, { x: slideIndex, y: 0 });
    const slideParams = {
        y: 0,
    };
    const slideIndexRef = useRef<HTMLDivElement>(null);
    slideDnD({
        onClickAction(event) {
            if (props.isSelected) {
                clearSpace.current!.style.display = 'block';
                slideIndexRef.current!.style.opacity = '0';
                slideRef.current!.style.position = 'absolute';
                slideRef.current!.style.zIndex = '100';
                slideParams.y = slideRef.current!.getBoundingClientRect().y;
                slideRef.current!.style.top = event.pageY - slideParams.y + 'px';
            }
        },
        onDragAction(event) {
            if (props.isSelected) {
                slideRef.current!.style.top = event.pageY - slideParams.y + 'px';
                props.showNewPosition(slideRef, newPosRef);
            }
        },
        onDropAction() {
            if (props.isSelected) {
                slideIndexRef.current!.style.opacity = '1';
                slideRef.current!.style.zIndex = '0';
                createChangeSlidesOrderAction(slideIndex, props.getNewOrder(slideRef));
                slideRef.current!.style.position = '';
                slideRef.current!.style.top = '';
                clearSpace.current!.style.display = 'none';
            }
        },
    });
    useEffect(() => {
        if (slideRef && newPosRef) props.setRef(slideRef, newPosRef);
    }, [slideRef, newPosRef]);
    return (
        <>
            <div ref={clearSpace} className={styles.clearSlideSpace}></div>
            <div
                className={styles.slidePreviewArea}
                onClick={() => {
                    props.onSelectAction(props.isSelected, props.slide.id)
                }}
                ref={slideRef}
            >
                <div ref={slideIndexRef} className={styles.slidePreviewAreaIdArea}>
                    {props.index}
                </div>
                <div>
                    <div className={`${styles.slidePreviewAreaPreviewArea} ${selectedSlideClass}`}>
                        <SlidePreview slide={props.slide} />
                    </div>
                    <NewSlidePositionArea newPosRef={newPosRef} />
                </div>
            </div>
        </>
    );
};

const NewSlidePositionArea = (props: { newPosRef: RefObject<HTMLDivElement> }) => {
    return <div ref={props.newPosRef} className={styles.newSlidePosition}></div>;
};

type SlidePreviewRefs = {
    slideRef: RefObject<HTMLDivElement>;
    newPositionRef: RefObject<HTMLDivElement>;
};

const SlidePreviewList = (props: { slides: Slide[]; selectedSlides: Id[] }) => {
    const [isShifted, setShifted] = useState(false);
    const { createChangeSelectedSlidesAction } = useAppActions();
    const selectedSlides = [...props.selectedSlides];
    useShiftAction(
        () => {
            setShifted(true);
        },
        () => {
            setShifted(false);
        },
    );
    const allSlides = useRef<Array<SlidePreviewRefs>>([]);
    const setRef = (
        i: number,
        slideRefObj: RefObject<HTMLDivElement>,
        newPositionRef: RefObject<HTMLDivElement>,
    ) => {
        if (slideRefObj && newPositionRef)
            allSlides.current[i] = {
                slideRef: slideRefObj,
                newPositionRef: newPositionRef,
            };
    };
    const getNewIndex = (currRef: RefObject<HTMLDivElement>) => {
        doRefsArrayCheck();
        const currTop = currRef.current?.getBoundingClientRect().top;
        const currHeight = currRef.current?.getBoundingClientRect().height;
        let newIndex = 0;
        for (let i = 0; i < allSlides.current.length; i++) {
            const elemTop = allSlides.current[i].slideRef.current?.getBoundingClientRect().top;
            const newPosRef = allSlides.current[i].newPositionRef.current;
            if (currTop && elemTop && currHeight && currTop + currHeight / 2 > elemTop) {
                newIndex++;
            }
            if (newPosRef) {
                newPosRef.style.display = 'none';
            }
        }
        return newIndex - 1;
    };
    const showNewSlidePosition = (
        currRef: RefObject<HTMLDivElement>,
        currNewPos: RefObject<HTMLDivElement>,
    ) => {
        const currTop = currRef.current?.getBoundingClientRect().top;
        const currHeight = currRef.current?.getBoundingClientRect().height;
        let nearestIndex = -1;
        let maxElemTop = 0;
        for (let i = 0; i < allSlides.current.length; i++) {
            const elemTop = allSlides.current[i].slideRef.current?.getBoundingClientRect().top;
            const newPosRef = allSlides.current[i].newPositionRef.current;
            if (newPosRef) newPosRef.style.display = 'none';
            if (currTop && elemTop && currHeight && newPosRef && currTop + currHeight / 2 > elemTop) {
                if (elemTop > maxElemTop && currNewPos.current != newPosRef) {
                    maxElemTop = elemTop;
                    nearestIndex = i;
                }
            }
        }
        if (nearestIndex != -1) {
            if (allSlides.current[nearestIndex].newPositionRef.current)
                allSlides.current[nearestIndex].newPositionRef.current!.style.display = 'block';
        }
    };
    const onSelectAction = (isSelected: boolean, slideId: Id) => {
        if (!isSelected && !isShifted) {
            doRefsArrayCheck()
            createChangeSelectedSlidesAction([slideId])
        }
        else {
            if (isShifted) {
                doRefsArrayCheck();
                createChangeSelectedSlidesAction([...props.selectedSlides, ...getShiftSelectedSlides(props.slides, props.selectedSlides, slideId)])
            }
        }
    }

    const doRefsArrayCheck = () => {
        allSlides.current! = allSlides.current!.filter((refs) => (refs.newPositionRef.current && refs.slideRef.current))
    }

    const slidesPreviewList = props.slides.map((slide, i) => {
        const selected = selectedSlides.includes(slide.id);
        return (
            <SlidePreviewArea
                key={slide.id}
                index={i + 1}
                slide={slide}
                isShifted={isShifted}
                isSelected={selected}
                selectedSlides={selectedSlides}
                setRef={(slideRef: RefObject<HTMLDivElement>, newPosRef: RefObject<HTMLDivElement>) => {
                    setRef(i, slideRef, newPosRef);
                }}
                getNewOrder={getNewIndex}
                showNewPosition={showNewSlidePosition}
                onSelectAction={onSelectAction}
            />
        );
    });

    return <div className={styles.slidePreviewList}>{slidesPreviewList}</div>;
};

export { SlidePreviewList };
