import React, { Component } from 'react';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setRingPairDiamondCut, setRing1DiamondCut, setRing2DiamondCut, setRingPairDiamondSize, setRing1DiamondSize, setRing2DiamondSize, setRingPairDiamondQuality, setRing1DiamondQuality, setRing2DiamondQuality, setRingPairNumOfStones, setRing1NumOfStones, setRing2NumOfStones, setRingPairRows, setRing1Rows, setRing2Rows, setRingPairPosition, setRing1Position, setRing2Position } from '../../redux/actions';

import brilliant from '../../assets/img/diamonds/diamond_cuts/brilliant.png';
import princess from '../../assets/img/diamonds/diamond_cuts/princess.png';
import baguette from '../../assets/img/diamonds/diamond_cuts/baguette.png';

import { brilliant_diamond_sizes, princess_diamond_sizes, baguette_diamond_sizes } from '../../assets/diamond_sizes';

import FreePosition from './FreePosition';

class ChannelControls extends Component {

    constructor(props) {
        super(props);
        if (props.data.ring === 'pair' || props.data.ring === 'ring_1') {
            this.state = {
                diamond_cut: props.data.ring_1_diamond_cut,
                diamond_size: props.data.ring_1_diamond_size,
                diamond_quality: props.data.ring_1_diamond_quality,
                num_of_stone: props.data.ring_1_number_of_stones,
                position: props.data.ring_1_position,
                show_diamond_size: false,
                show_diamond_quality: false,
                show_num_of_stones: false,
                show_position: false
            }
        } else {
            this.state = {
                diamond_cut: props.data.ring_2_diamond_cut,
                diamond_size: props.data.ring_2_diamond_size,
                diamond_quality: props.data.ring_2_diamond_quality,
                num_of_stone: props.data.ring_2_number_of_stones,
                position: props.data.ring_2_position,
                show_diamond_size: false,
                show_diamond_quality: false,
                show_num_of_stones: false,
                show_position: false
            }
        }
        this._isMounted = false;
    }

