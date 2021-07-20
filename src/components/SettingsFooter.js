import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { wizards } from '../assets/variables';

// redux
import { connect } from 'react-redux';
import { setWizard, setDeleteDesign, setUndo } from '../redux/actions';

class SettingsFooter extends Component {
    constructor() {
        super();
        this.wizards = wizards;
        this.past = [];
    }

    checkIfReduxDataStateChanged(prevProps, nowProps) {
        if (prevProps.ring_1_2_metal !== nowProps.ring_1_2_metal) { return true; }
        else if (prevProps.ring_1_2_surface !== nowProps.ring_1_2_surface) { return true; }
        else if (prevProps.ring_1_3_metal !== nowProps.ring_1_3_metal) { return true; }
        else if (prevProps.ring_1_3_surface !== nowProps.ring_1_3_surface) { return true; }
        else if (prevProps.ring_1_design_grooves_alignments !== nowProps.ring_1_design_grooves_alignments) { return true; }
        else if (prevProps.ring_1_design_grooves_positions !== nowProps.ring_1_design_grooves_positions) { return true; }
        else if (prevProps.ring_1_design_grooves_surfaces !== nowProps.ring_1_design_grooves_surfaces) { return true; }
        else if (prevProps.ring_1_design_grooves_types !== nowProps.ring_1_design_grooves_types) { return true; }
        else if (prevProps.ring_1_design_grooves_widths !== nowProps.ring_1_design_grooves_widths) { return true; }
        else if (prevProps.ring_1_diamond_cut !== nowProps.ring_1_diamond_cut) { return true; }
        else if (prevProps.ring_1_diamond_quality !== nowProps.ring_1_diamond_quality) { return true; }
        else if (prevProps.ring_1_diamond_setting !== nowProps.ring_1_diamond_setting) { return true; }
        else if (prevProps.ring_1_diamond_size !== nowProps.ring_1_diamond_size) { return true; }
        else if (prevProps.ring_1_disabled !== nowProps.ring_1_disabled) { return true; }
        else if (prevProps.ring_1_engraving_font !== nowProps.ring_1_engraving_font) { return true; }
        else if (prevProps.ring_1_engraving_text !== nowProps.ring_1_engraving_text) { return true; }
        else if (prevProps.ring_1_groove !== nowProps.ring_1_groove) { return true; }
        else if (prevProps.ring_1_groove_surface !== nowProps.ring_1_groove_surface) { return true; }
        else if (prevProps.ring_1_groove_width !== nowProps.ring_1_groove_width) { return true; }
        else if (prevProps.ring_1_height !== nowProps.ring_1_height) { return true; }
        else if (prevProps.ring_1_left_edge !== nowProps.ring_1_left_edge) { return true; }
        else if (prevProps.ring_1_left_surface !== nowProps.ring_1_left_surface) { return true; }
        else if (prevProps.ring_1_left_width !== nowProps.ring_1_left_width) { return true; }
        else if (prevProps.ring_1_material !== nowProps.ring_1_material) { return true; }
        else if (prevProps.ring_1_metal !== nowProps.ring_1_metal) { return true; }
        else if (prevProps.ring_1_number_of_stones !== nowProps.ring_1_number_of_stones) { return true; }
        else if (prevProps.ring_1_number_of_waves !== nowProps.ring_1_number_of_waves) { return true; }
        else if (prevProps.ring_1_position !== nowProps.ring_1_position) { return true; }
        else if (prevProps.ring_1_price !== nowProps.ring_1_price) { return true; }
        else if (prevProps.ring_1_profiles !== nowProps.ring_1_profiles) { return true; }
        else if (prevProps.ring_1_right_edge !== nowProps.ring_1_right_edge) { return true; }
        else if (prevProps.ring_1_right_surface !== nowProps.ring_1_right_surface) { return true; }
        else if (prevProps.ring_1_right_width !== nowProps.ring_1_right_width) { return true; }
        else if (prevProps.ring_1_rows !== nowProps.ring_1_rows) { return true; }
        else if (prevProps.ring_1_size !== nowProps.ring_1_size) { return true; }
        else if (prevProps.ring_1_surface !== nowProps.ring_1_surface) { return true; }
        else if (prevProps.ring_1_type !== nowProps.ring_1_type) { return true; }
        else if (prevProps.ring_1_wave_height !== nowProps.ring_1_wave_height) { return true; }
        else if (prevProps.ring_1_width !== nowProps.ring_1_width) { return true; }
        else if (prevProps.ring_2_2_fineness !== nowProps.ring_2_2_fineness) { return true; }
        else if (prevProps.ring_2_2_metal !== nowProps.ring_2_2_metal) { return true; }
        else if (prevProps.ring_2_2_surface !== nowProps.ring_2_2_surface) { return true; }
        else if (prevProps.ring_2_3_fineness !== nowProps.ring_2_3_fineness) { return true; }
        else if (prevProps.ring_2_3_metal !== nowProps.ring_2_3_metal) { return true; }
        else if (prevProps.ring_2_3_surface !== nowProps.ring_2_3_surface) { return true; }
        else if (prevProps.ring_2_design_grooves_alignments !== nowProps.ring_2_design_grooves_alignments) { return true; }
        else if (prevProps.ring_2_design_grooves_positions !== nowProps.ring_2_design_grooves_positions) { return true; }
        else if (prevProps.ring_2_design_grooves_surfaces !== nowProps.ring_2_design_grooves_surfaces) { return true; }
        else if (prevProps.ring_2_design_grooves_types !== nowProps.ring_2_design_grooves_types) { return true; }
        else if (prevProps.ring_2_design_grooves_widths !== nowProps.ring_2_design_grooves_widths) { return true; }
        else if (prevProps.ring_2_diamond_cut !== nowProps.ring_2_diamond_cut) { return true; }
        else if (prevProps.ring_2_diamond_quality !== nowProps.ring_2_diamond_quality) { return true; }
        else if (prevProps.ring_2_diamond_setting !== nowProps.ring_2_diamond_setting) { return true; }
        else if (prevProps.ring_2_diamond_size !== nowProps.ring_2_diamond_size) { return true; }
        else if (prevProps.ring_2_disabled !== nowProps.ring_2_disabled) { return true; }
        else if (prevProps.ring_2_engraving_font !== nowProps.ring_2_engraving_font) { return true; }
        else if (prevProps.ring_2_engraving_text !== nowProps.ring_2_engraving_text) { return true; }
        else if (prevProps.ring_2_fineness !== nowProps.ring_2_fineness) { return true; }
        else if (prevProps.ring_2_groove !== nowProps.ring_2_groove) { return true; }
        else if (prevProps.ring_2_groove_surface !== nowProps.ring_2_groove_surface) { return true; }
        else if (prevProps.ring_2_groove_width !== nowProps.ring_2_groove_width) { return true; }
        else if (prevProps.ring_2_height !== nowProps.ring_2_height) { return true; }
        else if (prevProps.ring_2_left_edge !== nowProps.ring_2_left_edge) { return true; }
        else if (prevProps.ring_2_left_surface !== nowProps.ring_2_left_surface) { return true; }
        else if (prevProps.ring_2_left_width !== nowProps.ring_2_left_width) { return true; }
        else if (prevProps.ring_2_material !== nowProps.ring_2_material) { return true; }
        else if (prevProps.ring_2_metal !== nowProps.ring_2_metal) { return true; }
        else if (prevProps.ring_2_number_of_stones !== nowProps.ring_2_number_of_stones) { return true; }
        else if (prevProps.ring_2_number_of_waves !== nowProps.ring_2_number_of_waves) { return true; }
        else if (prevProps.ring_2_position !== nowProps.ring_2_position) { return true; }
        else if (prevProps.ring_2_price !== nowProps.ring_2_price) { return true; }
        else if (prevProps.ring_2_profiles !== nowProps.ring_2_profiles) { return true; }
        else if (prevProps.ring_2_right_edge !== nowProps.ring_2_right_edge) { return true; }
        else if (prevProps.ring_2_right_surface !== nowProps.ring_2_right_surface) { return true; }
        else if (prevProps.ring_2_right_width !== nowProps.ring_2_right_width) { return true; }
        else if (prevProps.ring_2_rows !== nowProps.ring_2_rows) { return true; }
        else if (prevProps.ring_2_size !== nowProps.ring_2_size) { return true; }
        else if (prevProps.ring_2_surface !== nowProps.ring_2_surface) { return true; }
        else if (prevProps.ring_2_type !== nowProps.ring_2_type) { return true; }
        else if (prevProps.ring_2_wave_height !== nowProps.ring_2_wave_height) { return true; }
        else if (prevProps.ring_2_width !== nowProps.ring_2_width) { return true; }
        else if (prevProps.wizard !== nowProps.wizard) { return true; }
        else { return false; }
    }

