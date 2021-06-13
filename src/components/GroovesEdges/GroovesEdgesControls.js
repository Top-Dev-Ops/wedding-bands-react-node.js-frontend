import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';

import DesignGroovesControls from './DesignGroovesControls';
import SeparationGroovesControls from './SeparationGroovesControls';
import EdgesControls from './EdgesControls';

class GroovesEdgesControls extends Component {
    constructor(props) {
        super(props);
        if (props.data.ring === 'pair' || props.data.ring === 'ring_1') {
            this.state = {
                selected_tab: props.data.ring_1_material.includes('one') ? 'design_grooves' : 'separation_grooves'
            }
        } else {
            this.state = {
                selected_tab: props.data.ring_2_material.includes('one') ? 'design_grooves' : 'separation_grooves'
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data.ring != this.props.data.ring) {
            if (this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1') {
                this.setState({ selected_tab: this.props.data.ring_1_material.includes('one') ? 'design_grooves' : 'separation_grooves' });
            } else {
                this.setState({ selected_tab: this.props.data.ring_2_material.includes('one') ? 'design_grooves' : 'separation_grooves' });
            }
        }
    }

    handleTab = event => {
        this.setState({ selected_tab: event.target.id === 'design_grooves' ? 'design_grooves' : event.target.id === 'separation_grooves' ? 'separation_grooves' : 'edges' });
    }

    render() {
        const { selected_tab } = this.state;
        const { ring, ring_1_material, ring_2_material } = this.props.data;

        let tabs = null;
        if (ring === 'pair' || ring === 'ring_1') { tabs = ring_1_material.includes('one') ? 0 : 1; }
        else { tabs = ring_2_material.includes('one') ? 0 : 1; }

        return (
            <section className="grooves-edges-controls">
                <div className="nav-tabs">
                    <ul>
                        {tabs === 0 && <li id="design_grooves" className={selected_tab === 'design_grooves' ? 'active' : undefined} onClick={this.handleTab}>
                            <span id="design_grooves" className="li-img"></span>
                            <span id="design_grooves" className="li-span">Design grooves</span>
                        </li>}
                        {tabs === 1 && <li id="separation_grooves" className={selected_tab === 'separation_grooves' ? 'active' : undefined} onClick={this.handleTab}>
                            <span id="separation_grooves" className="li-img"></span>
                            <span id="separation_grooves" className="li-span">Separation grooves</span>
                        </li>}
                        <li id="tab_edges" className={selected_tab === 'edges' ? 'active' : undefined} onClick={this.handleTab}>
                            <span id="tab_edges" className="li-img"></span>
                            <span id="tab_edges" className="li-span">Edges</span>
                        </li>
                    </ul>
                </div>
                <div className="dimensions-controls">
                    {selected_tab === 'design_grooves' && <DesignGroovesControls />}
                    {selected_tab === 'separation_grooves' && <SeparationGroovesControls />}
                    {selected_tab === 'edges' && <EdgesControls />}
                </div>
            </section>
        );
    }
}

GroovesEdgesControls.propTypes = {
    ui: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ ui: state.ui, data: state.data });

export default connect(mapStateToProps)(GroovesEdgesControls);