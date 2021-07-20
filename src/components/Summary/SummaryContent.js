import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

// redux
import { connect } from 'react-redux';
import { setRing1Disabled, setRing2Disabled, setRingPairPrice, setRing1Price, setRing2Price } from '../../redux/actions';

import { surfaces, metals } from '../../assets/variables';
import { brilliant_diamond_sizes, princess_diamond_sizes, baguette_diamond_sizes } from '../../assets/diamond_sizes';

class SummaryContent extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            page: 'home'
        }
    }

    componentDidMount() {
        if (window.location.pathname === '/order') {
            this.setState({ page: 'order' });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.checkIfReduxDataStateChanged(prevProps.data, this.props.data)) {
            if (this.props.data.ring === 'pair') {
                this.props.setRingPairPrice(parseInt(Math.random() * 100 + 900));
            } else if (this.props.data.ring === 'ring_1') {
                this.props.setRing1Price(parseInt(Math.random() * 100 + 900));
            } else {
                this.props.setRing2Price(parseInt(Math.random() * 100 + 900));
            }
        }
    }

    /* checks if specific redux state changed & updates ring in canvas */
    checkIfReduxDataStateChanged(prevProps, nowProps) {
        let state_changed = false;

        if (prevProps.ring_1_material != nowProps.ring_1_material) { state_changed = true; }
        if (prevProps.ring_2_material != nowProps.ring_2_material) { state_changed = true; }
        if (prevProps.ring_1_profiles != nowProps.ring_1_profiles) { state_changed = true; }
        if (prevProps.ring_2_profiles != nowProps.ring_2_profiles) { state_changed = true; }
        if (prevProps.ring_1_size != nowProps.ring_1_size) { state_changed = true; }
        if (prevProps.ring_2_size != nowProps.ring_2_size) { state_changed = true; }
        if (prevProps.ring_1_width != nowProps.ring_1_width) { state_changed = true; }
        if (prevProps.ring_2_width != nowProps.ring_2_width) { state_changed = true; }
        if (prevProps.ring_1_height != nowProps.ring_1_height) { state_changed = true; }
        if (prevProps.ring_2_height != nowProps.ring_2_height) { state_changed = true; }
        if (prevProps.ring_1_metal != nowProps.ring_1_metal) { state_changed = true; }
        if (prevProps.ring_2_metal != nowProps.ring_2_metal) { state_changed = true; }
        if (prevProps.ring_1_surface != nowProps.ring_1_surface) { state_changed = true; }
        if (prevProps.ring_2_surface != nowProps.ring_2_surface) { state_changed = true; }
        if (prevProps.ring_1_fineness != nowProps.ring_1_fineness) { state_changed = true; }
        if (prevProps.ring_2_fineness != nowProps.ring_2_fineness) { state_changed = true; }
        if (prevProps.ring_1_2_surface != nowProps.ring_1_2_surface) { state_changed = true; }
        if (prevProps.ring_1_2_metal != nowProps.ring_1_2_metal) { state_changed = true; }
        if (prevProps.ring_1_2_fineness != nowProps.ring_1_2_fineness) { state_changed = true; }
        if (prevProps.ring_1_3_surface != nowProps.ring_1_3_surface) { state_changed = true; }
        if (prevProps.ring_1_3_metal != nowProps.ring_1_3_metal) { state_changed = true; }
        if (prevProps.ring_1_3_fineness != nowProps.ring_1_3_fineness) { state_changed = true; }
        if (prevProps.ring_2_2_surface != nowProps.ring_2_2_surface) { state_changed = true; }
        if (prevProps.ring_2_2_metal != nowProps.ring_2_2_metal) { state_changed = true; }
        if (prevProps.ring_2_2_fineness != nowProps.ring_2_2_fineness) { state_changed = true; }
        if (prevProps.ring_2_3_surface != nowProps.ring_2_3_surface) { state_changed = true; }
        if (prevProps.ring_2_3_metal != nowProps.ring_2_3_metal) { state_changed = true; }
        if (prevProps.ring_2_3_fineness != nowProps.ring_2_3_fineness) { state_changed = true; }
        if (prevProps.ring_1_wave_height != nowProps.ring_1_wave_height) { state_changed = true; }
        if (prevProps.ring_1_number_of_waves != nowProps.ring_1_number_of_waves) { state_changed = true; }
        if (prevProps.ring_2_wave_height != nowProps.ring_2_wave_height) { state_changed = true; }
        if (prevProps.ring_2_number_of_waves != nowProps.ring_2_number_of_waves) { state_changed = true; }

        return state_changed;
    }

    handleRingChange = (event) => {
        if (event.target.id.includes('ring_1')) { this.props.setRing1Disabled(!event.target.checked); } else { this.props.setRing2Disabled(!event.target.checked); }
    }

    handleShow = () => { this.setState({ show: true }); }
    handleHide = () => { this.setState({ show: false }) };

    render() {
        const { show } = this.state;
        const { data } = this.props;
        const _widths = Array.from(Array(17)).map((e, i) => (i / 2 + 2).toFixed(2) + ' mm');
        const _heights = Array.from(Array(16)).map((e, i) => (i / 10 + 1.1).toFixed(2) + 'mm');
        const _sizes = Array.from(Array(59)).map((e, i) => (i / 2 + 45).toFixed(1) + " (Ø " + ((i / 2 + 45) / (Math.PI)).toFixed(2) + "mm)");
        const diamond_settings = ['None', 'Rubbed', 'Section', 'Channel', 'Cross channel', 'Free', 'Rubbed on the side', 'Rubbed on the side', 'Section on the side', 'Section on the side', 'Tensionring', 'Zarge'];
        const diamond_cuts = ['Brilliant', 'Princess', 'Baguette'];
        const diamond_qualities = ['G/SI', 'G/VSI', 'G/IF', 'G/VVSI', 'G/SI'];
        const diamond_positions = ['Left', 'Middle', 'Right', 'Free'];
        const engraving_fonts = ['Shelly Allegro', 'Bernhard Modern', 'Palette', 'Gando', 'Fine Hand', 'Handwriting', 'Typed Letters', 'Italics'];

        const ring_1_price = data.ring_1_disabled ? 0 : parseInt(data.ring_1_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const ring_2_price = data.ring_2_disabled ? 0 : parseInt(data.ring_2_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const ring_pair_price = (parseInt(ring_1_price) + parseInt(ring_2_price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return (
            <>
                {/* summary desktop */}
                <div className="summary-content" style={{ display: this.state.page === 'order' ? 'block' : undefined }}>
                    <div className="container-fluid-without-background">
                        <div className="row">
                            <div className={`${this.state.page === 'home' ? 'col-7 col-lg-6 offset-1' : 'col-12 col-sm-10 offset-sm-1'}`}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="row-title-without-border">
                                                <label className="checkbox" style={{ visibility: 'hidden' }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span>Ring 1</span>
                                                </label>
                                            </td>
                                            <td>
                                                <label className="checkbox">
                                                    <input id="ring_1_disabled" className={`${data.ring_1_disabled && 'ring-disabled'}`} type="checkbox" defaultChecked onChange={this.handleRingChange} />
                                                    <span className={`${data.ring_1_disabled && 'ring-disabled'}`}>Ring 1</span>
                                                </label>
                                            </td>
                                            <td>
                                                <label className="checkbox">
                                                    <input id="ring_2_disabled" className={`${data.ring_2_disabled && 'ring-disabled'}`} type="checkbox" defaultChecked onChange={this.handleRingChange} />
                                                    <span className={`${data.ring_2_disabled && 'ring-disabled'}`}>Ring 2</span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Profiles</span></td>
                                            <td>{data.ring_1_profiles}</td>
                                            <td>{data.ring_2_profiles}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Ring size</span></td>
                                            <td>{_sizes[parseInt(data.ring_1_size)]}</td>
                                            <td>{_sizes[parseInt(data.ring_2_size)]}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Ring type</span></td>
                                            <td>{data.ring_1_material.includes('one') ? 'Single Color' : data.ring_1_material.includes('two') ? 'Two Colors' : 'Three Colors'}</td>
                                            <td>{data.ring_2_material.includes('one') ? 'Single Color' : data.ring_2_material.includes('two') ? 'Two Colors' : 'Three Colors'}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Colour</span></td>
                                            <td>
                                                {data.ring_1_material.includes('one') ? surfaces[data.ring_1_surface].color + " / " + data.ring_1_fineness + "/-" : data.ring_1_material.includes('two') ? surfaces[data.ring_1_surface].color + " / " + data.ring_1_fineness + "/-, " + surfaces[data.ring_1_2_surface].color + " / " + data.ring_1_2_fineness + "/-" : surfaces[data.ring_1_surface].color + " / " + data.ring_1_fineness + "/-, " + surfaces[data.ring_1_2_surface].color + " / " + data.ring_1_2_fineness + "/-, " + surfaces[data.ring_1_3_surface].color + " / " + data.ring_1_3_fineness + "/-"}
                                            </td>
                                            <td>
                                                {data.ring_2_material.includes('one') ? surfaces[data.ring_2_surface].color + " / " + data.ring_2_fineness + "/-" : data.ring_2_material.includes('two') ? surfaces[data.ring_2_surface].color + " / " + data.ring_2_fineness + "/-, " + surfaces[data.ring_2_2_surface].color + " / " + data.ring_2_2_fineness + "/-" : surfaces[data.ring_2_surface].color + " / " + data.ring_2_fineness + "/-, " + surfaces[data.ring_2_2_surface].color + " / " + data.ring_2_2_fineness + "/-, " + surfaces[data.ring_2_3_surface].color + " / " + data.ring_2_3_fineness + "/-"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Ring width</span></td>
                                            <td>{_widths[data.ring_1_width]}</td>
                                            <td>{_widths[data.ring_2_width]}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Ring height</span></td>
                                            <td>{_heights[data.ring_1_height]}</td>
                                            <td>{_heights[data.ring_2_height]}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Division</span></td>
                                            <td>None</td>
                                            <td>None</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Surface</span></td>
                                            <td>{data.ring_1_material.includes('one') ? metals[data.ring_1_metal].material : data.ring_1_material.includes('two') ? metals[data.ring_1_metal].material + " , " + metals[data.ring_1_2_metal].material : metals[data.ring_1_metal].material + " , " + metals[data.ring_1_2_metal].material + " , " + metals[data.ring_1_3_metal].material}</td>
                                            <td>{data.ring_2_material.includes('one') ? metals[data.ring_2_metal].material : data.ring_2_material.includes('two') ? metals[data.ring_2_metal].material + " , " + metals[data.ring_2_2_metal].material : metals[data.ring_2_metal].material + " , " + metals[data.ring_2_2_metal].material + " , " + metals[data.ring_2_3_metal].material}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Setting</span></td>
                                            <td>{diamond_settings[data.ring_1_diamond_setting]}</td>
                                            <td>{diamond_settings[data.ring_2_diamond_setting]}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Number of stones</span></td>
                                            <td>{data.ring_1_diamond_setting != 0 ? diamond_cuts[data.ring_1_diamond_cut] : '-'}</td>
                                            <td>{data.ring_2_diamond_setting != 0 ? diamond_cuts[data.ring_2_diamond_cut] : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Diamond size / Quality</span></td>
                                            <td>
                                                {data.ring_1_diamond_setting != 0 ? ((data.ring_1_diamond_cut == 0 ? brilliant_diamond_sizes[data.ring_1_diamond_size].label : data.ring_1_diamond_cut == 1 ? princess_diamond_sizes[data.ring_1_diamond_size].label : baguette_diamond_sizes[data.ring_1_diamond_size].label) + ' ct. / ' + (data.ring_1_diamond_setting != 0 && diamond_qualities[data.ring_1_diamond_quality])) : '-'}
                                            </td>
                                            <td>
                                                {data.ring_2_diamond_setting != 0 ? ((data.ring_2_diamond_cut == 0 ? brilliant_diamond_sizes[data.ring_2_diamond_size].label : data.ring_2_diamond_cut == 1 ? princess_diamond_sizes[data.ring_2_diamond_size].label : baguette_diamond_sizes[data.ring_2_diamond_size].label) + ' ct. / ' + (data.ring_2_diamond_setting != 0 && diamond_qualities[data.ring_2_diamond_quality])) : '-'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Cut</span></td>
                                            <td>{data.ring_1_diamond_setting != 0 ? diamond_cuts[data.ring_1_diamond_cut] : '-'}</td>
                                            <td>{data.ring_2_diamond_setting != 0 ? diamond_cuts[data.ring_2_diamond_cut] : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Stone allocation</span></td>
                                            <td>{data.ring_1_diamond_setting != 0 ? data.ring_1_rows + 1 : '-'}</td>
                                            <td>{data.ring_2_diamond_setting != 0 ? data.ring_2_rows + 1 : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Stone positioning</span></td>
                                            <td>{data.ring_1_diamond_setting != 0 ? diamond_positions[data.ring_1_position] : '-'}</td>
                                            <td>{data.ring_2_diamond_setting != 0 ? diamond_positions[data.ring_2_position] : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Type of engraving</span></td>
                                            <td>{data.ring_1_engraving_font < 5 ? 'Laser engraving' : 'Diamond engraving'}</td>
                                            <td>{data.ring_2_engraving_font < 5 ? 'Laser engraving' : 'Diamond engraving'}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Engraving font</span></td>
                                            <td>{engraving_fonts[data.ring_1_engraving_font]}</td>
                                            <td>{engraving_fonts[data.ring_2_engraving_font]}</td>
                                        </tr>
                                        <tr>
                                            <td className="row-title"><span>Engraving text</span></td>
                                            <td>{data.ring_1_engraving_text}</td>
                                            <td>{data.ring_2_engraving_text}</td>
                                        </tr>
                                        <tr className="tr-price">
                                            <td className="row-title"><span>price</span></td>
                                            <td>{ring_1_price},- €</td>
                                            <td>{ring_2_price},- €</td>
                                        </tr>
                                        <tr className="tr-pair-price">
                                            <td className="row-title-without-border "><span>Pair price</span></td>
                                            <td>{ring_pair_price},- €</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {this.state.page === 'home' &&
                                <div className="col-3 col-lg-4">
                                    <Link to="/configurator">
                                        <button className="btn local-finder" type="button" tabIndex="0">
                                            <i icon="maps" className="svg-icon svg-icon-maps">
                                                <svg id="maps" viewBox="0 0 18 18" width="18" height="18">
                                                    <path d="M 7 6.7872 C 7 5.7297 7.8954 4.8723 9 4.8723 C 10.1046 4.8723 11 5.7297 11 6.7872 C 11 7.8448 10.1046 8.7021 9 8.7021 C 7.8954 8.7021 7 7.8448 7 6.7872 ZM 4 6.7872 C 4 9.4312 9 14 9 14 C 9 14 14 9.4312 14 6.7872 C 14 4.1433 11.7615 2 9 2 C 6.2385 2 4 4.1433 4 6.7872 Z"></path>
                                                    <path d="M 5 16 C 5 16.5523 6.7908 17 9 17 C 11.2092 17 13 16.5523 13 16 C 13 15.4477 11.2092 15 9 15 C 6.7908 15 5 15.4477 5 16 Z"></path>
                                                </svg>
                                            </i>
                                            <span>Find your local jeweller</span>
                                        </button>
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {/* summary mobile */}
                <div className="summary-content-mobile">
                    <a className="button-review" onClick={this.handleShow}>
                        <i icon="details" className="svg-icon svg-icon-details">
                            <svg id="details" viewBox="0 0 26 26" width="26" height="26">
                                <path d="M 5.5161 4.9846 L 2.3138 4.9846 L 2.3138 4.5528 C 2.3138 3.7756 3.0528 3.1711 3.8739 3.1711 C 4.6129 3.1711 5.3519 3.5166 5.5161 4.6392 L 5.5161 4.9846 ZM 21 23 L 11 23 C 11.4106 22.1364 12.4135 20.4647 11.0997 18.9966 L 20.6745 18.9966 C 22.522 18.9966 22.7683 20.5013 22.7683 20.9331 C 22.7683 21.8896 22.0674 22.7409 21 23 ZM 10.6891 20.9331 C 10.6891 21.5376 9.9853 23 9 23 C 7.9326 23 7.2463 22.4681 7 21 L 6.912 4.9846 C 6.8299 4.3801 6.8125 3.875 6 3 L 18.375 3 C 19.0552 3 20 3.7221 20 4.4375 L 20 18 L 9 18 C 8.7537 18 8.6364 18.256 8.6364 18.4287 C 8.6364 19.0332 9.2111 19.1196 9.7038 19.2923 C 10.1144 19.465 10.6891 20.4149 10.6891 20.9331 ZM 21 24 C 22.6422 24 24 22.6236 24 20.8467 C 24 19.465 23.217 18 21 18 L 21 4.5 C 21 3.0692 19.6127 1.9621 18.2522 1.9621 L 3.2991 1.9621 C 1.6158 1.9621 1 4.0347 1 4.9846 L 1 6 L 6 6 L 6 21 C 6 23.3814 8.1789 24.0864 9 24 L 21 24 ZM 18 7 L 18 6 L 9 6 L 9 7 L 18 7 ZM 18 11 L 18 10 L 9 10 L 9 11 L 18 11 ZM 18 15 L 18 14 L 9 14 L 9 15 L 18 15 Z" fill="white"></path>
                            </svg>
                        </i>
                        <span className="nav-mobile-label">Details of your configuration</span>
                    </a>

                    <a className="button-inquiry" routerlink="/jeweler-finder" href="/konfischerator/jeweler-finder">
                        <i className="icon-left svg-icon svg-icon-location" icon="location">
                            <svg id="location" viewBox="0 0 26 26" width="26" height="26">
                                <title>location</title>
                                <path d="M13.5,1A8.51,8.51,0,0,0,5,9.5C5,14.19,13.5,23,13.5,23S22,14.19,22,9.5A8.51,8.51,0,0,0,13.5,1Zm0,11.5a4,4,0,1,1,4-4A4,4,0,0,1,13.5,12.5Z" fill="currentColor"></path>
                            </svg>
                        </i>
                        <span className="nav-mobile-label">Find your local jeweller</span>
                    </a>

                    <a className="button-price">
                        <span className="nav-mobile-label label-text">Pair price</span>
                        <span className="nav-mobile-label label-price">{ring_pair_price},- €</span>
                        <span className="nav-mobile-label label-taxinfo">incl. VAT</span>
                    </a>

                    <a className="button-order" href="/order">
                        <i className="icon-left svg-icon svg-icon-cart-2" icon="cart-2">
                            <svg id="cart-2" viewBox="0 0 30 30" width="30" height="30">
                                <path d="M 19 24.5 C 19 25.8807 20.1193 27 21.5 27 C 22.8807 27 24 25.8807 24 24.5 C 24 23.1193 22.8807 22 21.5 22 C 20.1193 22 19 23.1193 19 24.5 ZM 11 24.5 C 11 25.8807 12.1193 27 13.5 27 C 14.8807 27 16 25.8807 16 24.5 C 16 23.1193 14.8807 22 13.5 22 C 12.1193 22 11 23.1193 11 24.5 ZM 20.6047 11.3636 L 18.0555 8.7727 L 19.0692 7.7424 L 20.598 9.2963 L 24.0119 5.8266 L 25.0322 6.8636 L 20.6047 11.3636 ZM 16.1324 8.5227 C 16.1324 11.5729 18.5651 14.0455 21.5662 14.0455 C 24.5672 14.0455 27 11.5729 27 8.5227 C 27 5.4726 24.5672 3 21.5662 3 C 18.5651 3 16.1324 5.4726 16.1324 8.5227 ZM 6 7 L 2 7 L 2 8 L 5.375 8 L 11 21 L 24 21 L 24 20 L 11.8837 19.9545 L 6 7 ZM 15.1827 11.5856 L 9.5529 11.5856 C 9.5529 11.5856 12.5072 17.5134 13.0334 19.1176 L 24.1272 19.1176 L 25.5242 14.8636 C 25.5242 14.8636 23.9141 16.0348 21.5754 16.0348 C 17.8318 16.0348 16.235 13.7246 15.1827 11.5856 Z" fill="white"></path>
                            </svg>
                        </i>
                        <span className="nav-mobile-label">Order</span>
                    </a>
                </div>

                {/* summary modal in mobile */}
                <Modal className="summary-content-modal" size="lg" show={show} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Summary of your configuration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="row-title-without-border">
                                        <label className="checkbox" style={{ visibility: 'hidden' }}>
                                            <input type="checkbox" defaultChecked />
                                            <span>Ring 1</span>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="checkbox">
                                            <input className={`${data.ring_1_disabled && 'ring-disabled'}`} id="ring_1_disabled" type="checkbox" defaultChecked onChange={this.handleRingChange} />
                                            <span className={`${data.ring_1_disabled && 'ring-disabled'}`}>Ring 1</span>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="checkbox">
                                            <input className={`${data.ring_2_disabled && 'ring-disabled'}`} id="ring_2_disabled" type="checkbox" defaultChecked onChange={this.handleRingChange} />
                                            <span className={`${data.ring_2_disabled && 'ring-disabled'}`}>Ring 2</span>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Profiles</span></td>
                                    <td>{data.ring_1_profiles}</td>
                                    <td>{data.ring_2_profiles}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Ring size</span></td>
                                    <td>{_sizes[parseInt(data.ring_1_size)]}</td>
                                    <td>{_sizes[parseInt(data.ring_2_size)]}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Ring type</span></td>
                                    <td>{data.ring_1_material.includes('one') ? 'Single Color' : data.ring_1_material.includes('two') ? 'Two Colors' : 'Three Colors'}</td>
                                    <td>{data.ring_2_material.includes('one') ? 'Single Color' : data.ring_2_material.includes('two') ? 'Two Colors' : 'Three Colors'}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Colour</span></td>
                                    <td>
                                        {data.ring_1_material.includes('one') ? surfaces[data.ring_1_surface].color + " / " + data.ring_1_fineness + "/-" : data.ring_1_material.includes('two') ? surfaces[data.ring_1_surface].color + " / " + data.ring_1_fineness + "/-, " + surfaces[data.ring_1_2_surface].color + " / " + data.ring_1_2_fineness + "/-" : surfaces[data.ring_1_surface].color + " / " + data.ring_1_fineness + "/-, " + surfaces[data.ring_1_2_surface].color + " / " + data.ring_1_2_fineness + "/-, " + surfaces[data.ring_1_3_surface].color + " / " + data.ring_1_3_fineness + "/-"}
                                    </td>
                                    <td>
                                        {data.ring_2_material.includes('one') ? surfaces[data.ring_2_surface].color + " / " + data.ring_2_fineness + "/-" : data.ring_2_material.includes('two') ? surfaces[data.ring_2_surface].color + " / " + data.ring_2_fineness + "/-, " + surfaces[data.ring_2_2_surface].color + " / " + data.ring_2_2_fineness + "/-" : surfaces[data.ring_2_surface].color + " / " + data.ring_2_fineness + "/-, " + surfaces[data.ring_2_2_surface].color + " / " + data.ring_2_2_fineness + "/-, " + surfaces[data.ring_2_3_surface].color + " / " + data.ring_2_3_fineness + "/-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Ring width</span></td>
                                    <td>{_widths[data.ring_1_width]}</td>
                                    <td>{_widths[data.ring_2_width]}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Ring height</span></td>
                                    <td>{_heights[data.ring_1_height]}</td>
                                    <td>{_heights[data.ring_2_height]}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Division</span></td>
                                    <td>None</td>
                                    <td>None</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Surface</span></td>
                                    <td>{data.ring_1_material.includes('one') ? metals[data.ring_1_metal].material : data.ring_1_material.includes('two') ? metals[data.ring_1_metal].material + " , " + metals[data.ring_1_2_metal].material : metals[data.ring_1_metal].material + " , " + metals[data.ring_1_2_metal].material + " , " + metals[data.ring_1_3_metal].material}</td>
                                    <td>{data.ring_2_material.includes('one') ? metals[data.ring_2_metal].material : data.ring_2_material.includes('two') ? metals[data.ring_2_metal].material + " , " + metals[data.ring_2_2_metal].material : metals[data.ring_2_metal].material + " , " + metals[data.ring_2_2_metal].material + " , " + metals[data.ring_2_3_metal].material}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Setting</span></td>
                                    <td>{diamond_settings[data.ring_1_diamond_setting]}</td>
                                    <td>{diamond_settings[data.ring_2_diamond_setting]}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Number of stones</span></td>
                                    <td>{data.ring_1_diamond_setting != 0 ? diamond_cuts[data.ring_1_diamond_cut] : '-'}</td>
                                    <td>{data.ring_2_diamond_setting != 0 ? diamond_cuts[data.ring_2_diamond_cut] : '-'}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Diamond size / Quality</span></td>
                                    <td>
                                        {data.ring_1_diamond_setting != 0 ? ((data.ring_1_diamond_cut == 0 ? brilliant_diamond_sizes[data.ring_1_diamond_size].label : data.ring_1_diamond_cut == 1 ? princess_diamond_sizes[data.ring_1_diamond_size].label : baguette_diamond_sizes[data.ring_1_diamond_size].label) + ' ct. / ' + (data.ring_1_diamond_setting != 0 && diamond_qualities[data.ring_1_diamond_quality])) : '-'}
                                    </td>
                                    <td>
                                        {data.ring_2_diamond_setting != 0 ? ((data.ring_2_diamond_cut == 0 ? brilliant_diamond_sizes[data.ring_2_diamond_size].label : data.ring_2_diamond_cut == 1 ? princess_diamond_sizes[data.ring_2_diamond_size].label : baguette_diamond_sizes[data.ring_2_diamond_size].label) + ' ct. / ' + (data.ring_2_diamond_setting != 0 && diamond_qualities[data.ring_2_diamond_quality])) : '-'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Cut</span></td>
                                    <td>{data.ring_1_diamond_setting != 0 ? diamond_cuts[data.ring_1_diamond_cut] : '-'}</td>
                                    <td>{data.ring_2_diamond_setting != 0 ? diamond_cuts[data.ring_2_diamond_cut] : '-'}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Stone allocation</span></td>
                                    <td>{data.ring_1_diamond_setting != 0 ? data.ring_1_rows + 1 : '-'}</td>
                                    <td>{data.ring_2_diamond_setting != 0 ? data.ring_2_rows + 1 : '-'}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Stone positioning</span></td>
                                    <td>{data.ring_1_diamond_setting != 0 ? diamond_positions[data.ring_1_position] : '-'}</td>
                                    <td>{data.ring_2_diamond_setting != 0 ? diamond_positions[data.ring_2_position] : '-'}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Type of engraving</span></td>
                                    <td>{data.ring_1_engraving_font < 5 ? 'Laser engraving' : 'Diamond engraving'}</td>
                                    <td>{data.ring_2_engraving_font < 5 ? 'Laser engraving' : 'Diamond engraving'}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Engraving font</span></td>
                                    <td>{engraving_fonts[data.ring_1_engraving_font]}</td>
                                    <td>{engraving_fonts[data.ring_2_engraving_font]}</td>
                                </tr>
                                <tr>
                                    <td className="row-title"><span>Engraving text</span></td>
                                    <td>{data.ring_1_engraving_text}</td>
                                    <td>{data.ring_2_engraving_text}</td>
                                </tr>
                                <tr className="tr-price">
                                    <td className="row-title"><span>price</span></td>
                                    <td>{ring_1_price},- €</td>
                                    <td>{ring_2_price},- €</td>
                                </tr>
                                <tr className="tr-pair-price">
                                    <td className="row-title-without-border "><span>Pair price</span></td>
                                    <td>{ring_pair_price},- €</td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => ({ data: state.data });
const mapActionsToProps = { setRing1Disabled, setRing2Disabled, setRingPairPrice, setRing1Price, setRing2Price };

export default connect(mapStateToProps, mapActionsToProps)(SummaryContent);
