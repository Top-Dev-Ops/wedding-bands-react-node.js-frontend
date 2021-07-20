import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setRingPairLeftEdge, setRingPairRightEdge, setRing1LeftEdge, setRing1RightEdge, setRing2LeftEdge, setRing2RightEdge, setRingPairLeftWidth, setRingPairRightWidth, setRingPairLeftSurface, setRingPairRightSurface, setRing1LeftWidth, setRing1RightWidth, setRing1LeftSurface, setRing1RightSurface, setRing2LeftWidth, setRing2RightWidth, setRing2LeftSurface, setRing2RightSurface } from '../../redux/actions';

import { edges } from '../../assets/variables';

class EdgesControls extends Component {
    constructor(props) {
        super();
        this.state = {
            left_edge: 0,
            right_edge: 0,
            left_width: 0,
            left_surface: 0,
            right_width: 0,
            right_surface: 0
        }
    }

    handleEdge = event => {
        if (event.target.id.includes('left_')) {
            this.setState({ left_edge: parseInt(event.target.id.replace('left_', '')) });
            if (this.props.data.ring === 'pair') {
                this.props.setRingPairLeftEdge(parseInt(event.target.id.replace('left_', '')));
            } else if (this.props.data.ring === 'ring_1') {
                this.props.setRing1LeftEdge(parseInt(event.target.id.replace('left_', '')));
            } else {
                this.props.setRing2LeftEdge(parseInt(event.target.id.replace('left_', '')));
            }
        } else {
            this.setState({ right_edge: parseInt(event.target.id.replace('right_', '')) });
            if (this.props.data.ring === 'pair') {
                this.props.setRingPairRightEdge(parseInt(event.target.id.replace('right_', '')));
            } else if (this.props.data.ring === 'ring_1') {
                this.props.setRing1RightEdge(parseInt(event.target.id.replace('right_', '')));
            } else {
                this.props.setRing2RightEdge(parseInt(event.target.id.replace('right_', '')));
            }
        }
    }

    handleWidth = event => {
        if (event.target.id === 'left_width') {
            this.setState({ left_width: event.target.value });
            if (this.props.data.ring === 'pair') {
                this.props.setRingPairLeftWidth(event.target.value);
            } else if (this.props.data.ring === 'ring_1') {
                this.props.setRing1LeftWidth(event.target.value);
            } else {
                this.props.setRing2LeftWidth(event.target.value);
            }
        } else {
            this.setState({ right_width: event.target.value });
            if (this.props.data.ring === 'pair') {
                this.props.setRingPairRightWidth(event.target.value);
            } else if (this.props.data.ring === 'ring_1') {
                this.props.setRing1RightWidth(event.target.value);
            } else {
                this.props.setRing2RightWidth(event.target.value);
            }
        }
    }

    handleSurface = event => {
        if (event.target.id === 'left_surface') {
            this.setState({ left_surface: event.target.value });
            if (this.props.data.ring === "pair") {
                this.props.setRingPairLeftSurface(event.target.value);
            } else if (this.props.data.ring === 'ring_1') {
                this.props.setRing1LeftSurface(event.target.value);
            } else {
                this.props.setRing2LeftSurface(event.target.value);
            }
        } else {
            this.setState({ right_surface: event.target.value });
            if (this.props.data.ring === "pair") {
                this.props.setRingPairRightSurface(event.target.value);
            } else if (this.props.data.ring === 'ring_1') {
                this.props.setRing1RightSurface(event.target.value);
            } else {
                this.props.setRing2RightSurface(event.target.value);
            }
        }
    }

