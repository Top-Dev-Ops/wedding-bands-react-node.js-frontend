import React, { Component } from 'react';
import { Modal, Form } from 'react-bootstrap';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import {
    setRingPairDesignGrooveAdd,
    setRing1DesignGrooveAdd,
    setRing2DesignGrooveAdd,
    setRingPairDesignGroovesTypes,
    setRingPairDesignGroovesWidths,
    setRingPairDesignGroovesSurfaces,
    setRingPairDesignGroovesAlignments,
    setRingPairDesignGroovesPositions,
    setRing1DesignGroovesTypes,
    setRing1DesignGroovesWidths,
    setRing1DesignGroovesSurfaces,
    setRing1DesignGroovesAlignments,
    setRing1DesignGroovesPositions,
    setRing2DesignGroovesTypes,
    setRing2DesignGroovesWidths,
    setRing2DesignGroovesSurfaces,
    setRing2DesignGroovesAlignments,
    setRing2DesignGroovesPositions,
    updateRingPairDesignGroovesTypes,
    updateRingPairDesignGroovesWidths,
    updateRingPairDesignGroovesSurfaces,
    updateRingPairDesignGroovesAlignments,
    updateRingPairDesignGroovesPositions,
    updateRing1DesignGroovesTypes,
    updateRing1DesignGroovesWidths,
    updateRing1DesignGroovesSurfaces,
    updateRing1DesignGroovesAlignments,
    updateRing1DesignGroovesPositions,
    updateRing2DesignGroovesTypes,
    updateRing2DesignGroovesWidths,
    updateRing2DesignGroovesSurfaces,
    updateRing2DesignGroovesAlignments,
    updateRing2DesignGroovesPositions,
    deleteRingPairDesignGroove,
    deleteRing1DesignGroove,
    deleteRing2DesignGroove,
    deleteRingPairAll,
    deleteRing1All,
    deleteRing2All
} from '../../../redux/actions';

import { grooves, design_grooves } from '../../../assets/variables';

class DesignGroovesControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_width: false,
            show_surface: false,
            groove_tab: 0,
            width: 0,
            surface: 0,
            position: 1.17,
            jointTypeModal: false,
            mouse_capture: false,
            mousePt: {},
            gGrooveStart: 0
        }

        this.grooveCanvas = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('mousedown', this.clickWindow);
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data.ring_1_config != this.props.data.ring_1_config || prevProps.data.ring_2_config != this.props.data.ring_2_config) {
            this.ring_1_config = this.props.data.ring_1_config;
            this.ring_2_config = this.props.data.ring_2_config;

            this.props.data.wizard === 'grooves' && (this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1') && this.props.data.ring_1_design_grooves_types.length > 0 && this.ring_1_config.displayGroove(45);
            this.props.data.wizard === 'grooves' && this.props.data.ring === 'ring_2' && this.props.data.ring_2_design_grooves_types.length > 0 && this.ring_2_config.displayGroove(45);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.clickWindow);
    }

    // click event on window outside controls
    clickWindow = e => { this.setState({ show_width: false, show_surface: false, jointTypeModal: false }); }

    // shows / hides width & surface select options
    showWidth = () => { this.setState({ show_width: !this.state.show_width }); }
    showSurface = () => { this.setState({ show_surface: !this.state.show_surface }); }

    // changes groove tabs of 1, 2, 3 ...
    handleGrooveTab = e => { this.setState({ groove_tab: parseInt(e.target.id.replace('groove_tab_', '')) }); }
    handleAdd = () => {
        if (this.props.data.ring === 'pair') { this.props.setRingPairDesignGrooveAdd(0); }
        else if (this.props.data.ring === 'ring_1') { this.props.setRing1DesignGrooveAdd(0); }
        else { this.props.setRing2DesignGrooveAdd(0); }
        this.props.updateRingPairDesignGroovesTypes({ index: 0, type: 'v' });
    };

    // stores values of width, surface, alignment & position in redux store
    handleWidth = e => {
        this.setState({ width: parseInt(e.target.id.replace('width_', '')), show_width: false });
        if (this.props.data.ring === 'pair') { this.props.updateRingPairDesignGroovesWidths({ index: this.state.groove_tab, width: parseInt(e.target.id.replace('width_', '')) }); }
        else if (this.props.data.ring === 'ring_1') { this.props.updateRing1DesignGroovesWidths({ index: this.state.groove_tab, width: parseInt(e.target.id.replace('width_', '')) }); }
        else { this.props.updateRing2DesignGroovesWidths({ index: this.state.groove_tab, width: parseInt(e.target.id.replace('width_', '')) }); }
    }
    handleSurface = e => {
        this.setState({ surface: parseInt(e.target.id.replace('surface_', '')), show_surface: false });
        if (this.props.data.ring === 'pair') { this.props.updateRingPairDesignGroovesSurfaces({ index: this.state.groove_tab, surface: parseInt(e.target.id.replace('surface_', '')) }); }
        else if (this.props.data.ring === 'ring_1') { this.props.updateRing1DesignGroovesSurfaces({ index: this.state.groove_tab, surface: parseInt(e.target.id.replace('surface_', '')) }); }
        else { this.props.updateRing2DesignGroovesSurfaces({ index: this.state.groove_tab, surface: parseInt(e.target.id.replace('surface_', '')) }); }
    }
    handleStepper = e => {
        if (e.target.id === 'stepper_minus') {
            const value = parseFloat((this.state.position - 0.01).toFixed(2));
            this.setState({ position: value });
            if (this.props.data.ring === 'pair') { this.props.updateRingPairDesignGroovesPositions({ index: this.state.groove_tab, position: value }); }
            else if (this.props.data.ring === 'ring_1') { this.props.updateRing1DesignGroovesPositions({ index: this.state.groove_tab, position: value }); }
            else { this.props.updateRing2DesignGroovesPositions({ index: this.state.groove_tab, position: value }); }
        } else {
            const value = parseFloat((this.state.position + 0.01).toFixed(2));
            this.setState({ position: value });
            if (this.props.data.ring === 'pair') { this.props.updateRingPairDesignGroovesPositions({ index: this.state.groove_tab, position: value }); }
            else if (this.props.data.ring === 'ring_1') { this.props.updateRing1DesignGroovesPositions({ index: this.state.groove_tab, position: value }); }
            else { this.props.updateRing2DesignGroovesPositions({ index: this.state.groove_tab, position: value }); }
        }
    }
    handlePosition = e => { }
    handleDelete = e => {
        this.setState({ groove_tab: 0 });
        if (e.target.id === 'delete_this') {
            if (this.props.data.ring === 'pair') { this.props.deleteRingPairDesignGroove(this.state.groove_tab); }
            else if (this.props.data.ring === 'ring_1') { this.props.deleteRing1DesignGroove(this.state.groove_tab); }
            else { this.props.deleteRing2DesignGroove(this.state.groove_tab); }
        } else {
            if (this.props.data.ring === 'pair') { this.props.deleteRingPairAll(); }
            else if (this.props.data.ring === 'ring_1') { this.props.deleteRing1All(); }
            else { this.props.deleteRing2All(); }
        }
    }

    handleDesignGroove = e => {
        if (this.props.data.ring === 'pair') { this.props.updateRingPairDesignGroovesTypes({ index: this.state.groove_tab, type: parseInt(e.target.id.replace('groove_', '')) }); }
        else if (this.props.data.ring === 'ring_1') { this.props.updateRing1DesignGroovesTypes({ index: this.state.groove_tab, type: parseInt(e.target.id.replace('groove_', '')) }); }
        else { this.props.updateRing2DesignGroovesTypes({ index: this.state.groove_tab, type: parseInt(e.target.id.replace('groove_', '')) }); }
    }

    render() {
        const { show_width, show_surface, groove_tab } = this.state;
        const { ring, ring_1_design_grooves_types, ring_1_design_grooves_widths, ring_1_design_grooves_surfaces, ring_1_design_grooves_positions, ring_2_design_grooves_types, ring_2_design_grooves_widths, ring_2_design_grooves_surfaces, ring_2_design_grooves_positions } = this.props.data;

        const index_active = ring === 'pair' || ring === 'ring_1' ? ring_1_design_grooves_types[groove_tab] : ring_2_design_grooves_types[groove_tab];
        const width = ring === 'pair' || ring === 'ring_1' ? ring_1_design_grooves_widths[groove_tab] : ring_2_design_grooves_widths[groove_tab];
        const surface = ring === 'pair' || ring === 'ring_1' ? ring_1_design_grooves_surfaces[groove_tab] : ring_2_design_grooves_surfaces[groove_tab];
        const position = ring === 'pair' || ring === 'ring_1' ? ring_1_design_grooves_positions[groove_tab] : ring_2_design_grooves_positions[groove_tab];

        let grooves_tabs = ring === 'pair' || ring === 'ring_1' ? Array.from(Array(ring_1_design_grooves_types.length).keys()) : Array.from(Array(ring_2_design_grooves_types.length).keys());
        grooves_tabs = grooves_tabs.map((item, index) => {
            return <li key={index} id={'groove_tab_' + index} className={groove_tab == index ? 'option active' : 'option'} onClick={this.handleGrooveTab}>
                <span id={'groove_tab_' + index} className="option-span">{item + 1}</span>
            </li>
        });

        const widths = ['0.35', '0.50', '1.00'];
        const _widths = ['0.35', '0.50', '1.00'].map((item, index) => {
            return <li id={'width_' + index} key={index} className={index == width ? 'active' : ''} onClick={this.handleWidth}>
                <span id={'width_' + index} className="option-label">{item}</span>
            </li>
        });
        const surfaces = ['Polished', 'Fine matt'];
        const _surfaces = ['Polished', 'Fine matt'].map((item, index) => {
            return <li id={'surface_' + index} key={index} className={index == surface ? 'active' : ''} onClick={this.handleSurface}>
                <span id={'surface_' + index} className="option-label">{item}</span>
            </li>
        });
        const alignments = ['straight', 'wave'].map((item, index) => {
            return <li key={index} className={index === 1 ? 'disabled' : undefined}>
                <span className="option-image">
                    {index == 0 ?
                        <svg id="groove-type-vertical" viewBox="0 0 18 25" width="18" height="25">
                            <g id="a">
                                <rect x="0.5" y="0.5" width="17" height="24" rx="1.5" strokeWidth="1" stroke="currentColor" fill="none"></rect>
                                <rect width="2" height="19" transform="translate(8 3)" fill="currentColor"></rect>
                            </g>
                        </svg>
                        : <svg id="groove-type-wave" viewBox="0 0 18 25" width="18" height="25">
                            <g id="b">
                                <g fill="none" stroke="currentColor" strokeWidth="1">
                                    <rect width="18" height="25" rx="2" stroke="none"></rect>
                                    <rect x="0.5" y="0.5" width="17" height="24" rx="1.5" fill="none"></rect>
                                </g>
                                <path d="M531.031,346.515s4.219.919,4.219,4.571-5.462,3.721-5.462,7.68,4.243,4.267,4.243,4.267" transform="translate(-523.291 -342.43)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
                            </g>
                        </svg>
                    }
                </span>
                <span className="option-label">{item}</span>
            </li>
        });

        const joins = ['U groove', 'V groove', 'Right-angled grooves'].map((item, index) => {
            return <li key={index} id={'groove_' + index} className={index_active == index ? 'option active' : 'option'} onClick={this.handleDesignGroove}>
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
                <div className="row justify-content-between px-3">
                    {/* groove canvas for showing design grooves */}
                    <canvas id="grooveCanvas" height="400px" width="100px"></canvas>

                    {/* groove tabs pane with 1, 2 & 3 */}
                    <div className="design-grooves-tabs">
                        {/* tabs 1, 2, 3 */}
                        <div className="design-grooves-tab">
                            {/* tabs */}
                            <ul> {grooves_tabs} </ul>

                            {/* add button */}
                            <button id="add" className="btn btn-iconed btn-default btn-sm" onClick={this.handleAdd}>
                                <i id="add" className="text-primary svg-icon svg-icon-new active" icon="new">
                                    <svg id="add" viewBox="0 0 18 18" width="18" height="18">
                                        <path d="M 16.1016 0.0351 L 6 0 C 4.75 0 4.0559 0.9985 4.0559 1.5807 L 4 4 L 6 4 L 6 2 L 16 2 L 16 11 L 14 11 L 14 13 L 16 13 C 16.8353 13 18.0759 11.7277 18 11 L 18 2 C 18 1.0539 17.1647 0.1079 16.1016 0.0351 ZM 7 7 L 7 10 L 10 10 L 10 12 L 7 12 L 7 15 L 5 15 L 5 12 L 2 12 L 2 10 L 5 10 L 5 7 L 7 7 ZM 3 5 C 1.3431 5 0 6.3431 0 8 L 0 14 C 0 15.6569 1.3431 17 3 17 L 9 17 C 10.6569 17 12 15.6569 12 14 L 12 8 C 12 6.3431 10.6569 5 9 5 L 3 5 Z"></path>
                                    </svg>
                                </i> add
                            </button>
                        </div>

                        <div className="design-grooves-tabs-pane">
                            {/* groove type (u, v, right-angled) & button(change joint type) */}
                            <div className="grooves-selector">
                                <div className="grooves-selector-image" style={{ backgroundImage: `url(${grooves[index_active]})` }}>
                                    <label>{index_active === 0 ? 'U groove' : index_active === 1 ? 'V groove' : 'Right-angled grooves'}</label>
                                </div>
                                <div className="grooves-selector-body">
                                    <button className="btn btn-default" onClick={() => this.setState({ jointTypeModal: true })}>Change Joint Type</button>
                                </div>
                            </div>

                            {/* width select */}
                            <div className="design-grooves-select">
                                <div className="diamond-quality row">
                                    <label className="col-3">Width</label>
                                    <div className="diamond-size-select col-9">
                                        {/* select */}
                                        <div className="select-toggle" onClick={this.showWidth}>
                                            <span className="option-label" onClick={this.showWidth}>{widths[width]}</span>
                                            <i icon="dropdown-arrow" className="svg-icon svg-icon-dropdown-arrow">
                                                <svg id="dropdown-arrow" viewBox="0 0 18 18" width="18" height="18" onClick={this.showWidth}>
                                                    <path d="M 3 7.3266 L 9 13 L 15 7.3507 L 13.7368 6 L 9 10.5773 L 4.2632 6 L 3 7.3266 Z"></path>
                                                </svg>
                                            </i>
                                        </div>
                                        {/* select options */}
                                        <div className="select-options" style={{ display: `${show_width ? 'block' : 'none'}` }}>
                                            <ul> {_widths} </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* surface select */}
                            <div className="design-grooves-select">
                                <div className="diamond-quality row">
                                    <label className="col-3">Surface</label>
                                    <div className="diamond-size-select col-9">
                                        {/* select */}
                                        <div className="select-toggle" onClick={this.showSurface}>
                                            <span className="option-label" onClick={this.showSurface}>{surfaces[surface]}</span>
                                            <i icon="dropdown-arrow" className="svg-icon svg-icon-dropdown-arrow">
                                                <svg id="dropdown-arrow" viewBox="0 0 18 18" width="18" height="18" onClick={this.showSurface}>
                                                    <path d="M 3 7.3266 L 9 13 L 15 7.3507 L 13.7368 6 L 9 10.5773 L 4.2632 6 L 3 7.3266 Z"></path>
                                                </svg>
                                            </i>
                                        </div>
                                        {/* select options */}
                                        <div className="select-options" style={{ display: `${show_surface ? 'block' : 'none'}` }}>
                                            <ul> {_surfaces} </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* alignment select */}
                            <div className="design-grooves-select">
                                <div className="diamond-quality grooves-alignment row">
                                    <label className="col-3">Alignment</label>
                                    <div className="col-9">
                                        <ul className="grooves-alignment"> {alignments} </ul>
                                    </div>
                                </div>
                            </div>

                            {/* position select */}
                            <div className="design-grooves-select">
                                <div className="diamond-quality row">
                                    <label className="col-3">Position</label>
                                    <div className="col-9 d-flex">
                                        <input className="form-control" type="text" placeholder="" value={position.toFixed(2)} onChange={this.handlePosition} />
                                        <div className="d-flex">
                                            <div className="minus" id="stepper_minus" onClick={this.handleStepper}>
                                                <i id="stepper_minus" icon="stepper-minus" className="svg-icon svg-icon-stepper-minus">
                                                    <svg id="stepper_minus" viewBox="0 0 16 16" width="16" height="16">
                                                        <title>stepper-minus</title>
                                                        <line x1="14" y1="8" x2="2" y2="8" fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></line>
                                                    </svg>
                                                </i>
                                            </div>
                                            <div className="minus" id="stepper_plus" onClick={this.handleStepper}>
                                                <i id="stepper_plus" icon="stepper-plus" className="svg-icon svg-icon-stepper-plus active">
                                                    <svg id="stepper_plus" viewBox="0 0 16 16" width="16" height="16">
                                                        <title>stepper-plus</title>
                                                        <line x1="8" y1="2" x2="8" y2="14" fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></line>
                                                        <line x1="14" y1="8" x2="2" y2="8" fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></line>
                                                    </svg>
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* delete this joint button */}
                            <div className="grooves-selector-delete">
                                <button className="btn btn-transparent btn-delete" id="delete_this" onClick={this.handleDelete}>
                                    <span id="delete_this"> x </span> Delete this joint
                                </button>
                            </div>

                            {/* delete all button */}
                            <div className="grooves-selector-delete-all">
                                <button className="btn btn-transparent btn-delete" id="delete_all" onClick={this.handleDelete}>
                                    Delete all <span id="delete_all"> x </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal size="lg" show={this.state.jointTypeModal} onHide={() => this.setState({ jointTypeModal: false })} dialogClassName="modal-90w" aria-labelledby="change joint type modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Select join</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <section className="tab-edges separation-grooves">
                            {/* add join */}
                            <Form.Label className="dimensions-profile-width-label">Select join</Form.Label>
                            <ul className="d-flex"> {joins} </ul>

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
                            <ul className="d-flex"> {carbon_milgrain} </ul>
                        </section>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

