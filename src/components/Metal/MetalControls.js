import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setPairMaterial, setRing1Material, setRing2Material, setRingPairSurface, setRingPairMetal, setRingPairFineness, setRingPair2Surface, setRingPair2Metal, setRingPair2Fineness, setRingPair3Surface, setRingPair3Metal, setRingPair3Fineness, setRing1Surface, setRing1Metal, setRing1Fineness, setRing12Surface, setRing12Metal, setRing12Fineness, setRing13Surface, setRing13Metal, setRing13Fineness, setRing2Surface, setRing2Metal, setRing2Fineness, setRing22Surface, setRing22Metal, setRing22Fineness, setRing23Surface, setRing23Metal, setRing23Fineness, setRingPairWaveHeight, setRingPairNumberOfWaves, setRing1WaveHeight, setRing1NumberOfWaves, setRing2WaveHeight, setRing2NumberOfWaves } from '../../redux/actions';

import { two_colors_images, three_colors_images, surfaces, metals } from '../../assets/variables';
import two_color_none from '../../assets/img/two_color.png';
import three_color_none from '../../assets/img/three_color.png';

class MetalControls extends Component {
    constructor(props) {
        super();
        this.two_colors_images = two_colors_images;
        this.three_colors_images = three_colors_images;
        this.surfaces = surfaces;
        this.metals = metals;

        this.state = {
            detailed_2: false,
            detailed_3: false,
            left_surface: surfaces[props.data.ring_1_surface],
            left_metal: metals[props.data.ring_1_metal],
            left_fineness: 375,
            middle_surface: surfaces[props.data.ring_1_surface],
            middle_metal: metals[props.data.ring_1_metal],
            middle_fineness: 375,
            right_surface: surfaces[props.data.ring_1_surface],
            right_metal: metals[props.data.ring_1_metal],
            right_fineness: 375,
        }
    }

    // is called when clicking on 'Single Color' and images on detailed 'Two Colors' & 'Three Colors'
    handleChange = event => {
        if (event.target.id === 'one_color') {
            if (this.props.data.ring === 'pair') { this.props.setPairMaterial(event.target.id); }
            else if (this.props.data.ring === 'ring_1') { this.props.setRing1Material(event.target.id); }
            else { this.props.setRing2Material(event.target.id); }
        } else if (event.target.id.includes('two_')) {
            this.setState({ color: 'two', color_code: event.target.id, detailed_2: false, detailed_3: false });
            if (this.props.data.ring === 'pair') { this.props.setPairMaterial(event.target.id); }
            else if (this.props.data.ring === 'ring_1') { this.props.setRing1Material(event.target.id); }
            else { this.props.setRing2Material(event.target.id); }
        } else if (event.target.id.includes('three_')) {
            this.setState({ color: 'three', color_code: event.target.id, detailed_2: false, detailed_3: false });
            if (this.props.data.ring === 'pair') { this.props.setPairMaterial(event.target.id); }
            else if (this.props.data.ring === 'ring_1') { this.props.setRing1Material(event.target.id); }
            else { this.props.setRing2Material(event.target.id); }
        }
    }

    // displays detailed panel when clicking on either 'Two Colors' or 'Three Colors'
    handleShow = color_id => {
        switch (color_id) {
            case 'two_colors':
                this.setState({ detailed_2: !this.state.detailed_2, detailed_3: false });
                break;
            case 'three_colors':
                this.setState({ detailed_2: false, detailed_3: !this.state.detailed_3 });
                break;
            default:
                this.setState({ detailed_2: false, detailed_3: false });
                break;
        }
    }

