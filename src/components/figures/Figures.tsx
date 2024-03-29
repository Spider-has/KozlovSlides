import { RefObject, useRef } from 'react';
import {
    EllipseElement,
    FunctionGraphObject,
    ImageObject,
    RectangleElement,
    TextObject,
    TriangleElement,
    VideoObject,
} from '../../model/figureTypes';
import styles from './Figures.module.css';
import { useAppActions } from '../../store/hooks';
import { getGraphLines, getGraphUnitOfMeasurementLines } from '../../model/utils';

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
    const coefX = elem.size.width / 100;
    const coefY = elem.size.height / 100
    return (
        <div className={styles.svgSpace} ref={svgRef}>
            <svg className={styles.svgSpace} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                    id={elem.id + "triangle"}
                    className={`${styles.usualObject}`}
                    d={`m${elem.properties.point1.x * coefX} ${elem.properties.point1.y * coefY
                        } L ${elem.properties.point2.x * coefX} ${elem.properties.point2.y * coefY
                        } L ${elem.properties.point3.x * coefX} ${elem.properties.point3.y * coefY
                        }`}
                    fill={elem.properties.color ? elem.properties.color : 'black'}
                    stroke={elem.properties.border?.color}
                />
            </svg>
        </div>
    );
};

const FunctionGraphObj = (props: { elem: FunctionGraphObject; svgRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.elem };
    const svgRef = props.svgRef;
    const lines = getGraphUnitOfMeasurementLines(elem.size.width, elem.size.height)
    const graphLines = getGraphLines(elem.size.width, elem.size.height, elem.properties.range.from, elem.properties.range.to, elem.properties.func)
    return (
        <div className={styles.svgSpace} ref={svgRef}>
            <svg id={`${elem.id}graphic`} className={styles.svgSpace} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                    d={`M 0 ${elem.size.height / 2} L ${elem.size.width} ${elem.size.height / 2}
                    M ${elem.size.width / 2} 0  L ${elem.size.width / 2} ${elem.size.height}
                     ` + lines}
                    stroke='black'
                    strokeWidth='1'
                    strokeLinecap='square'
                    fill={elem.properties.color ? elem.properties.color : 'black'}
                />
                <path
                    d={graphLines}
                    stroke={elem.properties.color ? elem.properties.color : 'blue'}
                    strokeWidth='3'
                    strokeLinecap='square'
                    fill={'none'}
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
    const onBlur = () => {
        if (spanRef.current!) {
            const newText = spanRef.current!.innerText;
            createChangeElementTextAction(newText, elem.id);
        }
    };
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
                        textAlign: elem.properties.chars.align,
                    }}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onFocus={() => {
                        spanRef.current!.addEventListener('blur', onBlur, { once: true });
                    }}
                >
                    {chars.value}
                </span>
            </div>
        </div>
    );
};

export { Rectangle, Ellipse, Triangle, ImageObj, VideoObj, TextObj, FunctionGraphObj };
