import { RefObject } from 'react';
import { FigureObjects, ObjectType, SlideElement } from './figureTypes';
import { Ellipse, ImageObj, Rectangle, TextObj, Triangle, VideoObj } from '../components/figures/Figures';

const getElementByType = (elem: SlideElement, svgRef: RefObject<HTMLDivElement>) => {
    let Obj;
    switch (elem.elementType) {
        case ObjectType.Text: {
            Obj = <TextObj elem={elem} svgRef={svgRef} />;
            break;
        }
        case ObjectType.Graphic: {
            switch (elem.figureType) {
                case FigureObjects.Rectangle: {
                    Obj = <Rectangle elem={elem} svgRef={svgRef} />;
                    break;
                }
                case FigureObjects.Triangle: {
                    Obj = <Triangle elem={elem} svgRef={svgRef} />;
                    break;
                }
                case FigureObjects.Ellipse: {
                    Obj = <Ellipse elem={elem} svgRef={svgRef} />;
                    break;
                }
                default:
                    Obj = <></>;
                    break;
            }
            break;
        }
        case ObjectType.Image: {
            Obj = <ImageObj elem={elem} svgRef={svgRef} />;
            break;
        }
        case ObjectType.Video: {
            Obj = <VideoObj elem={elem} svgRef={svgRef} />;
            break;
        }
        case ObjectType.Audio: {
            Obj = <></>;
            break;
        }
        case ObjectType.FunctionGraph: {
            Obj = <></>;
            break;
        }
        default: {
            Obj = <></>;
        }
    }
    return Obj;
};

export { getElementByType };