    // changes redux state when clicking on left surface, left metal, middle surface, middle metal, right surface & right metal.
    handleColorChange = event => {
        const { ring } = this.props.data;
        const metal = this.state.color;

        switch (event.target.id) {
            case 'left_surface':
                this.surfaces.forEach(item => {
                    if (item.value == event.target.value) {
                        this.setState({ left_surface: item });
                        if (ring === 'pair') { this.props.setRingPairSurface({ metal: metal, surface: event.target.value }); }
                        else if (ring === 'ring_1') { this.props.setRing1Surface({ metal: metal, surface: event.target.value }); }
                        else { this.props.setRing2Surface({ metal: metal, surface: event.target.value }); }
                    }
                });
                break;
            case 'left_metal':
                this.metals.forEach(item => {
                    if (item.value == event.target.value) {
                        this.setState({ left_metal: item });
                        if (ring === 'pair') { this.props.setRingPairMetal({ metal: metal, metals: event.target.value }); }
                        else if (ring === 'ring_1') { this.props.setRing1Metal({ metal: metal, metals: event.target.value }); }
                        else { this.props.setRing2Metal({ metal: metal, metals: event.target.value }); }
                    }
                });
                break;
            case 'middle_surface':
                this.surfaces.forEach(item => {
                    if (item.value == event.target.value) {
                        this.setState({ middle_surface: item });
                        if (ring === 'pair') { this.props.setRingPair2Surface({ metal: metal, surface: event.target.value }); }
                        else if (ring === 'ring_1') { this.props.setRing12Surface({ metal: metal, surface: event.target.value }); }
                        else { this.props.setRing22Surface({ metal: metal, surface: event.target.value }); }
                    }
                });
                break;
            case 'middle_metal':
                this.metals.forEach(item => {
                    if (item.value == event.target.value) {
                        this.setState({ middle_metal: item });
                        if (ring === 'pair') { this.props.setRingPair2Metal({ metal: metal, metals: event.target.value }); }
                        else if (ring === 'ring_1') { this.props.setRing12Metal({ metal: metal, metals: event.target.value }); }
                        else { this.props.setRing22Metal({ metal: metal, metals: event.target.value }); }
                    }
                });
                break;
            case 'right_surface':
                this.surfaces.forEach(item => {
                    if (item.value == event.target.value) {
                        this.setState({ right_surface: item });
                        if (ring === 'pair') { this.props.setRingPair3Surface({ metal: metal, surface: event.target.value }); }
                        else if (ring === 'ring_1') { this.props.setRing13Surface({ metal: metal, surface: event.target.value }); }
                        else { this.props.setRing23Surface({ metal: metal, surface: event.target.value }); }
                    }
                });
                break;
            case 'right_metal':
                this.metals.forEach(item => {
                    if (item.value == event.target.value) {
                        this.setState({ right_metal: item });
                        if (ring === 'pair') { this.props.setRingPair3Metal({ metal: metal, metals: event.target.value }); }
                        else if (ring === 'ring_1') { this.props.setRing13Metal({ metal: metal, metals: event.target.value }); }
                        else { this.props.setRing23Metal({ metal: metal, metals: event.target.value }); }
                    }
                });
                break;
            case 'height':
                if (ring === 'pair') { this.props.setRingPairWaveHeight({ metal: metal, height: parseInt(event.target.value) }); }
                else if (ring === 'ring_1') { this.props.setRing1WaveHeight({ metal: metal, height: parseInt(event.target.value) }); }
                else { this.props.setRing2WaveHeight({ metal: metal, height: parseInt(event.target.value) }); }
                break;
            case 'num':
                if (ring === 'pair') { this.props.setRingPairNumberOfWaves({ metal: metal, num: event.target.value }); }
                else if (ring === 'ring_1') { this.props.setRing1NumberOfWaves({ metal: metal, num: event.target.value }); }
                else { this.props.setRing2NumberOfWaves({ metal: metal, num: event.target.value }); }
                break;
            default:
                break;
        }
    }

    // changes redux state when clicking on left fineness, middle fineness & right fineness
    handleFineness = event => {
        const { ring } = this.props.data;
        const metal = this.state.color;
        const value = event.target.id.split('_')[1];

        if (event.target.id.includes('left')) {
            this.setState({ left_fineness: value });
            if (ring === 'pair') {
                this.props.setRingPairFineness({ metal: metal, fineness: value });
            } else if (ring === 'ring_1') {
                this.props.setRing1Fineness({ metal: metal, fineness: value });
            } else { this.props.setRing2Fineness({ metal: metal, fineness: value }); }
        }
        else if (event.target.id.includes('middle')) {
            this.setState({ middle_fineness: value });
            if (ring === 'pair') {
                this.props.setRingPair2Fineness({ metal: metal, fineness: value });
            } else if (ring === 'ring_1') {
                this.props.setRing12Fineness({ metal: metal, fineness: value });
            } else { this.props.setRing22Fineness({ metal: metal, fineness: value }); }
        }
        else {
            this.setState({ right_fineness: value });
            if (ring === 'pair') {
                this.props.setRingPair3Fineness({ metal: metal, fineness: value });
            } else if (ring === 'ring_1') {
                this.props.setRing13Fineness({ metal: metal, fineness: value });
            } else { this.props.setRing23Fineness({ metal: metal, fineness: value }); }
        }
    }

