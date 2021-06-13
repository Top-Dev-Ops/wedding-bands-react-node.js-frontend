import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setRingPairGroove, setRing1Groove, setRing2Groove, setRingPairGrooveWidth, setRing1GrooveWidth, setRing2GrooveWidth, setRingPairGrooveSurface, setRing1GrooveSurface, setRing2GrooveSurface } from '../../redux/actions';

import { grooves } from '../../assets/variables';

import HorizontalSlider from './Components/HorizontalSlider';

class SeparationGroovesControls extends Component {
    constructor(props) {
        super();
        this.state = {
            separation_groove: 0,
            width: 0,
            surface: 0
        }
    }

    // changes groove type of 'U', 'V' & 'Right angled'
    handleSeparationGroove = e => {
        const value = parseInt(e.target.id.replace('groove_', ''));
        if (this.props.data.ring === 'pair') { this.props.setRingPairGroove(value); }
        else if (this.props.data.ring === 'ring_1') { this.props.setRing1Groove(value); }
        else { this.props.setRing2Groove(value); }
    }

    // changes separation groove width & surface
    handleChange = e => {
        if (e.target.id === 'width') {
            if (this.props.data.ring === 'pair') { this.props.setRingPairGrooveWidth(e.target.value); }
            else if (this.props.data.ring === 'ring_1') { this.props.setRing1GrooveWidth(e.target.value); }
            else { this.props.setRing2GrooveWidth(e.target.value); }
        } else {
            if (this.props.data.ring === 'pair') { this.props.setRingPairGrooveSurface(e.target.value); }
            else if (this.props.data.ring === 'ring_1') { this.props.setRing1GrooveSurface(e.target.value); }
            else { this.props.setRing2GrooveSurface(e.target.value); }
        }
    }

    render() {
        const { ring, ring_1_groove, ring_2_groove, ring_1_groove_width, ring_2_groove_width, ring_1_groove_surface, ring_2_groove_surface } = this.props.data;
        const separation_groove = ring === 'pair' || ring === 'ring_1' ? parseInt(ring_1_groove) : parseInt(ring_2_groove);
        const width = ring === 'pair' || ring === 'ring_1' ? parseInt(ring_1_groove_width) : parseInt(ring_2_groove_width);
        const surface = ring === 'pair' || ring === 'ring_1' ? parseInt(ring_1_groove_surface) : parseInt(ring_2_groove_surface);

        let separation_grooves = ['U groove', 'V groove', 'Right-angled grooves'];
        let widths = Array.from(Array(16)).map((e, i) => (i / 10 + 0.5).toFixed(2) + ' mm');
        let surfaces = ['Polished', 'Fine matt'];

        separation_grooves = separation_grooves.map((item, index) => {
            return <li key={index} id={'groove_' + index} className={separation_groove == index ? 'option active' : 'option'} onClick={this.handleSeparationGroove}>
                <span id={'groove_' + index} className="option-img" style={{ backgroundImage: `url(${grooves[index]})` }}></span>
                <span id={'groove_' + index} className="option-span">{item}</span>
            </li>
        });
        widths = widths.map((item, index) => { return <option key={index} value={index}>{item}</option> });
        surfaces = surfaces.map((item, index) => { return <option key={index} value={index}>{item}</option> });

        return (
            <section className="tab-edges separation-grooves">
                <label className="label-bold">Activate/deactivate separation grooves</label>
                <ul> {separation_grooves} </ul>

                <div className="row" style={{ justifyContent: 'left' }}>
                    <Form className="col-6 col-md-4">
                        <Form.Label className="dimensions-profile-width-label">Width</Form.Label>
                        <Form.Control id="width" as="select" className="dimensions-profile-width" onChange={this.handleChange} value={width}>
                            {widths}
                        </Form.Control>
                    </Form>
                    <Form className="col-6 col-md-4">
                        <Form.Label className="dimensions-profile-width-label">Surface</Form.Label>
                        <Form.Control id="surface" as="select" className="dimensions-profile-width" onChange={this.handleChange} value={surface}>
                            {surfaces}
                        </Form.Control>
                    </Form>
                </div>

                {(ring === 'pair' || ring === 'ring_1') && <HorizontalSlider ring_number="Ring 1" />}
                {(ring === 'pair' || ring === 'ring_2') && <HorizontalSlider ring_number="Ring 2" />}
            </section>
        );
    }
}

SeparationGroovesControls.propTypes = {
    ui: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ ui: state.ui, data: state.data });
const mapActionsToProps = {
    setRingPairGroove, setRing1Groove, setRing2Groove, setRingPairGrooveWidth, setRing1GrooveWidth, setRing2GrooveWidth, setRingPairGrooveSurface, setRing1GrooveSurface, setRing2GrooveSurface
};

export default connect(mapStateToProps, mapActionsToProps)(SeparationGroovesControls);