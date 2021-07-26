import React, { Component } from 'react';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setRingPairEngravingText, setRing1EngravingText, setRing2EngravingText, setRingPairEngravingFont, setRing1EngravingFont, setRing2EngravingFont } from '../../redux/actions';

class EngravingControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_tab: 0,
            letters: 40,
            symbol: 0,
            laser_font: 0,
            diamond_font: 0,
            ring_1_engraving_text: props.data.ring_1_engraving_text,
            ring_2_engraving_text: props.data.ring_2_engraving_text
        }
        this.symbols = ['∞', '±', '½', '¼'];
    }

    handleTab = event => {
        this.setState({ selected_tab: event.target.id.replace('engraving_tab_', '') });
        if (event.target.id.replace('engraving_tab_', '') == 0) {
            if (this.props.data.ring === 'pair') { this.props.setRingPairEngravingFont(0); }
            else if (this.props.data.ring === 'ring_1') { this.props.setRing1EngravingFont(0); }
            else { this.props.setRing2EngravingFont(0); }
        } else {
            if (this.props.data.ring === 'pair') { this.props.setRingPairEngravingFont(5); }
            else if (this.props.data.ring === 'ring_1') { this.props.setRing1EngravingFont(5); }
            else { this.props.setRing2EngravingFont(5); }
        }
    }

    handleText = event => {
        if (this.props.data.ring === 'pair') {
            this.props.setRingPairEngravingText(event.target.value);
            this.setState({ ring_1_engraving_text: event.target.value, ring_2_engraving_text: event.target.value, letters: 40 - event.target.value.length });
        } else if (this.props.data.ring === 'ring_1') {
            this.props.setRing1EngravingText(event.target.value);
            this.setState({ ring_1_engraving_text: event.target.value, letters: 40 - event.target.value.length });
        } else {
            this.props.setRing2EngravingText(event.target.value);
            this.setState({ ring_2_engraving_text: event.target.value, letters: 40 - event.target.value.length });
        }
    }
    handleSymbol = event => {
        const index = parseInt(event.target.id.replace('symbol_', ''));
        const ring_1_text = this.state.ring_1_engraving_text + this.symbols[index];
        const ring_2_text = this.state.ring_2_engraving_text + this.symbols[index];

        if (this.props.data.ring === 'pair') {
            this.props.setRingPairEngravingText(ring_1_text);
            this.setState({ ring_1_engraving_text: ring_1_text, ring_2_engraving_text: ring_2_text });
        } else if (this.props.data.ring === 'ring_1') {
            this.props.setRing1EngravingText(ring_1_text);
            this.setState({ ring_1_engraving_text: ring_1_text });
        } else {
            this.props.setRing2EngravingText(ring_2_text);
            this.setState({ ring_2_engraving_text: ring_2_text });
        }
    }
    handleLaserFont = e => {
        this.setState({ laser_font: e.target.id.replace('laser_font_', '') });
        if (this.props.data.ring === 'pair') { this.props.setRingPairEngravingFont(parseInt(e.target.id.replace('laser_font_', ''))); }
        else if (this.props.data.ring === 'ring_1') { this.props.setRing1EngravingFont(parseInt(e.target.id.replace('laser_font_', ''))); }
        else { this.props.setRing2EngravingFont(parseInt(e.target.id.replace('laser_font_', ''))); }
    }
    handleDiamondFont = e => {
        this.setState({ diamond_font: e.target.id.replace('diamond_font_', '') });
        if (this.props.data.ring === 'pair') { this.props.setRingPairEngravingFont(5 + parseInt(e.target.id.replace('diamond_font_', ''))); }
        else if (this.props.data.ring === 'ring_1') { this.props.setRing1EngravingFont(5 + parseInt(e.target.id.replace('diamond_font_', ''))); }
        else { this.props.setRing2EngravingFont(5 + parseInt(e.target.id.replace('diamond_font_', ''))); }
    }

    render() {
        const { selected_tab, letters, symbol, laser_font, diamond_font, ring_1_engraving_text, ring_2_engraving_text } = this.state;

        const laser_fonts = ['fl1-shelly', 'fl2-bernhard', 'fl3-palette', 'fl4-gando', 'fl5-finehand'];
        let _laser_fonts = ['fl1-shelly', 'fl2-bernhard', 'fl3-palette', 'fl4-gando', 'fl5-finehand'];
        const diamond_fonts = ['fm1-palace', 'fm2-times', 'fm3-times-kursive'];
        let _diamond_fonts = ['fm1-palace', 'fm2-times', 'fm3-times-kursive'];

        _laser_fonts = _laser_fonts.map((item, index) => {
            return <li key={index} id={'laser_font_' + index} className={laser_font == index ? 'option active' : 'option'} onClick={this.handleLaserFont}>
                <span id={'laser_font_' + index} className="option-label" style={{ fontFamily: `${item}` }}>AaBbCc 123</span>
            </li>
        });
        _diamond_fonts = _diamond_fonts.map((item, index) => {
            return <li key={index} id={'diamond_font_' + index} className={diamond_font == index ? 'option active' : 'option'} onClick={this.handleDiamondFont}>
                <span id={'diamond_font_' + index} className="option-label" style={{ fontFamily: `${item}` }}>AaBbCc 123</span>
            </li>
        });

        return (
            <section className="grooves-edges-controls">
                {/* engraving tabs */}
                <div className="nav-tabs">
                    <ul>
                        <li id="engraving_tab_0" className={selected_tab == 0 ? 'active' : undefined} style={{ flexDirection: 'row', alignItems: 'center' }} onClick={this.handleTab}>
                            <span id="engraving_tab_0" className="li-span">Laser engraving</span>
                        </li>
                        <li id="engraving_tab_1" className={selected_tab == 1 ? 'active' : undefined} style={{ flexDirection: 'row', alignItems: 'center' }} onClick={this.handleTab}>
                            <span id="engraving_tab_1" className="li-span">Diamond engraving</span>
                        </li>
                    </ul>
                </div>

                {/* tabs panel */}
                <div className="dimensions-controls engraving-controls">
                    {/* engraving text */}
                    <div>
                        <label>Engraving text (max. 40 characters)</label>
                        <input type="textarea" className="form-controls" maxLength="40" onChange={this.handleText} style={{ fontFamily: `${selected_tab == 0 ? laser_fonts[parseInt(laser_font)] : diamond_fonts[parseInt(diamond_font)]}` }} value={this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? ring_1_engraving_text : ring_2_engraving_text}></input>
                        <label style={{ textAlign: 'right' }}>{letters}</label>
                    </div>

                    {/* add symbols */}
                    <div>
                        <label>Add symbols</label>
                        <ul>
                            <li id="symbol_0" className={symbol == 0 ? 'option active' : 'option'} onClick={this.handleSymbol}><span id="symbol_0" className="option-label">∞</span></li>
                            <li id="symbol_1" className={symbol == 1 ? 'option active' : 'option'} onClick={this.handleSymbol}><span id="symbol_1" className="option-label">±</span></li>
                            <li id="symbol_2" className={symbol == 2 ? 'option active' : 'option'} onClick={this.handleSymbol}><span id="symbol_2" className="option-label">½</span></li>
                            <li id="symbol_3" className={symbol == 3 ? 'option active' : 'option'} onClick={this.handleSymbol}><span id="symbol_3" className="option-label">¼</span></li>
                        </ul>
                    </div>

                    {/* engraving font */}
                    <div>
                        <label>Engraving font</label>
                        <ul className="engraving-fonts">
                            {selected_tab == 0 && _laser_fonts}
                            {selected_tab == 1 && _diamond_fonts}
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}

EngravingControls.propTypes = { data: PropTypes.object.isRequired };

const mapStateToProps = (state) => ({ data: state.data });
const mapActionsToProps = { setRingPairEngravingText, setRing1EngravingText, setRing2EngravingText, setRingPairEngravingFont, setRing1EngravingFont, setRing2EngravingFont };

export default connect(mapStateToProps, mapActionsToProps)(EngravingControls);