    handleClick = event => {
        const { wizard } = this.props.data;

        switch (event.target.id) {
            case 'back':
                for (let i = 0; i < this.wizards.length; i++) {
                    if (wizard === this.wizards[i]) {
                        if (i === 0) {
                            this.props.setWizard('profiles');
                        } else {
                            this.props.setWizard(this.wizards[i - 1]);
                        }
                    }
                }
                break;
            case 'continue':
                for (let i = 0; i < this.wizards.length; i++) {
                    if (wizard === this.wizards[i]) {
                        if (i === this.wizards.length - 1) {
                            this.props.setWizard('engraving');
                        } else {
                            this.props.setWizard(this.wizards[i + 1]);
                        }
                    }
                }
                break;
            case 'delete_design':
                this.props.setDeleteDesign();
                break;
            case 'undo':
                if (this.past.length > 0) {
                    this.props.setUndo(this.past[this.past.length - 1]);
                    this.past = this.past.slice(0, this.past.length - 2);
                }
                break;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.checkIfReduxDataStateChanged(prevProps.data, this.props.data)) {
            if (this.past.length >= 10) {
                this.past = this.past.slice(0, 8);
                this.past.push(this.props.data);
            } else {
                this.past.push(this.props.data);
            }
        }
    }

    render() {
        const { wizard } = this.props.data;

        return (
            <div className="settings-footer">
                <button id="back" className="btn btn-iconed btn-step" type="button" style={{ visibility: wizard === 'profiles' ? 'hidden' : 'visible' }} onClick={this.handleClick}>
                    <i id="back" className="icon-left svg-icon svg-icon-prev" icon="prev">
                        <svg id="back" viewBox="0 0 18 18" width="18" height="18">
                            <path id="back" d="M 7.5991 3.5 L 2 9 L 7.569 14.5 L 9.2586 13 L 6 10 C 6 10 7.7931 10 16 10 L 16 8 L 6.0614 8 L 9.2586 5 L 7.5991 3.5 Z"></path>
                        </svg>
                    </i>
                    <span id="back">Go back</span>
                </button>
                <div>
                    <button id="delete_design" className="btn btn-sm btn-transparent" type="button" onClick={this.handleClick}>
                        <i id="delete_design" className="icon-left svg-icon svg-icon-refresh" icon="refresh">
                            <svg id="delete_design" viewBox="1478 388 16 16" width="16" height="16">
                                <path id="delete_design" d="M1493.7,397.7C1493.7,397.7,1493.7,397.7,1493.7,397.7c-0.5,1.9-1.4,3.4-2.8,4.6s-3.1,1.7-5,1.7c-1,0-2-0.2-2.9-0.6c-0.9-0.4-1.8-0.9-2.5-1.6l-1.3,1.3c-0.1,0.1-0.3,0.2-0.5,0.2s-0.3-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5V398c0-0.2,0.1-0.3,0.2-0.5s0.3-0.2,0.5-0.2h4.7c0.2,0,0.3,0.1,0.5,0.2s0.2,0.3,0.2,0.5s-0.1,0.3-0.2,0.5l-1.4,1.4c0.5,0.5,1.1,0.8,1.7,1.1s1.3,0.4,1.9,0.4c0.9,0,1.8-0.2,2.6-0.7s1.5-1.1,1.9-1.9c0.1-0.1,0.3-0.5,0.6-1.2c0.1-0.2,0.2-0.2,0.3-0.2h2c0.1,0,0.2,0,0.2,0.1C1493.7,397.5,1493.7,397.6,1493.7,397.7z M1494,389.3v4.7c0,0.2-0.1,0.3-0.2,0.5s-0.3,0.2-0.5,0.2h-4.7c-0.2,0-0.3-0.1-0.5-0.2s-0.2-0.3-0.2-0.5s0.1-0.3,0.2-0.5l1.4-1.4c-1-1-2.2-1.4-3.6-1.4c-0.9,0-1.8,0.2-2.6,0.7s-1.5,1.1-1.9,1.9c-0.1,0.1-0.3,0.5-0.6,1.2c-0.1,0.2-0.2,0.2-0.3,0.2h-2.1c-0.1,0-0.2,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2v-0.1c0.5-1.9,1.4-3.4,2.8-4.5s3.1-1.7,5-1.7c1,0,2,0.2,3,0.6c1,0.4,1.8,0.9,2.6,1.6l1.4-1.3c0.1-0.1,0.3-0.2,0.5-0.2s0.3,0.1,0.5,0.2C1493.9,389,1494,389.2,1494,389.3z"></path>
                            </svg>
                        </i>
                        <span id="delete_design">Delete design </span>
                    </button>
                    <button id="undo" className="btn btn-sm btn-transparent" type="button" onClick={this.handleClick}>
                        <i id="undo" className="icon-left svg-icon svg-icon-undo_sm" icon="undo_sm">
                            <svg id="undo" viewBox="1478 388 16 16" width="16" height="16">
                                <path d="M1494,396c0,1.1-0.2,2.1-0.6,3.1c-0.4,1-1,1.8-1.7,2.6s-1.6,1.3-2.6,1.7c-1,0.4-2,0.6-3.1,0.6c-1.2,0-2.3-0.3-3.4-0.8c-1.1-0.5-2-1.2-2.8-2.1c0-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.2,0.1-0.2l1.4-1.4c0.1-0.1,0.2-0.1,0.3-0.1c0.1,0,0.2,0.1,0.2,0.1c0.5,0.7,1.1,1.2,1.9,1.5s1.5,0.5,2.3,0.5c0.7,0,1.4-0.1,2.1-0.4s1.2-0.7,1.7-1.1c0.5-0.5,0.9-1,1.1-1.7s0.4-1.3,0.4-2.1s-0.1-1.4-0.4-2.1s-0.7-1.2-1.1-1.7c-0.5-0.5-1-0.9-1.7-1.1s-1.3-0.4-2.1-0.4c-0.7,0-1.3,0.1-2,0.4c-0.6,0.2-1.2,0.6-1.7,1.1l1.4,1.4c0.2,0.2,0.3,0.4,0.1,0.7c-0.1,0.3-0.3,0.4-0.6,0.4h-4.7c-0.2,0-0.3-0.1-0.5-0.2s-0.2-0.3-0.2-0.5v-4.7c0-0.3,0.1-0.5,0.4-0.6c0.3-0.1,0.5-0.1,0.7,0.1l1.4,1.3c0.7-0.7,1.6-1.2,2.5-1.6c1-0.4,1.9-0.6,3-0.6c1.1,0,2.1,0.2,3.1,0.6c1,0.4,1.8,1,2.6,1.7s1.3,1.6,1.7,2.6C1493.8,393.9,1494,394.9,1494,396z"></path>
                            </svg>
                        </i>
                        <span id="undo">Undo last action</span>
                    </button>
                </div>
                <button id="continue" className="btn btn-iconed btn-step" type="button" style={{ visibility: wizard === 'engraving' ? 'hidden' : 'visible' }} onClick={this.handleClick}>
                    <span id="continue">Continue</span>
                    <i id="continue" className="icon-right svg-icon svg-icon-next" icon="next">
                        <svg id="continue" viewBox="0 0 18 18" width="18" height="18">
                            <path id="continue" d="M 10.4009 3.5 L 16 9 L 10.431 14.5 L 8.7414 13 L 12 10 C 12 10 10.2069 10 2 10 L 2 8 L 11.9386 8 L 8.7414 5 L 10.4009 3.5 Z"></path>
                        </svg>
                    </i>
                </button>
            </div>
        );
    }
}

SettingsFooter.propTypes = {
    data: PropTypes.object.isRequired,
    setWizard: PropTypes.func.isRequired,
    setDeleteDesign: PropTypes.func.isRequired,
    setUndo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ data: state.data });
const mapActionToProps = { setWizard, setDeleteDesign, setUndo };

export default connect(mapStateToProps, mapActionToProps)(SettingsFooter);