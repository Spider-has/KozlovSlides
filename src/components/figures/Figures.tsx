import { RefObject, useRef } from 'react';
import {
    EllipseElement,
    ImageObject,
    RectangleElement,
    TextObject,
    TriangleElement,
    VideoObject,
} from '../../model/figureTypes';
import styles from './Figures.module.css';
import { useAppActions } from '../../store/hooks';

const Rectangle = (props: { elem: RectangleElement; svgRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.elem };
    const svgRef = props.svgRef;
    return (
        <div className={styles.svgSpace} ref={svgRef}>
            <svg className={styles.svgSpace} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <rect
                    className={` ${styles.usualObject}`}
                    width="100%"
                    height="100%"
                    fill={elem.properties.color ? elem.properties.color : 'black'}
                    stroke={elem.properties.border?.color}
                />
            </svg>
        </div>
    );
};

const Ellipse = (props: { elem: EllipseElement; svgRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.elem };
    const svgRef = props.svgRef;
    return (
        <div className={styles.svgSpace} ref={svgRef}>
            <svg className={styles.svgSpace} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <ellipse
                    className={`${styles.usualObject}`}
                    cx="50%"
                    cy="50%"
                    rx="50%"
                    ry="50%"
                    fill={elem.properties.color ? elem.properties.color : 'black'}
                    stroke={elem.properties.border?.color}
                />
            </svg>
        </div>
    );
};

const Triangle = (props: { elem: TriangleElement; svgRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.elem };
    const svgRef = props.svgRef;
    return (
        <div className={styles.svgSpace} ref={svgRef}>
            <svg className={styles.svgSpace} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                    className={`${styles.usualObject}`}
                    width={'100%'}
                    height={'100%'}
                    d={`m${(elem.properties.point1.x * elem.size.width) / 100} ${(elem.properties.point1.y * elem.size.height) / 100
                        } L ${(elem.properties.point2.x * elem.size.width) / 100} ${(elem.properties.point2.y * elem.size.height) / 100
                        } L ${(elem.properties.point3.x * elem.size.width) / 100} ${(elem.properties.point3.y * elem.size.height) / 100
                        }`}
                    fill={elem.properties.color ? elem.properties.color : 'black'}
                    stroke={elem.properties.border?.color}
                />
            </svg>
        </div>
    );
};

const ImageObj = (props: { elem: ImageObject; svgRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.elem };
    const svgRef = props.svgRef;
    return (
        <div className={styles.svgSpace} ref={svgRef}>
            <img
                className={`${styles.imageObject} ${styles.usualObject}`}
                src={elem.properties.imgUrl}
                alt="your image!"
            />
        </div>
    );
};

const VideoObj = (props: { elem: VideoObject; svgRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.elem };
    const svgRef = props.svgRef;
    return (
        <div className={styles.svgSpace} ref={svgRef}>
            <video controls className={` ${styles.usualObject}`}>
                <source src={elem.properties.videoUrl} type="video/webm" />
                <source src={elem.properties.videoUrl} type="video/mp4" />
                <a href={elem.properties.videoUrl}>WEBM</a>
                <a href={elem.properties.videoUrl}>MP4</a>
            </video>
        </div>
    );
};

const TextObj = (props: { elem: TextObject; svgRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.elem };
    const svgRef = props.svgRef;
    const chars = { ...elem.properties.chars };
    const spanRef = useRef<HTMLElement>(null);
    const { createChangeElementTextAction } = useAppActions();
    // const inputRef = useRef<HTMLInputElement>(null);
    // const TextChars = elem.properties.chars.map((chars, i) => (
    //     <div key={i}>
    //         <span
    //             className={styles.textChars}
    //             style={{
    //                 fontFamily: chars.fontFamily?.fontFamily,
    //                 fontSize: chars.fontSize,
    //                 fontWeight: chars.bold ? 'bold' : 'normal',
    //                 fontStyle: chars.cursive ? 'italic' : 'normal',
    //                 textDecorationLine: chars.underline ? 'underline' : 'none',
    //                 color: chars.color ? chars.color : 'black',
    //             }}
    //         >
    //             {chars.value}
    //         </span>
    //     </div>
    // ));
    const onBlur = () => {
        if (spanRef.current!) {
            const newText = spanRef.current!.innerText;
            createChangeElementTextAction(newText, elem.id)
        }
        console.log('кончили печатать');
    }
    return (
        <div className={styles.svgSpace} ref={svgRef}>
            <div className={` ${styles.usualObject} ${styles.textObject}`}>
                <span
                    ref={spanRef}
                    className={styles.textChars}
                    style={{
                        fontFamily: chars.fontFamily?.fontFamily,
                        fontSize: chars.fontSize,
                        fontWeight: chars.bold ? 'bold' : 'normal',
                        fontStyle: chars.cursive ? 'italic' : 'normal',
                        textDecorationLine: chars.underline ? 'underline' : 'none',
                        color: chars.color ? chars.color : 'black',
                    }}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onFocus={() => {

                        console.log('печатаем')

                        spanRef.current!.addEventListener('blur', onBlur, { once: true })
                    }}
                >
                    {chars.value}
                </span>
                {/* <input
                    style={{
                        fontFamily: chars.fontFamily?.fontFamily,
                        fontSize: chars.fontSize,
                        fontWeight: chars.bold ? 'bold' : 'normal',
                        fontStyle: chars.cursive ? 'italic' : 'normal',
                        textDecorationLine: chars.underline ? 'underline' : 'none',
                        color: chars.color ? chars.color : 'black',
                    }}
                    className={styles.textInput}
                    type="text"
                    ref={inputRef}
                /> */}
            </div>
        </div>
    );
};

export { Rectangle, Ellipse, Triangle, ImageObj, VideoObj, TextObj };
