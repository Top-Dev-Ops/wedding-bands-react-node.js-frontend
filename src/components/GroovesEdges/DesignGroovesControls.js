import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setRingPairDesignGrooveAdd, setRing1DesignGrooveAdd, setRing2DesignGrooveAdd } from '../../redux/actions';

import DesignGroovesControl from './Components/DesignGroovesControl';

import { grooves, design_grooves } from '../../assets/variables';

class DesignGroovesControls extends Component {
    constructor(props) {
        super(props);
        if (props.data.ring === 'pair' || props.data.ring === 'ring_1') {
            this.state = {
                design_groove: props.data.ring_1_design_grooves_types.length
            }
        } else {
            this.state = {
                design_groove: props.data.ring_2_design_grooves_types.length
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data.ring !== this.props.data.ring) {
            this.setState({ design_groove: this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? this.props.data.ring_1_design_grooves_types.length : this.props.data.ring_2_design_grooves_types.length });
        }
    }


    handleDesignGroove = e => {
        const value = parseInt(e.target.id.replace('groove_', ''));
        if (this.props.data.ring === 'pair') { this.props.setRingPairDesignGrooveAdd(value); }
        else if (this.props.data.ring === 'ring_1') { this.props.setRing1DesignGrooveAdd(value); }
        else { this.props.setRing2DesignGrooveAdd(value); }
        this.setState({ design_groove: value });
    }

    render() {
        const { ring } = this.props.data;
        const design_groove = this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? this.props.data.ring_1_design_grooves_types.length : this.props.data.ring_2_design_grooves_types.length;

        const joins = ['U groove', 'V groove', 'Right-angled grooves'].map((item, index) => {
            return <li key={index} id={'groove_' + index} className={design_groove == index ? 'option active' : 'option'} onClick={this.handleDesignGroove}>
                <span id={'groove_' + index} className="option-img" style={{ backgroundImage: `url(${grooves[index]})` }}></span>
                <span id={'groove_' + index} className="option-span">{item}</span>
            </li>
        });
        const carbon_milgrain = ['Carbon', 'Milgrain'].map((item, index) => {
            return <li key={index} className='option disabled'>
                <span className="option-img" style={{ backgroundImage: `url(${design_grooves[index]})` }}></span>
                <span className="option-span">{item}</span>
            </li>
        });

        return (
            <>
                {design_groove == 0 && <section className="tab-edges separation-grooves">
                    {/* add join */}
                    <Form.Label className="dimensions-profile-width-label">Add join</Form.Label>
                    <ul> {joins} </ul>

                    {/* icon & label */}
                    <div>
                        <i icon="info" className="svg-icon svg-icon-info pr-3">
                            <svg id="info" viewBox="0 0 43 40" width="43" height="40">
                                <linearGradient id="icon-gradient-info" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                                    <stop offset="0" stopColor="#cdc9bd"></stop>
                                    <stop offset="1" stopColor="#beb7a7"></stop>
                                </linearGradient>
                                <g id="b">
                                    <path d="M-3.369,40H-25a21.4,21.4,0,0,1-14.849-5.858A19.4,19.4,0,0,1-46,20,19.4,19.4,0,0,1-39.849,5.858,21.4,21.4,0,0,1-25,0,21.4,21.4,0,0,1-10.15,5.858,19.4,19.4,0,0,1-4,20a19.044,19.044,0,0,1-1.948,8.424,20.051,20.051,0,0,1-5.261,6.66L-3.369,40ZM-27,16V32h5V16h-5Zm2.5-9A2.5,2.5,0,0,0-27,9.5,2.5,2.5,0,0,0-24.5,12,2.5,2.5,0,0,0-22,9.5,2.5,2.5,0,0,0-24.5,7Z" transform="translate(46 0)" fill="url(#icon-gradient-info)"></path>
                                </g>
                            </svg>
                        </i>
                        <span style={{ color: '#777', fontSize: '14px' }}>Please note that a change in the joint type also affects an existing joint</span>
                    </div>

                    {/* carbon / milgrain */}
                    <Form.Label className="dimensions-profile-width-label mt-3">Carbon / Add Milgrain</Form.Label>
                    <ul> {carbon_milgrain} </ul>
                </section>}
                {design_groove > 0 && <DesignGroovesControl />}
            </>
        );
    }
}

DesignGroovesControls.propTypes = {
    ui: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ ui: state.ui, data: state.data });
const mapActionsToProps = { setRingPairDesignGrooveAdd, setRing1DesignGrooveAdd, setRing2DesignGrooveAdd };

export default connect(mapStateToProps, mapActionsToProps)(DesignGroovesControls);