    render() {
        const { ring, ring_1_left_edge, ring_1_right_edge, ring_1_left_width, ring_1_left_surface, ring_1_right_width, ring_1_right_surface, ring_2_left_edge, ring_2_right_edge, ring_2_left_width, ring_2_left_surface, ring_2_right_width, ring_2_right_surface } = this.props.data;

        let left_edge, right_edge, left_width, right_width, left_surface, right_surface;

        if (ring === 'pair' || ring === 'ring_1') {
            left_edge = ring_1_left_edge;
            right_edge = ring_1_right_edge;
            left_width = ring_1_left_width;
            right_width = ring_1_right_width;
            left_surface = ring_1_left_surface;
            right_surface = ring_1_right_surface;
        } else {
            left_edge = ring_2_left_edge;
            right_edge = ring_2_right_edge;
            left_width = ring_2_left_width;
            right_width = ring_2_right_width;
            left_surface = ring_2_left_surface;
            right_surface = ring_2_right_surface;
        }

        let left_edges = ['none', 'edge', 'carbon', 'milgrain'];
        let right_edges = ['none', 'edge', 'carbon', 'milgrain'];
        var widths = [0.35, 0.50, 0.80, 1.00, 1.20, 1.50, 1.80, 2.00];
        const widths_limits = [2, 3, 4, 5, 6, 7, ...Array(10).fill(11)];
        const ring_width = this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? this.props.data.ring_1_width : this.props.data.ring_2_width;
        let surfaces = ['Polished', 'Fine matt'];
        let carbon_surfaces = ['Wrapped', 'Prepreg'];

        left_edges = left_edges.map((item, index) => {
            return <li id={'left_' + index} key={index} className={index > 2 ? 'option disabled' : left_edge == index ? 'option active' : 'option'} onClick={index < 3 ? this.handleEdge : undefined}>
                <span id={'left_' + index} className="option-img" style={{ backgroundImage: `url(${edges[index]})` }}></span>
                <span id={'left_' + index} className="option-span">{item}</span>
            </li>
        });
        right_edges = right_edges.map((item, index) => {
            return <li id={'right_' + index} key={index} className={index > 2 ? 'option disabled' : right_edge == index ? 'option active' : 'option'} onClick={index < 3 ? this.handleEdge : undefined}>
                <span id={'right_' + index} className="option-img" style={{ backgroundImage: `url(${edges[index + 4]})` }}></span>
                <span id={'right_' + index} className="option-span">{item}</span>
            </li>
        });
        widths = widths.map((item, index) => { return index <= widths_limits[ring_width] && <option key={index} value={index}>{item.toFixed(2) + " mm"}</option> });
        surfaces = surfaces.map((item, index) => { return <option key={index} value={index}>{item}</option> });
        carbon_surfaces = carbon_surfaces.map((item, index) => { return <option key={index} value={index}>{item}</option> });

        return (
            <section className="tab-edges">
                <label>Left edge</label>
                <ul> {left_edges} </ul>
                {left_edge != 0 && <div className="row">
                    <Form className="col-6 col-md-4">
                        <Form.Label className="dimensions-profile-width-label">Width</Form.Label>
                        <Form.Control id="left_width" as="select" className="dimensions-profile-width" onChange={this.handleWidth} defaultValue={left_width}>
                            {widths}
                        </Form.Control>
                    </Form>
                    <Form className="col-6 col-md-4">
                        <Form.Label className="dimensions-profile-width-label">Surface</Form.Label>
                        <Form.Control id="left_surface" as="select" className="dimensions-profile-width" onChange={this.handleSurface} defaultValue={left_surface}>
                            {left_edge === 2 ? carbon_surfaces : surfaces}
                        </Form.Control>
                    </Form>
                </div>}

                <label>Right edge</label>
                <ul> {right_edges} </ul>
                {right_edge != 0 && <div className="row">
                    <Form className="col-6 col-md-4">
                        <Form.Label className="dimensions-profile-width-label">Width</Form.Label>
                        <Form.Control id="right_width" as="select" className="dimensions-profile-width" onChange={this.handleWidth} defaultValue={right_width}>
                            {widths}
                        </Form.Control>
                    </Form>
                    <Form className="col-6 col-md-4">
                        <Form.Label className="dimensions-profile-width-label">Surface</Form.Label>
                        <Form.Control id="right_surface" as="select" className="dimensions-profile-width" onChange={this.handleSurface} defaultValue={right_surface}>
                            {right_edge === 2 ? carbon_surfaces : surfaces}
                        </Form.Control>
                    </Form>
                </div>}
            </section>
        );
    }
}

EdgesControls.propTypes = {
    ui: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({ ui: state.ui, data: state.data });
const mapActionsToProps = { setRingPairLeftEdge, setRingPairRightEdge, setRing1LeftEdge, setRing1RightEdge, setRing2LeftEdge, setRing2RightEdge, setRingPairLeftWidth, setRingPairRightWidth, setRingPairLeftSurface, setRingPairRightSurface, setRing1LeftWidth, setRing1RightWidth, setRing1LeftSurface, setRing1RightSurface, setRing2LeftWidth, setRing2RightWidth, setRing2LeftSurface, setRing2RightSurface };

export default connect(mapStateToProps, mapActionsToProps)(EdgesControls);