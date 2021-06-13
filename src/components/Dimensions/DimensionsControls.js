import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setRing1Size, setRing1Width, setRing1Height, setRing2Size, setRing2Width, setRing2Height } from '../../redux/actions';

import DimensionsGraphics from './DimensionsGraphics';

class DimensionsControls extends Component {
    constructor(props) {
        super();

        this.state = {
            ring_1_width: props.data.ring_1_width,
            ring_1_height: props.data.ring_1_height,
            ring_1_size: props.data.ring_1_size,
            ring_2_width: props.data.ring_2_width,
            ring_2_height: props.data.ring_2_height,
            ring_2_size: props.data.ring_2_size,
            ring_1_profiles: props.data.ring_1_profiles,
            ring_2_profiles: props.data.ring_2_profiles
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                ring_1_width: nextProps.data.ring_1_width,
                ring_2_width: nextProps.data.ring_2_width,
                ring_1_height: nextProps.data.ring_1_height,
                ring_2_height: nextProps.data.ring_2_height,
                ring_1_size: nextProps.data.ring_1_size,
                ring_2_size: nextProps.data.ring_2_size,
                ring_1_profiles: nextProps.data.ring_1_profiles,
                ring_2_profiles: nextProps.data.ring_2_profiles
            });
        }
    }

    handleChange = (event) => {
        switch (event.target.id) {
            case 'ring_1_width':
                this.setState({ ring_1_width: event.target.value });
                this.props.setRing1Width(event.target.value);
                break;
            case 'ring_1_height':
                this.setState({ ring_1_height: event.target.value });
                this.props.setRing1Height(event.target.value);
                break;
            case 'ring_1_size':
                this.setState({ ring_1_size: event.target.value });
                this.props.setRing1Size(event.target.value);
                break;
            case 'ring_2_width':
                this.setState({ ring_2_width: event.target.value });
                this.props.setRing2Width(event.target.value);
                break;
            case 'ring_2_height':
                this.setState({ ring_2_height: event.target.value });
                this.props.setRing2Height(event.target.value);
                break;
            case 'ring_2_size':
                this.setState({ ring_2_size: event.target.value });
                this.props.setRing2Size(event.target.value);
                break;
            default:
                break;
        }
    }

    render() {
        let profile_widths = Array.from(Array(17)).map((e, i) => (i / 2 + 2).toFixed(2) + ' mm');
        let profile_heights = Array.from(Array(16)).map((e, i) => (i / 10 + 1.1).toFixed(2) + 'mm');
        let ring_sizes = Array.from(Array(59)).map((e, i) => (i / 2 + 45).toFixed(1) + " (Ø " + ((i / 2 + 45) / (Math.PI)).toFixed(2) + "mm)");

        profile_widths = profile_widths.map((item, index) => {
            return <option key={index} value={index}>{item}</option>
        });
        profile_heights = profile_heights.map((item, index) => {
            return <option key={index} value={index}>{item}</option>
        });
        ring_sizes = ring_sizes.map((item, index) => {
            return <option key={index} value={index}>{item}</option>
        });

        const {
            ring_1_width,
            ring_1_height,
            ring_1_size,
            ring_2_width,
            ring_2_height,
            ring_2_size,
            ring_1_profiles,
            ring_2_profiles
        } = this.state;

        return (
            <section className="dimensions-card">
                <div className="dimensions-img-container">
                    <div className="row">
                        <div className="col-md-6 d-flex flex-column align-items-center">
                            <label>Ring 1</label>
                            <DimensionsGraphics profile={ring_1_profiles} width={ring_1_width} height={ring_1_height} />
                        </div>
                        <div className="col-md-6 d-flex flex-column align-items-center">
                            <label>Ring 2</label>
                            <DimensionsGraphics profile={ring_2_profiles} width={ring_2_width} height={ring_2_height} />
                        </div>
                    </div>
                </div>

                <div className="dimensions-controls">
                    <div className="row">
                        <div className="col-sm-6 dimensions-controls-col">
                            <span className="dimensions-controls-col-ring-1">Ring 1</span>
                            <Form>
                                <Form.Label className="dimensions-profile-width-label">Profile width</Form.Label>
                                <Form.Control id="ring_1_width" as="select" className="dimensions-profile-width" onChange={this.handleChange} value={ring_1_width}>
                                    {profile_widths}
                                </Form.Control>
                            </Form>
                            <Form>
                                <Form.Label className="dimensions-profile-width-label">Profile height</Form.Label>
                                <Form.Control id="ring_1_height" as="select" className="dimensions-profile-width" onChange={this.handleChange} value={ring_1_height}>
                                    {profile_heights}
                                </Form.Control>
                            </Form>
                            <Form>
                                <Form.Label className="dimensions-profile-width-label">Ring 1 Size</Form.Label>
                                <Form.Control id="ring_1_size" as="select" className="dimensions-profile-width" onChange={this.handleChange} value={ring_1_size}>
                                    {ring_sizes}
                                </Form.Control>
                            </Form>
                        </div>
                        <div className="col-sm-6 dimensions-controls-col">
                            <span className="dimensions-controls-col-ring-2">Ring 2</span>
                            <Form>
                                <Form.Label className="dimensions-profile-width-label">Profile width</Form.Label>
                                <Form.Control id="ring_2_width" as="select" className="dimensions-profile-width" onChange={this.handleChange} value={ring_2_width}>
                                    {profile_widths}
                                </Form.Control>
                            </Form>
                            <Form>
                                <Form.Label className="dimensions-profile-width-label">Profile height</Form.Label>
                                <Form.Control id="ring_2_height" as="select" className="dimensions-profile-width" onChange={this.handleChange} value={ring_2_height}>
                                    {profile_heights}
                                </Form.Control>
                            </Form>
                            <Form>
                                <Form.Label className="dimensions-profile-width-label">Ring 2 size</Form.Label>
                                <Form.Control id="ring_2_size" as="select" className="dimensions-profile-width" onChange={this.handleChange} value={ring_2_size}>
                                    {ring_sizes}
                                </Form.Control>
                            </Form>
                        </div>
                    </div>
                </div>
            </section >
        );
    }
}

DimensionsControls.propTypes = {
    data: PropTypes.object.isRequired,
    setRing1Size: PropTypes.func.isRequired,
    setRing1Width: PropTypes.func.isRequired,
    setRing1Height: PropTypes.func.isRequired,
    setRing2Size: PropTypes.func.isRequired,
    setRing2Width: PropTypes.func.isRequired,
    setRing2Height: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ data: state.data });
const mapActionsToProps = { setRing1Size, setRing1Width, setRing1Height, setRing2Size, setRing2Width, setRing2Height };

export default connect(mapStateToProps, mapActionsToProps)(DimensionsControls);