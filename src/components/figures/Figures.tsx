import { RefObject } from 'react';
import {
    EllipseElement,
    ImageObject,
    RectangleElement,
    TextObject,
    TriangleElement,
    VideoObject,
} from '../../model/figureTypes';
import styles from './Figures.module.css';

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
                    d={`m${(elem.properties.point1.x * elem.size.width) / 100} ${
                        (elem.properties.point1.y * elem.size.height) / 100
                    } L ${(elem.properties.point2.x * elem.size.width) / 100} ${
                        (elem.properties.point2.y * elem.size.height) / 100
                    } L ${(elem.properties.point3.x * elem.size.width) / 100} ${
                        (elem.properties.point3.y * elem.size.height) / 100
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
            <video controls width={'100%'} height={'100%'}>
                <source src={elem.properties.videoUrl} type="video/webm" />
                <source src={elem.properties.videoUrl} type="video/mp4" />
                <a href={elem.properties.videoUrl}>WEBM</a>
                <a href={elem.properties.videoUrl}>MP4</a>
            </video>
            {/* <iframe
                className={styles.usualObject}
                src="https://www.youtube.com/embed/pVxvF9FNkXw"
                title="Фильм про ИТ-лицей «Инфотех», Йошкар-Ола, 2023"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe> */}
        </div>
    );
};

const TextObj = (props: { elem: TextObject; svgRef: RefObject<HTMLDivElement> }) => {
    const elem = { ...props.elem };
    const svgRef = props.svgRef;
    const TextChars = elem.properties.chars.map((chars, i) => (
        <div key={i}>
            <span
                className={styles.textChars}
                style={{
                    fontFamily: chars.fontFamily?.fontFamily,
                    fontSize: chars.fontSize,
                    fontWeight: chars.bold ? 'bold' : 'normal',
                    fontStyle: chars.cursive ? 'italic' : 'normal',
                    textDecorationLine: chars.underline ? 'underline' : 'none',
                    color: chars.color ? chars.color : 'black',
                }}
            >
                {chars.value}
            </span>
            <input type="text"></input>
        </div>
    ));
    return (
        <div className={styles.svgSpace} ref={svgRef}>
            <div className={` ${styles.usualObject} ${styles.textObject}`}>{TextChars}</div>
        </div>
    );
};

export { Rectangle, Ellipse, Triangle, ImageObj, VideoObj, TextObj };
