import React, { Component } from 'react';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setWizard } from '../redux/actions';

import { wizards } from '../assets/variables';

import { ReactComponent as SVGProfiles } from '../assets/svgicons/profiles.svg';
import { ReactComponent as SVGDimensions } from '../assets/svgicons/dimensions.svg';
import { ReactComponent as SVGMetal } from '../assets/svgicons/metal.svg';
import { ReactComponent as SVGGroovesEdges } from '../assets/svgicons/grooves_edges.svg';
import { ReactComponent as SVGDiamonds } from '../assets/svgicons/diamonds.svg';
import { ReactComponent as SVGEngraving } from '../assets/svgicons/engraving.svg';
import { ReactComponent as SVGPrev } from '../assets/svgicons/prev.svg';
import { ReactComponent as SVGNext } from '../assets/svgicons/next.svg';

const SVGIcon = ({_wizard, _class, icon}) => {
    return <>
        <i className={`svg-icon svg-icon-${_class}`}>{icon}</i>
        <span>{_wizard}</span>
    </>
}

class Wizard extends Component {
    constructor(props) {
        super();
        this.state = { wizard: props.data.wizard };
    }

    handleWizard = menu => {
        if (menu === 'prev') {
            wizards.forEach((item, index) => {
                if (item === this.state.wizard) {
                    if (index > 0) {
                        this.setState({ wizard: wizards[index - 1] });
                        this.props.setWizard(wizards[index - 1]);
                    }
                }
            });
        } else if (menu === 'next') {
            wizards.forEach((item, index) => {
                if (item === this.state.wizard) {
                    if (index < wizards.length - 1) {
                        this.setState({ wizard: wizards[index + 1] });
                        this.props.setWizard(wizards[index + 1]);
                    }
                }
            });
        } else {
            this.setState({ wizard: menu });
            this.props.setWizard(menu);
        }
    }

    render() {
        const { wizard } = this.props.data;

        return (
            <section className="wizard">
                <div className="wizard-badge"></div>
                <ul className="wizard-steps" role="menu">
                    <li role="menuitem" className={`profiles nav-tab ${wizard === "profiles" ? "active" : ""}`} onClick={() => this.handleWizard('profiles')}>
                        <a><SVGIcon _wizard="Profiles" _class="profiles" icon={<SVGProfiles />} /></a>
                    </li>
                    <li role="menuitem" className={`dimensions nav-tab ${wizard === "dimensions" ? "active" : ""}`} onClick={() => this.handleWizard('dimensions')}>
                        <a><SVGIcon _wizard="Dimensions" _class="dimensions" icon={<SVGDimensions />} /></a>
                    </li>
                    <li role="menuitem" className={`metals nav-tab ${wizard === "metal" ? "active" : ""}`} onClick={() => this.handleWizard('metal')}>
                        <a><SVGIcon _wizard="Precious metal" _class="metals" icon={<SVGMetal />} /></a>
                    </li>
                    <li role="menuitem" className={`grooves nav-tab ${wizard === "grooves" ? "active" : ""}`} onClick={() => this.handleWizard('grooves')}>
                        <a><SVGIcon _wizard="Grooves/edges" _class="grooves" icon={<SVGGroovesEdges />} /></a>
                    </li>
                    <li role="menuitem" className={`diamonds nav-tab ${wizard === "diamonds" ? "active" : ""}`} onClick={() => this.handleWizard('diamonds')}>
                        <a><SVGIcon _wizard="Diamonds" _class="diamonds" icon={<SVGDiamonds />} /></a>
                    </li>
                    <li role="menuitem" className={`engraving nav-tab ${wizard === "engraving" ? "active" : ""}`} onClick={() => this.handleWizard('engraving')}>
                        <a><SVGIcon _wizard="Engraving" _class="engraving" icon={<SVGEngraving />} /></a>
                    </li>
                </ul>
                <ul className="wizard-steps-mobile">
                    <a className="mobile-nav-btn" onClick={() => this.handleWizard('prev')}>
                        <SVGIcon _class="prev active" icon={<SVGPrev />} />
                    </a>
                    <a className="mobile-nav-btn mobile-nav-toggle" dropdowntoggle="">
                        <span>{wizard}</span>
                    </a>
                    <a className="mobile-nav-btn" onClick={() => this.handleWizard('next')}>
                        <SVGIcon _class="next" icon={<SVGNext />} />
                    </a>
                </ul>
            </section>
        );
    }
}

Wizard.propTypes = {
    data: PropTypes.object.isRequired,
    setWizard: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ data: state.data });
const mapActionsToProps = { setWizard };

export default connect(mapStateToProps, mapActionsToProps)(Wizard);