    render() {
        const { detailed_2, detailed_3 } = this.state;

        let left_surface = null;
        let left_metal = null;
        let left_fineness = null;
        let middle_surface = null;
        let middle_metal = null;
        let middle_fineness = null;
        let right_surface = null;
        let right_metal = null;
        let right_fineness = null;
        let wave_height = null;
        let number_of_waves = null;

        const { ring, ring_1_material, ring_2_material, ring_1_surface, ring_1_metal, ring_1_fineness, ring_1_2_surface, ring_1_2_metal, ring_1_2_fineness, ring_1_3_surface, ring_1_3_metal, ring_1_3_fineness, ring_2_surface, ring_2_metal, ring_2_fineness, ring_2_2_surface, ring_2_2_metal, ring_2_2_fineness, ring_2_3_surface, ring_2_3_metal, ring_2_3_fineness, ring_1_wave_height, ring_1_number_of_waves, ring_2_wave_height, ring_2_number_of_waves } = this.props.data;

        const color = this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? this.props.data.ring_1_material : this.props.data.ring_2_material;
        const color_code = this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? this.props.data.ring_1_material : this.props.data.ring_2_material;

        let heights = ['20%', '25%', '30%', '35%', '40%', '50%'];
        let nums = Array.from(Array(3)).map((e, i) => i + 2);

        switch (ring) {
            case 'ring_1':
                left_surface = this.surfaces[parseInt(ring_1_surface)];
                left_metal = this.metals[parseInt(ring_1_metal)];
                left_fineness = ring_1_fineness;
                middle_surface = this.surfaces[parseInt(ring_1_2_surface)];
                middle_metal = this.metals[parseInt(ring_1_2_metal)];
                middle_fineness = ring_1_2_fineness;
                right_surface = this.surfaces[parseInt(ring_1_3_surface)];
                right_metal = this.metals[parseInt(ring_1_3_metal)];
                right_fineness = ring_1_3_fineness;
                wave_height = ring_1_wave_height;
                number_of_waves = ring_1_number_of_waves;
                break;
            case 'ring_2':
                left_surface = this.surfaces[parseInt(ring_2_surface)];
                left_metal = this.metals[parseInt(ring_2_metal)];
                left_fineness = ring_2_fineness;
                middle_surface = this.surfaces[parseInt(ring_2_2_surface)];
                middle_metal = this.metals[parseInt(ring_2_2_metal)];
                middle_fineness = ring_2_2_fineness;
                right_surface = this.surfaces[parseInt(ring_2_3_surface)];
                right_metal = this.metals[parseInt(ring_2_3_metal)];
                right_fineness = ring_2_3_fineness;
                wave_height = ring_2_wave_height;
                number_of_waves = ring_2_number_of_waves;
                break;
            default:
                left_surface = this.surfaces[parseInt(ring_1_surface)];
                left_metal = this.metals[parseInt(ring_1_metal)];
                left_fineness = ring_1_fineness;
                middle_surface = this.surfaces[parseInt(ring_1_2_surface)];
                middle_metal = this.metals[parseInt(ring_1_2_metal)];
                middle_fineness = ring_1_2_fineness;
                right_surface = this.surfaces[parseInt(ring_1_3_surface)];
                right_metal = this.metals[parseInt(ring_1_3_metal)];
                right_fineness = ring_1_3_fineness;
                wave_height = ring_1_wave_height;
                number_of_waves = ring_1_number_of_waves;
                break;
        }

        let surfaces = this.surfaces.map((item, index) => { return <option key={index} value={index}>{item.color}</option> });
        let metals = this.metals.map((item, index) => { return <option key={index} value={index}>{item.material}</option> });
        heights = heights.map((item, index) => { return <option key={index} value={index}>{item}</option> });
        nums = nums.map((item, index) => { return <option key={index} value={index}>{item}</option> });

        const two_color_image = (ring === 'pair' || ring === 'ring_1') && ring_1_material.includes('two') ? two_colors_images[parseInt(ring_1_material.replace('two_colors_', ''))] : ring === 'ring_2' && ring_2_material.includes('two') ? two_colors_images[parseInt(ring_2_material.replace('two_colors_', ''))] : two_color_none;
        const three_color_image = (ring === 'pair' || ring === 'ring_1') && ring_1_material.includes('three') ? three_colors_images[parseInt(ring_1_material.replace('three_colors_', ''))] : ring === 'ring_2' && ring_2_material.includes('three') ? three_colors_images[parseInt(ring_2_material.replace('three_colors_', ''))] : three_color_none;

        return (
            <section className="metal-card">
                {/* single color, two colors & three colors images */}
                <div className="metal-img-container">

                    {/* one color, two colors & three colors images */}
                    <div className="row">
                        <div className="col-4">
                            <div className={`metal-one-color ${color.includes('one') && 'active'}`}>
                                <span id="one_color" className="metal-color-label" onClick={this.handleChange}>Single Color</span>
                                <span id="one_color" className="metal-one-color-image" onClick={this.handleChange}></span>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className={`${detailed_2 ? 'metal-two-colors-before' : 'metal-two-colors'} ${color.includes('two') && 'active'}`} onClick={() => this.handleShow('two_colors')}>
                                <div className="metal-two-colors-label">
                                    <span className="metal-color-label">Two Colors</span>
                                    <span className="metal-two-colors-image" style={{ backgroundImage: `url(${two_color_image})` }}></span>
                                </div>
                            </div>
                            <div className={`metal-two-colors-list ${detailed_2 ? 'd-block' : 'd-none'}`}>
                                <div className="metal-two-colors-list-header">
                                    <label>Two colors</label>
                                    <span onClick={() => this.handleShow('none')}>x</span>
                                </div>
                                <ul>
                                    {two_colors_images.map((image, index) => {
                                        return <li key={index}><span id={`two_colors_${index}`} className="metal-image-list" style={{ backgroundImage: `url(${image})` }} onClick={this.handleChange}></span></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className={`${detailed_3 ? 'metal-three-colors-before' : 'metal-three-colors'} ${color.includes('three') && 'active'}`} onClick={() => this.handleShow('three_colors')}>
                                <div className="metal-three-colors-label">
                                    <span className="metal-color-label">Three Colors</span>
                                    <span className="metal-three-colors-image" style={{ backgroundImage: `url(${three_color_image})` }}></span>
                                </div>
                            </div>
                            <div className={`metal-three-colors-list ${detailed_3 ? 'd-block' : 'd-none'}`}>
                                <div className="metal-three-colors-list-header">
                                    <label>Three colors</label>
                                    <span onClick={() => this.handleShow('none')}>x</span>
                                </div>
                                <ul>
                                    {three_colors_images.map((image, index) => {
                                        return <li key={index}><span id={`three_colors_${index}`} className="metal-image-list" style={{ backgroundImage: `url(${image})` }} onClick={this.handleChange}></span></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* wave heights & number of waves */}
                    <div className="row">
                        <div className="col-6" style={{ display: `${color_code === 'two_colors_3' || color_code === 'two_colors_4' ? 'block' : 'none'}` }}>
                            <label>Wave height</label>
                            <Form.Control className="left-color" id="height" as="select" defaultValue={wave_height} onChange={this.handleColorChange}>
                                {heights}
                            </Form.Control>
                        </div>
                        <div className="col-6" style={{ display: `${color_code === 'two_colors_3' ? 'block' : 'none'}` }}>
                            <label>Number of waves</label>
                            <Form.Control className="left-color" id="num" as="select" defaultValue={number_of_waves} onChange={this.handleColorChange}>
                                {nums}
                            </Form.Control>
                        </div>
                    </div>
                </div>

                {/* surfaces, metals & finenesses */}
                <div className="dimensions-controls">
                    <div className="grid-1-wrapper">

                        {/* single color */}
                        <div className="media media-list">
                            <div className="media-left">
                                <div className="metal-number">1</div>
                            </div>
                            <div className="media-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Control className="left-color" id="left_surface" as="select" value={left_surface.value} onChange={this.handleColorChange} style={{ backgroundImage: `url(${left_surface.image})` }}>
                                            {surfaces}
                                        </Form.Control>
                                        <Form.Control className="left-material" id="left_metal" as="select" value={left_metal.value} onChange={this.handleColorChange} style={{ backgroundImage: `url(${left_metal.image})` }}>
                                            {metals}
                                        </Form.Control>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="fineness">
                                            <label>Fineness {left_surface.color}</label>
                                            <ul>
                                                <li id="left_375" className={`fineness-option ${left_fineness == 375 && 'active'}`} onClick={this.handleFineness}>375/-</li>
                                                <li id="left_585" className={`fineness-option ${left_fineness == 585 && 'active'}`} onClick={this.handleFineness}>585/-</li>
                                                <li id="left_750" className={`fineness-option ${left_fineness == 750 && 'active'}`} onClick={this.handleFineness}>750/-</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* two colors */}
                        {!color.includes('one') &&
                            <div className="media media-list">
                                <div className="media-left">
                                    <div className="metal-number">2</div>
                                </div>
                                <div className="media-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Control className="left-color" id="middle_surface" as="select" defaultValue={middle_surface.value} onChange={this.handleColorChange} style={{ backgroundImage: `url(${middle_surface.image})` }}>
                                                {surfaces}
                                            </Form.Control>
                                            <Form.Control className="left-material" id="middle_metal" as="select" defaultValue={middle_metal.value} onChange={this.handleColorChange} style={{ backgroundImage: `url(${middle_metal.image})` }}>
                                                {metals}
                                            </Form.Control>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="fineness">
                                                <label>Fineness {middle_surface.color}</label>
                                                <ul>
                                                    <li id="middle_375" className={`fineness-option ${middle_fineness == 375 && 'active'}`} onClick={this.handleFineness}>375/-</li>
                                                    <li id="middle_585" className={`fineness-option ${middle_fineness == 585 && 'active'}`} onClick={this.handleFineness}>585/-</li>
                                                    <li id="middle_750" className={`fineness-option ${middle_fineness == 750 && 'active'}`} onClick={this.handleFineness}>750/-</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* three colors */}
                        {color.includes('three') &&
                            <div className="media media-list">
                                <div className="media-left">
                                    <div className="metal-number">3</div>
                                </div>
                                <div className="media-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Control className="left-color" id="right_surface" as="select" defaultValue={right_surface.value} onChange={this.handleColorChange} style={{ backgroundImage: `url(${right_surface.image})` }}>
                                                {surfaces}
                                            </Form.Control>
                                            <Form.Control className="left-material" id="right_metal" as="select" defaultValue={right_metal.value} onChange={this.handleColorChange} style={{ backgroundImage: `url(${right_metal.image})` }}>
                                                {metals}
                                            </Form.Control>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="fineness">
                                                <label>Fineness {right_surface.color}</label>
                                                <ul>
                                                    <li id="right_375" className={`fineness-option ${right_fineness == 375 && 'active'}`} onClick={this.handleFineness}>375/-</li>
                                                    <li id="right_585" className={`fineness-option ${right_fineness == 585 && 'active'}`} onClick={this.handleFineness}>585/-</li>
                                                    <li id="right_750" className={`fineness-option ${right_fineness == 750 && 'active'}`} onClick={this.handleFineness}>750/-</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section >
        );
    }
}

MetalControls.propTypes = {
    data: PropTypes.object.isRequired,
    setRingPairSurface: PropTypes.func.isRequired,
    setRingPairMetal: PropTypes.func.isRequired,
    setRingPairFineness: PropTypes.func.isRequired,
    setRing1Surface: PropTypes.func.isRequired,
    setRing1Metal: PropTypes.func.isRequired,
    setRing1Fineness: PropTypes.func.isRequired,
    setRing2Surface: PropTypes.func.isRequired,
    setRing2Metal: PropTypes.func.isRequired,
    setRing2Fineness: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ data: state.data });
const mapActionsToProps = { setPairMaterial, setRing1Material, setRing2Material, setRingPairSurface, setRingPairMetal, setRingPairFineness, setRingPair2Surface, setRingPair2Metal, setRingPair2Fineness, setRingPair3Surface, setRingPair3Metal, setRingPair3Fineness, setRing1Surface, setRing1Metal, setRing1Fineness, setRing12Surface, setRing12Metal, setRing12Fineness, setRing13Surface, setRing13Metal, setRing13Fineness, setRing2Surface, setRing2Metal, setRing2Fineness, setRing22Surface, setRing22Metal, setRing22Fineness, setRing23Surface, setRing23Metal, setRing23Fineness, setRingPairWaveHeight, setRingPairNumberOfWaves, setRing1WaveHeight, setRing1NumberOfWaves, setRing2WaveHeight, setRing2NumberOfWaves };

export default connect(mapStateToProps, mapActionsToProps)(MetalControls);