DesignGroovesControl.propTypes = {
    ui: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ ui: state.ui, data: state.data });
const mapActionsToProps = { setRingPairDesignGrooveAdd, setRing1DesignGrooveAdd, setRing2DesignGrooveAdd, setRingPairDesignGroovesTypes, setRingPairDesignGroovesWidths, setRingPairDesignGroovesSurfaces, setRingPairDesignGroovesAlignments, setRingPairDesignGroovesPositions, setRing1DesignGroovesTypes, setRing1DesignGroovesWidths, setRing1DesignGroovesSurfaces, setRing1DesignGroovesAlignments, setRing1DesignGroovesPositions, setRing2DesignGroovesTypes, setRing2DesignGroovesWidths, setRing2DesignGroovesSurfaces, setRing2DesignGroovesAlignments, setRing2DesignGroovesPositions, updateRingPairDesignGroovesTypes, updateRingPairDesignGroovesWidths, updateRingPairDesignGroovesSurfaces, updateRingPairDesignGroovesAlignments, updateRingPairDesignGroovesPositions, updateRing1DesignGroovesTypes, updateRing1DesignGroovesWidths, updateRing1DesignGroovesSurfaces, updateRing1DesignGroovesAlignments, updateRing1DesignGroovesPositions, updateRing2DesignGroovesTypes, updateRing2DesignGroovesWidths, updateRing2DesignGroovesSurfaces, updateRing2DesignGroovesAlignments, updateRing2DesignGroovesPositions, deleteRingPairDesignGroove, deleteRing1DesignGroove, deleteRing2DesignGroove, deleteRingPairAll, deleteRing1All, deleteRing2All };

export default connect(mapStateToProps, mapActionsToProps)(DesignGroovesControl);