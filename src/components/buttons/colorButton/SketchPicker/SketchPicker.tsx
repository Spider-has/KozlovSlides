import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import React from 'react';
import * as ButtonIcon from '../../icons/ButtonIcons';
import { colorList } from '../../../../model/models';
//import { colorList } from '../../model/models';
import rgbHex from 'rgb-hex';
class NewColorButtonButton extends React.Component {
    state = {
        displayColorPicker: false,
        color: {
            r: '255',
            g: '197',
            b: '39',
            a: '1',
        },
    };
    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
        if (!this.state.displayColorPicker) {
            colorList[0].push('#' + rgbHex(String('rgba(' + this.state.color.r + ', ' + this.state.color.g + ', ' + this.state.color.b + ', ' + this.state.color.a + ')')));
        }
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
            },
        });

        return (
            <div>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <ButtonIcon.NewColor style={styles.color} />
                </div>
                {this.state.displayColorPicker && <div style={styles.popover}>
                    <SketchPicker presetColors={[]} color={this.state.color} onChange={this.handleChange} />
                </div>}
            </div>
        )
    }
}

export default NewColorButtonButton