    clickWindow = e => {
        if (e.target.id.includes('diamond_size') || e.target.id.includes('diamond_quality') || e.target.id.includes('num_of_stones') || e.target.id.includes('position_')) { return; }
        else {
            this._isMounted && this.setState({
                show_diamond_size: false,
                show_diamond_quality: false,
                show_num_of_stones: false,
                show_position: false
            });
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && window.addEventListener('mousedown', this.clickWindow);
    }

    showDiamondSize = () => { this.setState({ show_diamond_size: !this.state.show_diamond_size }); }
    showDiamondQuality = () => { this.setState({ show_diamond_quality: !this.state.show_diamond_quality }); }
    showNumOfStones = () => { this.setState({ show_num_of_stones: !this.state.show_num_of_stones }); }
    showPosition = () => { this.setState({ show_position: !this.state.show_position }); }

    handleDiamondCut = e => {
        const value = parseInt(e.target.id.replace('diamond_cut_', ''));
        this.setState({ diamond_cut: value });
        if (this.props.data.ring === 'pair') { this.props.setRingPairDiamondCut(value); }
        else if (this.props.data.ring === 'ring_1') { this.props.setRing1DiamondCut(value); }
        else { this.props.setRing2DiamondCut(value); }
    }
    handleDiamondSize = e => {
        const value = parseInt(e.target.id.replace('diamond_size_', ''));
        this.setState({ diamond_size: value, show_diamond_size: false });
        if (this.props.data.ring === 'pair') { this.props.setRingPairDiamondSize(value); }
        else if (this.props.data.ring === 'ring_1') { this.props.setRing1DiamondSize(value); }
        else { this.props.setRing2DiamondSize(value); }
    }
    handleDiamondQuality = e => {
        const value = parseInt(e.target.id.replace('diamond_quality_', ''));
        this.setState({ diamond_quality: value, show_diamond_quality: false });
        if (this.props.data.ring === 'pair') { this.props.setRingPairDiamondQuality(value); }
        else if (this.props.data.ring === 'ring_1') { this.props.setRing1DiamondQuality(value); }
        else { this.props.setRing2DiamondQuality(value); }
    }
    handleNumOfStones = e => {
        const value = parseInt(e.target.id.replace('num_of_stones_', ''));
        this.setState({ num_of_stone: value, show_num_of_stones: false });
        if (this.props.data.ring === 'pair') { this.props.setRingPairNumOfStones(value); }
        else if (this.props.data.ring === 'ring_1') { this.props.setRing1NumOfStones(value); }
        else { this.props.setRing2NumOfStones(value); }
    }
    handlePosition = e => {
        const value = parseInt(e.target.id.replace('position_', ''));
        this.setState({ position: value, show_position: false });
        if (this.props.data.ring === 'pair') { this.props.setRingPairPosition(value); }
        else if (this.props.data.ring === 'ring_1') { this.props.setRing1Position(value); }
        else { this.props.setRing2Position(value); }
    }


    render() {
        const { show_diamond_size, show_diamond_quality, show_num_of_stones, show_position } = this.state;
        const diamond_cut = this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? this.props.data.ring_1_diamond_cut : this.props.data.ring_2_diamond_cut;
        const diamond_size = this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? this.props.data.ring_1_diamond_size : this.props.data.ring_2_diamond_size;
        const diamond_quality = this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? this.props.data.ring_1_diamond_quality : this.props.data.ring_2_diamond_quality;
        const num_of_stone = this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? this.props.data.ring_1_number_of_stones : this.props.data.ring_2_number_of_stones;
        const position = this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? this.props.data.ring_1_position : this.props.data.ring_2_position;

        let _brilliant_diamond_sizes = brilliant_diamond_sizes;
        let _princess_diamond_sizes = princess_diamond_sizes;
        let _baguette_diamond_sizes = baguette_diamond_sizes;

        let diamond_qualities = ['G/SI', 'G/VSI', 'G/IF', 'G/VVSI', 'G/SI'];
        let _diamond_qualities = ['G/SI', 'G/VSI', 'G/IF', 'G/VVSI', 'G/SI'];
        let num_of_stones = null;
        let _num_of_stones = null;
        if (diamond_cut == 0) {
            num_of_stones = ['Right around (31)', 'Half of a ring (15)', 'Third of a ring(10)', ...Array.from({ length: 31 }, (_, i) => i + 1)];
            _num_of_stones = ['Right around (31)', 'Half of a ring (15)', 'Third of a ring(10)', ...Array.from({ length: 31 }, (_, i) => i + 1)];
        } else if (diamond_cut == 1) {
            num_of_stones = ['Right around (36)', 'Half of a ring (15)', 'Third of a ring(10)', ...Array.from({ length: 36 }, (_, i) => i + 1)];
            _num_of_stones = ['Right around (36)', 'Half of a ring (15)', 'Third of a ring(10)', ...Array.from({ length: 36 }, (_, i) => i + 1)];
        } else {
            num_of_stones = ['Right around (20)', 'Half of a ring (15)', 'Third of a ring(10)', ...Array.from({ length: 20 }, (_, i) => i + 1)];
            _num_of_stones = ['Right around (20)', 'Half of a ring (15)', 'Third of a ring(10)', ...Array.from({ length: 20 }, (_, i) => i + 1)];
        }
        let positions = ['Left', 'Middle', 'Right', 'Free'];
        let _positions = ['Left', 'Middle', 'Right', 'Free'];

        _brilliant_diamond_sizes = _brilliant_diamond_sizes.map((item, index) => {
            return <li id={'diamond_size_' + index} key={index} className={index == diamond_size ? 'active' : ''} onClick={this.handleDiamondSize}>
                <span id={'diamond_size_' + index} className="brilliant option-image" style={{ backgroundSize: `${item.background_size}` }}></span>
                <span id={'diamond_size_' + index} className="option-label">{item.label + " ct."}</span>
            </li>
        });
        _princess_diamond_sizes = _princess_diamond_sizes.map((item, index) => {
            return <li id={'diamond_size_' + index} key={index} className={index == diamond_size ? 'active' : ''} onClick={this.handleDiamondSize}>
                <span id={'diamond_size_' + index} className="princess option-image" style={{ backgroundSize: `${item.background_size}` }}></span>
                <span id={'diamond_size_' + index} className="option-label">{item.label + " ct."}</span>
            </li>
        });
        _baguette_diamond_sizes = _baguette_diamond_sizes.map((item, index) => {
            return <li id={'diamond_size_' + index} key={index} className={index == diamond_size ? 'active' : ''} onClick={this.handleDiamondSize}>
                <span id={'diamond_size_' + index} className="baguette option-image" style={{ backgroundSize: `${item.background_size}` }}></span>
                <span id={'diamond_size_' + index} className="option-label">{item.label + " ct."}</span>
            </li>
        });
        _diamond_qualities = _diamond_qualities.map((item, index) => {
            return <li id={'diamond_quality_' + index} key={index} className={index == diamond_quality ? 'active' : ''} onClick={this.handleDiamondQuality}>
                <span id={'diamond_quality_' + index} className="option-label">{item}</span>
            </li>
        });
        _num_of_stones = _num_of_stones.map((item, index) => {
            return <li id={'num_of_stones_' + index} key={index} className={index == num_of_stone ? 'active' : ''} onClick={this.handleNumOfStones}>
                <span id={'num_of_stones_' + index} className="option-label">{item}</span>
            </li>
        });
        _positions = _positions.map((item, index) => {
            return <li id={'position_' + index} key={index} className={index == position ? 'active' : ''} onClick={this.handlePosition}>
                <span id={'position_' + index} className="option-label">{item}</span>
            </li>
        });

        return (
            <div className="bezel-controls">
                <div className="row justify-content-start">
                    {/* diamond cut */}
                    <div className="col-sm-4 diamond-cuts cut-class">
                        <label>Diamond cut</label>
                        <ul>
                            <li id="diamond_cut_0" className={diamond_cut == 0 ? 'option active' : 'option'} onClick={this.handleDiamondCut}><span id="diamond_cut_0" style={{ backgroundImage: `url(${brilliant})` }}></span></li>
                            <li id="diamond_cut_1" className={diamond_cut == 1 ? 'option active' : 'option disabled'}><span id="diamond_cut_1" style={{ backgroundImage: `url(${princess})` }}></span></li>
                            <li id="diamond_cut_2" className={diamond_cut == 2 ? 'option active' : 'option disabled'}><span id="diamond_cut_2" style={{ backgroundImage: `url(${baguette})` }}></span></li>
                        </ul>
                    </div>

                    {/* diamond size */}
                    <div className="col-sm-4 diamond-size size-class">
                        <label>Diamond size</label>
                        <div className="diamond-size-select">
                            {/* select */}
                            <div className={diamond_cut == 0 ? 'select-toggle brilliant' : diamond_cut == 1 ? 'select-toggle princess' : 'select-toggle baguette'} onClick={this.showDiamondSize}>
                                <span className="option-image" onClick={this.showDiamondSize}></span>
                                <span className="option-label" onClick={this.showDiamondSize}>{diamond_cut == 0 ? brilliant_diamond_sizes[parseInt(diamond_size)].label + ' ct.' : diamond_cut == 1 ? princess_diamond_sizes[parseInt(diamond_size)].label + ' ct.' : baguette_diamond_sizes[parseInt(diamond_size)].label + ' ct.'}</span>
                                <i icon="dropdown-arrow" className="svg-icon svg-icon-dropdown-arrow">
                                    <svg id="dropdown-arrow" viewBox="0 0 18 18" width="18" height="18" onClick={this.showDiamondSize}>
                                        <path d="M 3 7.3266 L 9 13 L 15 7.3507 L 13.7368 6 L 9 10.5773 L 4.2632 6 L 3 7.3266 Z"></path>
                                    </svg>
                                </i>
                            </div>
                            {/* select options */}
                            <div className="select-options" style={{ display: `${show_diamond_size ? 'block' : 'none'}` }}>
                                <ul> {diamond_cut == 0 ? _brilliant_diamond_sizes : diamond_cut == 1 ? _princess_diamond_sizes : _baguette_diamond_sizes} </ul>
                            </div>
                        </div>
                    </div>

                    {/* diamond quality */}
                    <div className="col-sm-4 diamond-quality quality-class">
                        <label>Diamond quality</label>
                        <div className="diamond-size-select">
                            {/* select */}
                            <div className="select-toggle" onClick={this.showDiamondQuality}>
                                <span className="option-label" onClick={this.showDiamondQuality}>{diamond_qualities[parseInt(diamond_quality)]}</span>
                                <i icon="dropdown-arrow" className="svg-icon svg-icon-dropdown-arrow">
                                    <svg id="dropdown-arrow" viewBox="0 0 18 18" width="18" height="18" onClick={this.showDiamondQuality}>
                                        <path d="M 3 7.3266 L 9 13 L 15 7.3507 L 13.7368 6 L 9 10.5773 L 4.2632 6 L 3 7.3266 Z"></path>
                                    </svg>
                                </i>
                            </div>
                            {/* select options */}
                            <div className="select-options" style={{ display: `${show_diamond_quality ? 'block' : 'none'}` }}>
                                <ul> {_diamond_qualities} </ul>
                            </div>
                        </div>
                    </div>

                    {/* number of stones */}
                    <div className="col-sm-4 diamond-quality number-class">
                        <label>Number of stones</label>
                        <div className="diamond-size-select">
                            {/* select */}
                            <div className="select-toggle" onClick={this.showNumOfStones}>
                                <span className="option-label" onClick={this.showNumOfStones}>{num_of_stones[parseInt(num_of_stone)]}</span>
                                <i icon="dropdown-arrow" className="svg-icon svg-icon-dropdown-arrow">
                                    <svg id="dropdown-arrow" viewBox="0 0 18 18" width="18" height="18" onClick={this.showNumOfStones}>
                                        <path d="M 3 7.3266 L 9 13 L 15 7.3507 L 13.7368 6 L 9 10.5773 L 4.2632 6 L 3 7.3266 Z"></path>
                                    </svg>
                                </i>
                            </div>
                            {/* select options */}
                            <div className="select-options" style={{ display: `${show_num_of_stones ? 'block' : 'none'}` }}>
                                <ul> {_num_of_stones} </ul>
                            </div>
                        </div>
                    </div>

                    {/* position */}
                    <div className="col-sm-4 diamond-quality position-class">
                        <label>Position</label>
                        <div className="diamond-size-select">
                            {/* select */}
                            <div className="select-toggle" onClick={this.showPosition}>
                                <span className="option-label" onClick={this.showPosition}>{positions[parseInt(position)]}</span>
                                <i icon="dropdown-arrow" className="svg-icon svg-icon-dropdown-arrow">
                                    <svg id="dropdown-arrow" viewBox="0 0 18 18" width="18" height="18" onClick={this.showPosition}>
                                        <path d="M 3 7.3266 L 9 13 L 15 7.3507 L 13.7368 6 L 9 10.5773 L 4.2632 6 L 3 7.3266 Z"></path>
                                    </svg>
                                </i>
                            </div>
                            {/* select options */}
                            <div className="select-options" style={{ display: `${show_position ? 'block' : 'none'}` }}>
                                <ul> {_positions} </ul>
                            </div>
                        </div>
                    </div>

                    {/* FreePosition component */}
                    {position === 3 && <div className="col-12">
                        <FreePosition />
                    </div>}
                </div>
            </div>
        )
    }
}

ChannelControls.propTypes = { data: PropTypes.object.isRequired };

const mapStateToProps = (state) => ({ data: state.data });
const mapActionsToProps = { setRingPairDiamondCut, setRing1DiamondCut, setRing2DiamondCut, setRingPairDiamondSize, setRing1DiamondSize, setRing2DiamondSize, setRingPairDiamondQuality, setRing1DiamondQuality, setRing2DiamondQuality, setRingPairNumOfStones, setRing1NumOfStones, setRing2NumOfStones, setRingPairRows, setRing1Rows, setRing2Rows, setRingPairPosition, setRing1Position, setRing2Position };

export default connect(mapStateToProps, mapActionsToProps)(ChannelControls);