import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import React from 'react';
import * as ButtonIcon from '../button/icons/ButtonIcons';
import { colorList } from '../../model/models';
//import { colorList } from '../../model/models';
import rgbHex from 'rgb-hex';
class SketchExample extends React.Component {
    state = {
        displayColorPicker: false,
        color: {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
        },
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
        colorList[0].push('#' + rgbHex(String('rgba(' + this.state.color.r + ', ' + this.state.color.g + ', ' + this.state.color.b + ', ' + this.state.color.a + ')')));
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb })
    };

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '16px',
                    height: '16px',
                },
                swatch: {
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <ButtonIcon.NewColor style={styles.color} />
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker presetColors={[]} color={this.state.color} onChange={this.handleChange} />
                </div> : null}

            </div>
        )
    }
}

export default SketchExample