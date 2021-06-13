import React, { Component } from 'react';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setWizard } from '../redux/actions';

import { wizards } from '../assets/variables';

class Wizard extends Component {
    constructor(props) {
        super();
        this.state = { wizard: props.data.wizard };
    }

    handleWizard = menu => {
        if (menu === 'prev') {
            wizards.forEach((item, index) => {
                if (item == this.state.wizard) {
                    if (index > 0) {
                        this.setState({ wizard: wizards[index - 1] });
                        this.props.setWizard(wizards[index - 1]);
                    }
                }
            });
        } else if (menu === 'next') {
            wizards.forEach((item, index) => {
                if (item == this.state.wizard) {
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
                        <a>
                            <i className="svg-icon svg-icon-profiles">
                                <svg id="profiles" viewBox="0 0 30 30" width="30" height="30">
                                    <g>
                                        <path d="M 26.0133 14.9375 L 26 22 L 4 22 L 4 15 C 4 15 5 10 15 10 C 25 10 26.0133 14.9375 26.0133 14.9375 ZM 29 14.9375 C 29 14.9375 27.0625 7 15 7 C 1.9375 7 1 15 1 15 L 1 25 L 29 25 L 29 14.9375 Z" className="shadow"></path>
                                        <path d="M 26.0133 13.9375 L 26 21 L 4 21 L 4 14 C 4 14 5 9 15 9 C 25 9 26.0133 13.9375 26.0133 13.9375 ZM 29 13.9375 C 29 13.9375 28.0625 6 15 6 C 1.9375 6 1 14 1 14 L 1 24 L 29 24 L 29 13.9375 Z" className="icon"></path>
                                        <path opacity="0.102" d="M 29 13.9375 C 29 13.9375 28.0625 6 15 6 C 1.9375 6 1 14 1 14 L 1 15 C 1 15 1.9375 7 15 7 C 28.0625 7 29 14.9375 29 14.9375 L 29 13.9375 ZM 26.0133 14.9375 L 26 21 L 4 21 L 4 22 L 26 22 L 26.0133 14.9375 Z" className="highlight"></path>
                                    </g>
                                </svg>
                            </i>
                            <span>Profiles</span>
                        </a>
                    </li>
                    <li role="menuitem" className={`dimensions nav-tab ${wizard === "dimensions" ? "active" : ""}`} onClick={() => this.handleWizard('dimensions')}>
                        <a>
                            <i className="svg-icon svg-icon-dimensions">
                                <svg id="dimensions" viewBox="0 0 30 30" width="30" height="30">
                                    <g>
                                        <path d="M 10.7273 10 L 12 11.3333 L 8.5 15 L 21.5 15 L 18 11.3333 L 19.2727 10 L 25 16 L 19.2727 22 L 18 20.6667 L 21.5 17 L 8.5 17 L 12 20.6667 L 10.7273 22 L 5 16 L 10.7273 10 ZM 1 16 C 1 21.5229 7.2679 26 15 26 C 22.7321 26 29 21.5229 29 16 C 29 10.4771 22.7321 6 15 6 C 7.2679 6 1 10.4771 1 16 Z" className="shadow"></path>
                                        <path d="M 10.7273 9 L 12 10.3333 L 8.5 14 L 21.5 14 L 18 10.3333 L 19.2727 9 L 25 15 L 19.2727 21 L 18 19.6667 L 21.5 16 L 8.5 16 L 12 19.6667 L 10.7273 21 L 5 15 L 10.7273 9 ZM 1 15 C 1 20.5229 7.2679 25 15 25 C 22.7321 25 29 20.5229 29 15 C 29 9.4771 22.7321 5 15 5 C 7.2679 5 1 9.4771 1 15 Z" className="icon"></path>
                                        <path opacity="0.102" d="M 11.525 20.165 L 10.7273 21 L 5.475 15.5 L 5 16 L 10.7273 22 L 12 20.6667 L 11.525 20.165 ZM 20.545 17 L 21.5 16 L 8.5 16 L 9.455 17 L 20.545 17 ZM 24.525 15.5 L 19.2727 21 L 18.475 20.165 L 18 20.6667 L 19.2727 22 L 25 16 L 24.525 15.5 ZM 20.545 14 L 21.5 14 L 18.475 10.835 L 18 11.3333 L 20.545 14 ZM 11.525 10.835 L 8.5 14 L 9.455 14 L 12 11.3333 L 11.525 10.835 ZM 1 15 C 1 15.1677 1.0036 15.3344 1.015 15.5 C 1.3797 10.2094 7.5026 6 15 6 C 22.4974 6 28.6203 10.2094 28.985 15.5 C 28.9964 15.3344 29 15.1677 29 15 C 29 9.4771 22.7321 5 15 5 C 7.2679 5 1 9.4771 1 15 Z" className="highlight"></path>
                                    </g>
                                </svg>
                            </i>
                            <span>Dimensions</span>
                        </a>
                    </li>
                    <li role="menuitem" className={`metals nav-tab ${wizard === "metal" ? "active" : ""}`} onClick={() => this.handleWizard('metal')}>
                        <a>
                            <i className="svg-icon svg-icon-metals">
                                <svg id="metals" viewBox="0 0 30 30" width="30" height="30">
                                    <g>
                                        <path d="M 6 18 L 12 18 L 12 19 L 6.665 19 L 5.4063 22.9688 L 4.4063 22.9688 L 6 18 ZM 5.1851 16 C 4.6328 16 4.0492 16.4266 3.8816 16.9528 L 1.3034 25.0472 C 1.1358 25.5734 1.4476 26 1.9999 26 L 18.0817 26 L 14.4468 16 L 5.1851 16 ZM 10 6 L 18 6 L 18 7 L 10.665 7 L 9 12 L 8 12 L 10 6 ZM 9 4 C 8.4477 4 7.8643 4.4267 7.697 4.953 L 5.1231 13.047 C 4.9557 13.5733 5.2677 14 5.82 14 L 23.0899 14 C 23.6422 14 23.9204 13.5856 23.7114 13.0744 L 20.3786 4.9256 C 20.1695 4.4144 19.5524 4 19.0001 4 L 9 4 ZM 19.635 26 L 28 26 C 28.5523 26 28.8305 25.5856 28.6214 25.0744 L 25.2885 16.9256 C 25.0795 16.4144 24.4623 16 23.91 16 L 16 16 L 16.725 18 L 22 18 L 22 19 L 17.09 19 L 19.635 26 Z" className="shadow"></path>
                                        <path d="M 6 17 L 12 17 L 12 18 L 6.665 18 L 5.4063 21.9688 L 4.4063 21.9688 L 6 17 ZM 5.1851 15 C 4.6328 15 4.0492 15.4266 3.8816 15.9528 L 1.3034 24.0472 C 1.1358 24.5734 1.4476 25 1.9999 25 L 18.0817 25 L 14.4468 15 L 5.1851 15 ZM 10 5 L 18 5 L 18 6 L 10.665 6 L 9 11 L 8 11 L 10 5 ZM 9 3 C 8.4477 3 7.8643 3.4267 7.697 3.953 L 5.1231 12.047 C 4.9557 12.5733 5.2677 13 5.82 13 L 23.0899 13 C 23.6422 13 23.9204 12.5856 23.7114 12.0744 L 20.3786 3.9256 C 20.1695 3.4144 19.5524 3 19.0001 3 L 9 3 ZM 19.635 25 L 28 25 C 28.5523 25 28.8305 24.5856 28.6214 24.0744 L 25.2885 15.9256 C 25.0795 15.4144 24.4623 15 23.91 15 L 16 15 L 16.725 17 L 22 17 L 22 18 L 17.09 18 L 19.635 25 Z" className="icon"></path>
                                        <path opacity="0.102" d="M 12 18 L 6.665 18 L 5.4063 21.9688 L 4.725 21.97 L 4.4063 22.9688 L 5.4063 22.9688 L 6.665 19 L 12 19 L 12 18 ZM 5.1851 15 C 4.6328 15 4.0492 15.4266 3.8816 15.9528 L 1.3034 24.0472 C 1.2157 24.3225 1.2594 24.5711 1.4 24.745 L 3.8816 16.9528 C 4.0492 16.4266 4.6328 16 5.1851 16 L 14.4468 16 L 17.72 25 L 18.0817 25 L 14.4468 15 L 5.1851 15 ZM 18 6 L 10.665 6 L 9 11 L 8.335 11 L 8 12 L 9 12 L 10.665 7 L 18 7 L 18 6 ZM 9 3 C 8.4477 3 7.8643 3.4267 7.697 3.953 L 5.1231 12.047 C 5.0356 12.3222 5.0797 12.571 5.22 12.745 L 7.697 4.953 C 7.8643 4.4267 8.4477 4 9 4 L 19.0001 4 C 19.5524 4 20.1695 4.4144 20.3786 4.9256 L 23.61 12.82 C 23.7891 12.6516 23.8367 12.381 23.7114 12.0744 L 20.3786 3.9256 C 20.1695 3.4144 19.5524 3 19.0001 3 L 9 3 ZM 22 18 L 17.09 18 L 17.455 19 L 22 19 L 22 18 ZM 28.52 24.82 C 28.6991 24.6516 28.7468 24.381 28.6214 24.0744 L 25.2885 15.9256 C 25.0795 15.4144 24.4623 15 23.91 15 L 16 15 L 16.36 16 L 23.91 16 C 24.4623 16 25.0795 16.4144 25.2885 16.9256 L 28.52 24.82 Z" className="highlight"></path>
                                    </g>
                                </svg>
                            </i>
                            <span>Precious metal</span>
                        </a>
                    </li>
                    <li role="menuitem" className={`grooves nav-tab ${wizard === "grooves" ? "active" : ""}`} onClick={() => this.handleWizard('grooves')}>
                        <a>
                            <i className="svg-icon svg-icon-grooves">
                                <svg id="grooves" viewBox="0 0 30 30" width="30" height="30">
                                    <g>
                                        <path d="M 1 15.5 C 1 20.1945 7.2679 24 15 24 C 22.7321 24 29 20.1945 29 15.5 C 29 12.3537 26.1846 9.6047 22 8.135 L 22 11 L 18 11 L 18 7.195 C 17.0335 7.0673 16.0298 7 15 7 C 13.9702 7 12.9665 7.0669 12 7.195 L 12 11 L 8 11 L 8 8.135 C 3.8154 9.6048 1 12.3537 1 15.5 Z" className="shadow"></path>
                                        <path d="M 1 14.5 C 1 19.1945 7.2679 23 15 23 C 22.7321 23 29 19.1945 29 14.5 C 29 11.3537 26.1846 8.6047 22 7.135 L 22 10 L 18 10 L 18 6.195 C 17.0335 6.0673 16.0298 6 15 6 C 13.9702 6 12.9665 6.0669 12 6.195 L 12 10 L 8 10 L 8 7.135 C 3.8154 8.6048 1 11.3537 1 14.5 Z" className="icon"></path>
                                        <path opacity="0.102" d="M 12 10 L 8 10 L 8 11 L 12 11 L 12 10 ZM 18 7.195 L 18 6.195 C 17.0335 6.0673 16.0298 6 15 6 C 13.9702 6 12.9665 6.0669 12 6.195 L 12 7.195 C 12.9665 7.0669 13.9702 7 15 7 C 16.0298 7 17.0335 7.0673 18 7.195 ZM 22 10 L 18 10 L 18 11 L 22 11 L 22 10 ZM 28.975 15 C 28.9908 14.8346 29 14.6678 29 14.5 C 29 11.3537 26.1846 8.6047 22 7.135 L 22 8.135 C 25.9614 9.5263 28.6945 12.0641 28.975 15 ZM 1 14.5 C 1 14.6678 1.0092 14.8346 1.025 15 C 1.3055 12.0641 4.0386 9.5264 8 8.135 L 8 7.135 C 3.8154 8.6048 1 11.3537 1 14.5 Z" className="highlight"></path>
                                    </g>
                                </svg>
                            </i>
                            <span>Grooves/edges</span>
                        </a>
                    </li>
                    <li role="menuitem" className={`diamonds nav-tab ${wizard === "diamonds" ? "active" : ""}`} onClick={() => this.handleWizard('diamonds')}>
                        <a>
                            <i className="svg-icon svg-icon-diamonds">
                                <svg id="diamonds" viewBox="0 0 30 30" width="30" height="30">
                                    <g>
                                        <path d="M 8 13 L 0 13 L 14 27 L 8 13 ZM 21 13 L 9 13 L 15 27 L 21 13 ZM 16 27 L 30 13 L 22 13 L 16 27 ZM 13 5 L 7 5 L 9 12 L 13 5 ZM 24 5 L 18 5 L 22 12 L 24 5 ZM 23 12 L 30 12 L 25 5 L 23 12 ZM 10 12 L 21 12 L 17 5 L 14 5 L 10 12 ZM 6 5 L 0 12 L 8 12 L 6 5 Z" className="shadow"></path>
                                        <path d="M 8 12 L 0 12 L 14 26 L 8 12 ZM 21 12 L 9 12 L 15 26 L 21 12 ZM 16 26 L 30 12 L 22 12 L 16 26 ZM 13 4 L 7 4 L 9 11 L 13 4 ZM 24 4 L 18 4 L 22 11 L 24 4 ZM 23 11 L 30 11 L 25 4 L 23 11 ZM 10 11 L 21 11 L 17 4 L 14 4 L 10 11 ZM 6 4 L 0 11 L 8 11 L 6 4 Z" className="icon"></path>
                                        <path opacity="0.102" d="M 8 12 L 0 12 L 1 13 L 8 13 L 13.25 25.25 L 14 26 L 8 12 ZM 21 12 L 10 12 L 9 12 L 9.43 13 L 20.57 13 L 21 12 ZM 16 26 L 16.75 25.25 L 22 13 L 29 13 L 30 12 L 23 12 L 22 12 L 16 26 ZM 13 4 L 7 4 L 7.285 5 L 12.43 5 L 13 4 ZM 24 4 L 18 4 L 18.57 5 L 23.715 5 L 24 4 ZM 23 11 L 23.285 11 L 25 5 L 29.285 11 L 30 11 L 25 4 L 23 11 ZM 10 11 L 10.57 11 L 14 5 L 17 5 L 20.43 11 L 21 11 L 17 4 L 14 4 L 10 11 ZM 6 4 L 0 11 L 0.855 11 L 6 5 L 7.715 11 L 8 11 L 6 4 Z" className="highlight"></path>
                                    </g>
                                </svg>
                            </i>
                            <span>Diamonds</span>
                        </a>
                    </li>
                    <li role="menuitem" className={`engraving nav-tab ${wizard === "engraving" ? "active" : ""}`} onClick={() => this.handleWizard('engraving')}>
                        <a>
                            <i className="svg-icon svg-icon-engraving">
                                <svg id="engraving" viewBox="0 0 30 30" width="30" height="30">
                                    <g fill="currentColor">
                                        <path d="M 24.8125 25.5 C 25.25 25.8438 25.875 26 26.6719 26 C 27.3281 26 27.9375 25.8438 28.4688 25.5313 C 29 25.2188 29.5 24.7031 30 24 L 29 24 C 28.6406 24 28.4063 23.9688 28.3125 23.8906 C 28.2031 23.8281 28.125 23.7031 28.0781 23.5469 C 28.0156 23.3906 28 23.0156 28 22.4063 L 28 17.2656 C 28 15.8438 27.9219 14.9375 27.7969 14.5313 C 27.5625 13.9063 27.0625 13.3281 26.3125 12.7969 C 25.5625 12.2656 24.5313 12 23.25 12 C 22.1719 12 21.1406 12.1563 20.1563 12.4375 C 19.1563 12.7344 18.3906 13.1563 17.8281 13.7031 C 17.2656 14.25 17 14.8125 17 15.4063 C 17 15.8438 17.2031 16.2188 17.625 16.5313 C 18.0313 16.8438 18.5469 17 19.1719 17 C 19.7344 16.9219 20.2031 16.7656 20.5625 16.5156 C 20.9219 16.2656 21.1094 15.9531 21.1094 15.5469 C 21.1094 15.2188 20.9219 14.875 20.5469 14.5156 C 20.2656 14.2656 20.1406 14.0625 20.1406 13.875 C 20.1406 13.6875 20.2656 13.5156 20.5156 13.3594 C 20.9219 13.125 21.4531 13 22.1094 13 C 22.5 13 22.8594 13.0938 23.1719 13.2813 C 23.4844 13.4688 23.7031 13.6719 23.8281 13.9219 C 23.9375 14.1719 24 14.7813 24 15.7344 L 24 17 C 21.0625 18.4063 19.1719 19.5469 18.2969 20.3906 C 17.4219 21.2344 17 22.2031 17 23.2656 C 17 24.0469 17.25 24.7031 17.75 25.2188 C 18.25 25.75 18.875 26 19.6406 26 C 20.9219 26 22.375 25.3438 24 24 C 24.0938 24.6719 24.3594 25.1719 24.8125 25.5 ZM 22.4063 24 C 22 24 21.6719 23.8438 21.4531 23.5313 C 21.1406 23.1406 21 22.6719 21 22.1406 C 21 21.5156 21.1719 20.9063 21.5313 20.2813 C 22.0625 19.3594 22.8906 18.4844 24 17.6719 L 24 23 C 23.3906 23.6719 22.8594 24 22.4063 24 ZM 11.1988 22.8906 C 11.4258 23.4063 11.5393 23.7031 11.5519 23.7656 C 11.6024 23.9219 11.6276 24.0625 11.6276 24.2031 C 11.6276 24.4375 11.5393 24.6094 11.3628 24.7344 C 11.1105 24.9219 10.6691 25 10.0512 25 L 9.7359 25 L 9.7359 26 L 17 26 L 17 25 C 16.5082 24.9688 16.1298 24.8438 15.865 24.6094 C 15.5119 24.3281 15.0579 23.6094 14.503 22.4844 L 8.9162 6 L 8.109 6 L 2.7871 22.0938 C 2.2322 23.2344 1.7782 23.9844 1.4125 24.3438 C 1.0341 24.7031 0.5675 24.9219 0 25 L 0 26 L 5.1958 26 L 5.1958 25 C 4.3509 24.9375 3.8212 24.8594 3.6194 24.7344 C 3.2537 24.5469 3.0772 24.25 3.0772 23.8281 C 3.0772 23.5156 3.178 23.125 3.405 22.6406 L 3.9473 21 L 10.5556 21 L 11.1988 22.8906 ZM 4.2752 20 L 7.2263 11.0625 L 10.2277 20 L 4.2752 20 Z" className="shadow"></path>
                                        <path d="M 24.8125 24.5 C 25.25 24.8438 25.875 25 26.6719 25 C 27.3281 25 27.9375 24.8438 28.4688 24.5313 C 29 24.2188 29.5 23.7031 30 23 L 29 23 C 28.6406 23 28.4063 22.9688 28.3125 22.8906 C 28.2031 22.8281 28.125 22.7031 28.0781 22.5469 C 28.0156 22.3906 28 22.0156 28 21.4063 L 28 16.2656 C 28 14.8438 27.9219 13.9375 27.7969 13.5313 C 27.5625 12.9063 27.0625 12.3281 26.3125 11.7969 C 25.5625 11.2656 24.5313 11 23.25 11 C 22.1719 11 21.1406 11.1563 20.1563 11.4375 C 19.1563 11.7344 18.3906 12.1563 17.8281 12.7031 C 17.2656 13.25 17 13.8125 17 14.4063 C 17 14.8438 17.2031 15.2188 17.625 15.5313 C 18.0313 15.8438 18.5469 16 19.1719 16 C 19.7344 15.9219 20.2031 15.7656 20.5625 15.5156 C 20.9219 15.2656 21.1094 14.9531 21.1094 14.5469 C 21.1094 14.2188 20.9219 13.875 20.5469 13.5156 C 20.2656 13.2656 20.1406 13.0625 20.1406 12.875 C 20.1406 12.6875 20.2656 12.5156 20.5156 12.3594 C 20.9219 12.125 21.4531 12 22.1094 12 C 22.5 12 22.8594 12.0938 23.1719 12.2813 C 23.4844 12.4688 23.7031 12.6719 23.8281 12.9219 C 23.9375 13.1719 24 13.7813 24 14.7344 L 24 16 C 21.0625 17.4063 19.1719 18.5469 18.2969 19.3906 C 17.4219 20.2344 17 21.2031 17 22.2656 C 17 23.0469 17.25 23.7031 17.75 24.2188 C 18.25 24.75 18.875 25 19.6406 25 C 20.9219 25 22.375 24.3438 24 23 C 24.0938 23.6719 24.3594 24.1719 24.8125 24.5 ZM 22.4063 23 C 22 23 21.6719 22.8438 21.4531 22.5313 C 21.1406 22.1406 21 21.6719 21 21.1406 C 21 20.5156 21.1719 19.9063 21.5313 19.2813 C 22.0625 18.3594 22.8906 17.4844 24 16.6719 L 24 22 C 23.3906 22.6719 22.8594 23 22.4063 23 ZM 11.1988 21.8906 C 11.4258 22.4063 11.5393 22.7031 11.5519 22.7656 C 11.6024 22.9219 11.6276 23.0625 11.6276 23.2031 C 11.6276 23.4375 11.5393 23.6094 11.3628 23.7344 C 11.1105 23.9219 10.6691 24 10.0512 24 L 9.7359 24 L 9.7359 25 L 17 25 L 17 24 C 16.5082 23.9688 16.1298 23.8438 15.865 23.6094 C 15.5119 23.3281 15.0579 22.6094 14.503 21.4844 L 8.9162 5 L 8.109 5 L 2.7871 21.0938 C 2.2322 22.2344 1.7782 22.9844 1.4125 23.3438 C 1.0341 23.7031 0.5675 23.9219 0 24 L 0 25 L 5.1958 25 L 5.1958 24 C 4.3509 23.9375 3.8212 23.8594 3.6194 23.7344 C 3.2537 23.5469 3.0772 23.25 3.0772 22.8281 C 3.0772 22.5156 3.178 22.125 3.405 21.6406 L 3.9473 20 L 10.5556 20 L 11.1988 21.8906 ZM 4.2752 19 L 7.2263 10.0625 L 10.2277 19 L 4.2752 19 Z" className="icon"></path>
                                        <path opacity="0.102" d="M 20.1563 12.4375 L 20.575 12.325 C 20.9731 12.1121 21.485 12 22.1094 12 C 22.2315 12 22.3495 12.0067 22.465 12.025 C 22.7236 12.0068 22.9859 12 23.25 12 C 24.5313 12 25.5625 12.2656 26.3125 12.7969 C 27.0625 13.3281 27.5625 13.9063 27.7969 14.5313 C 27.9219 14.9375 28 15.8438 28 17.2656 L 28 16.2656 C 28 14.8438 27.9219 13.9375 27.7969 13.5313 C 27.5625 12.9063 27.0625 12.3281 26.3125 11.7969 C 25.5625 11.2656 24.5313 11 23.25 11 C 22.1719 11 21.1406 11.1563 20.1563 11.4375 C 19.1563 11.7344 18.3906 12.1563 17.8281 12.7031 C 17.2656 13.25 17 13.8125 17 14.4063 C 17 14.5639 17.0265 14.7136 17.08 14.855 C 17.1967 14.4604 17.4426 14.078 17.8281 13.7031 C 18.3906 13.1563 19.1563 12.7344 20.1563 12.4375 ZM 20.5469 13.5156 L 20.435 13.41 C 20.2376 13.5519 20.1406 13.7084 20.1406 13.875 C 20.1406 14.0625 20.2656 14.2656 20.5469 14.5156 C 20.7438 14.7043 20.8865 14.8899 20.98 15.07 C 21.064 14.9152 21.1094 14.7411 21.1094 14.5469 C 21.1094 14.2188 20.9219 13.875 20.5469 13.5156 ZM 29.155 24 C 29.4397 23.727 29.7207 23.3927 30 23 L 29 23 C 28.6406 23 28.4063 22.9688 28.3125 22.8906 C 28.2031 22.8281 28.125 22.7031 28.0781 22.5469 C 28.0156 22.3906 28 22.0156 28 21.4063 L 28 22.4063 C 28 23.0156 28.0156 23.3906 28.0781 23.5469 C 28.125 23.7031 28.2031 23.8281 28.3125 23.8906 C 28.4063 23.9688 28.6406 24 29 24 L 29.155 24 ZM 23.005 17.485 C 23.3064 17.2073 23.6383 16.9368 24 16.6719 L 24 16 C 21.0625 17.4063 19.1719 18.5469 18.2969 19.3906 C 17.4219 20.2344 17 21.2031 17 22.2656 C 17 22.4327 17.0121 22.5945 17.035 22.75 C 17.1516 21.8885 17.5656 21.0957 18.2969 20.3906 C 19.0688 19.6463 20.6309 18.6699 23.005 17.485 ZM 22.4063 23 C 22 23 21.6719 22.8438 21.4531 22.5313 C 21.2373 22.2615 21.1022 21.9542 21.04 21.615 C 21.0124 21.7893 21 21.9645 21 22.1406 C 21 22.6719 21.1406 23.1406 21.4531 23.5313 C 21.6719 23.8438 22 24 22.4063 24 C 22.4966 24 22.5885 23.9862 22.685 23.96 C 23.1096 23.6923 23.5489 23.373 24 23 L 24 22 C 23.3906 22.6719 22.8594 23 22.4063 23 ZM 5.1958 25 L 5.1958 24 C 4.3509 23.9375 3.8212 23.8594 3.6194 23.7344 C 3.3999 23.6218 3.2509 23.4698 3.165 23.275 C 3.1069 23.482 3.0772 23.6656 3.0772 23.8281 C 3.0772 24.25 3.2537 24.5469 3.6194 24.7344 C 3.8212 24.8594 4.3509 24.9375 5.1958 25 ZM 17 25 L 17 24 C 16.5082 23.9688 16.1298 23.8438 15.865 23.6094 C 15.5119 23.3281 15.0579 22.6094 14.503 21.4844 L 8.9162 5 L 8.109 5 L 2.7871 21.0938 C 2.2322 22.2344 1.7782 22.9844 1.4125 23.3438 C 1.0341 23.7031 0.5675 23.9219 0 24 L 0 25 C 0.5675 24.9219 1.0341 24.7031 1.4125 24.3438 C 1.7782 23.9844 2.2322 23.2344 2.7871 22.0938 L 8.109 6 L 8.9162 6 L 14.503 22.4844 C 15.0579 23.6094 15.5119 24.3281 15.865 24.6094 C 16.1298 24.8438 16.5082 24.9688 17 25 ZM 11.5 23.61 C 11.4628 23.6567 11.4161 23.6966 11.3628 23.7344 C 11.1105 23.9219 10.6691 24 10.0512 24 L 9.7359 24 L 9.7359 25 L 10.0512 25 C 10.6691 25 11.1105 24.9219 11.3628 24.7344 C 11.5393 24.6094 11.6276 24.4375 11.6276 24.2031 C 11.6276 24.0625 11.6024 23.9219 11.5519 23.7656 L 11.5 23.61 ZM 9.89 19 L 4.605 19 L 4.2752 20 L 10.2277 20 L 9.89 19 Z" className="highlight"></path>
                                    </g>
                                </svg>
                            </i>
                            <span>Engraving</span>
                        </a>
                    </li>
                </ul>
                <ul className="wizard-steps-mobile">
                    <a className="mobile-nav-btn" onClick={() => this.handleWizard('prev')}>
                        <i className="svg-icon svg-icon-prev active">
                            <svg id="prev" viewBox="0 0 18 18" width="18" height="18">
                                <path d="M 7.5991 3.5 L 2 9 L 7.569 14.5 L 9.2586 13 L 6 10 C 6 10 7.7931 10 16 10 L 16 8 L 6.0614 8 L 9.2586 5 L 7.5991 3.5 Z"></path>
                            </svg>
                        </i>
                    </a>
                    <a className="mobile-nav-btn mobile-nav-toggle" dropdowntoggle="">
                        <span>{wizard}</span>
                    </a>
                    <a className="mobile-nav-btn" onClick={() => this.handleWizard('next')}>
                        <i className="svg-icon svg-icon-next">
                            <svg id="next" viewBox="0 0 18 18" width="18" height="18">
                                <path d="M 10.4009 3.5 L 16 9 L 10.431 14.5 L 8.7414 13 L 12 10 C 12 10 10.2069 10 2 10 L 2 8 L 11.9386 8 L 8.7414 5 L 10.4009 3.5 Z"></path>
                            </svg>
                        </i>
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