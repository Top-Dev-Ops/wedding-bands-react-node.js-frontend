import React, { Component } from 'react';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setRingPairDiamondSetting, setRing1DiamondSetting, setRing2DiamondSetting } from '../../redux/actions';

import { diamonds } from '../../assets/variables';

import BezelControls from './BezelControls';
import ChannelControls from './ChannelControls';
import ClampingOpenControls from './ClampingOpenControls';
import CrossChannelControls from './CrossChannelControls';
import FreeControls from './FreeControls';
import SectionControls from './SectionControls';
import SideBezelLeftControls from './SideBezelLeftControls';
import SideBezelRightControls from './SideBezelRightControls';
import SideSectionLeftControls from './SideSectionLeftControls';
import SideSectionRightControls from './SideSectionRightControls';
import ZargeControls from './ZargeControls';

class DiamondsControls extends Component {

    constructor(props) {
        super(props);
        this.state = { show_diamonds: false }
    }

    handleModify = event => { this.setState({ show_diamonds: !this.state.show_diamonds }); }

    handleDiamondSetting = event => {
        const value = parseInt(event.target.id.replace('diamond_', ''));

        this.setState({ show_diamonds: false });

        if (this.props.data.ring === 'pair') { this.props.setRingPairDiamondSetting(value); }
        else if (this.props.data.ring === 'ring_1') { this.props.setRing1DiamondSetting(value); }
        else { this.props.setRing2DiamondSetting(value); }
    }

    render() {
        const { show_diamonds } = this.state;
        const diamond_type = this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1' ? this.props.data.ring_1_diamond_setting : this.props.data.ring_2_diamond_setting;

        let _diamonds = diamonds;
        _diamonds = _diamonds.map((item, index) => {
            return <li key={index} id={'diamond_' + index} className={index > 4 ? 'option disabled' : diamond_type == index ? 'option active' : 'option'} onClick={this.handleDiamondSetting}>
                <span id={'diamond_' + index} className="option-img" style={{ backgroundImage: `url(${item.image})` }}></span>
                <span id={'diamond_' + index} className="option-label">{item.name}</span>
            </li>
        });

        return (
            <section className="diamonds-card">
                <div className="metal-img-container" style={{ paddingTop: '0', paddingBottom: '0' }}>
                    <div className="diamonds-toggle">
                        {/* diamond type image */}
                        <div className="diamonds-toggle-img">
                            <div style={{ backgroundImage: `url(${diamonds[parseInt(diamond_type)].image})` }}></div>
                        </div>

                        {/* modify settings button */}
                        <button className="btn" type="button" onClick={this.handleModify}>
                            <span onClick={this.handleModify}>Modify setting</span>
                            <i icon="arrow-down" className="svg-icon svg-icon-arrow-down active">
                                <svg viewBox="0 0 18 18" width="18" height="18" onClick={this.handleModify}>
                                    <path d="M 3 7.3266 L 9 13 L 15 7.3507 L 13.7368 6 L 9 10.5773 L 4.2632 6 L 3 7.3266 Z"></path>
                                </svg>
                            </i>
                        </button>
                    </div>

                    {/* diamond types images */}
                    <div className="diamonds-list" style={{ display: `${show_diamonds ? 'block' : 'none'}` }}>
                        <ul> {_diamonds} </ul>
                    </div>
                </div>

                {/* diamond settings panel based on selected diamond type */}
                <div className="dimensions-controls">
                    {(diamond_type == 1) && <BezelControls />}
                    {diamond_type == 2 && <SectionControls />}
                    {diamond_type == 3 && <ChannelControls />}
                    {diamond_type == 4 && <CrossChannelControls />}
                    {diamond_type == 5 && <FreeControls />}
                    {diamond_type == 6 && <SideBezelLeftControls />}
                    {diamond_type == 7 && <SideBezelRightControls />}
                    {diamond_type == 8 && <SideSectionLeftControls />}
                    {diamond_type == 9 && <SideSectionRightControls />}
                    {diamond_type == 10 && <ClampingOpenControls />}
                    {diamond_type == 11 && <ZargeControls />}
                </div>
            </section>
        );
    }
}

DiamondsControls.propTypes = { data: PropTypes.object.isRequired };

const mapStateToProps = (state) => ({ data: state.data });
const mapActionsToProps = { setRingPairDiamondSetting, setRing1DiamondSetting, setRing2DiamondSetting };

export default connect(mapStateToProps, mapActionsToProps)(DiamondsControls);