import React, { Component } from 'react';
import { isMobile, isIOS, isSafari } from 'react-device-detect';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setHandView, stopHandView, setFullScreen, stopFullScreen } from '../../redux/actions';

class CanvasControls extends Component {
    constructor(props) {
        super();
        this.state = props.ui;
    }

    handleClick = event => {
        switch (event.target.id) {
            case 'hand':
                this.props.ui.hand_view ? this.props.stopHandView() : this.props.setHandView();
                break;
            case 'fullscreen':
                if (isMobile && isIOS && isSafari) { return; }      // disallows fullscreen in iPhone
                else if (this.props.ui.full_screen) { this.props.stopFullScreen(); } else { this.props.setFullScreen(); }
                break;
            case 'email_share':
                console.log('email share');
                break;
        }
    }

    render() {
        return (
            <>
                <div className="ring-controls-top-left">
                    <button id="hand" className="btn-round button-handview" title="Hand view" onClick={this.handleClick}>
                        <i id="hand" icon="hand" className="svg-icon svg-icon-hand">
                            <svg id="hand" viewBox="0 0 30 30" width="30" height="30">
                                <g>
                                    <path id="hand" d="M 18.0203 2.746 C 18.0203 2.8876 17.7256 3.6661 17.5783 4.0908 C 16.9153 6.214 16.2523 8.3373 15.5157 10.4606 C 15.5157 10.5314 15.442 10.6022 15.2947 10.6022 L 12.3481 9.9652 C 12.3481 9.3282 12.6427 8.8328 12.8637 8.4081 C 13.7477 6.2848 14.6317 4.1615 15.663 2.109 C 15.7366 1.9675 15.9576 1.8259 16.1786 1.7551 C 16.326 1.6136 16.6206 1.6844 16.8416 1.6844 C 17.5783 1.6844 18.0203 2.0382 18.0203 2.746 ZM 24.4291 3.5953 C 24.4291 4.1615 22.2928 7.1341 22.2192 7.3465 C 21.1142 9.0451 20.0829 10.8853 18.9042 12.6547 L 18.9779 12.7962 C 21.3352 10.956 23.6925 8.9743 26.197 7.1341 C 26.4181 6.9218 26.86 6.9926 27.081 6.9926 C 27.744 6.9926 28.3333 7.3465 28.3333 8.0542 C 28.3333 8.1958 28.3333 8.4789 28.186 8.6912 C 25.3131 12.0885 22.3665 15.4857 19.5672 18.9538 C 19.0516 19.52 19.1252 19.9446 19.1252 20.5108 C 19.1252 20.6524 18.9779 21.3601 19.4936 21.3601 C 19.6409 21.3601 23.6188 19.8031 25.7551 19.0953 C 25.9024 19.0245 26.197 19.0953 26.3444 19.0953 C 27.4494 19.0953 27.8177 19.3784 27.8177 20.3693 C 27.8177 20.7232 27.8913 20.9355 27.4494 21.5725 C 27.0074 22.1387 26.197 22.4218 25.6077 22.7049 C 23.6188 23.5542 21.5562 25.0405 19.4936 25.4652 C 16.8416 26.0314 14.116 25.7483 11.5378 26.2437 C 10.4328 26.456 9.5488 27.3054 8.5175 27.5885 C 8.1492 27.73 7.3815 28.3333 7.1605 28.3333 C 4.9505 28.3333 1.6667 26.1022 1.6667 23.2003 C 1.6667 22.6341 1.814 21.8556 2.256 21.4309 C 4.9079 18.8122 6.0866 16.1227 7.7072 13.504 C 7.8545 13.2917 7.9282 13.0793 7.9282 12.867 C 8.1492 11.5223 8.2965 10.1067 8.4438 8.6912 C 8.5912 7.9834 8.6648 7.2049 8.7385 6.4264 C 8.9595 5.7894 8.5175 3.7369 10.1381 3.7369 C 10.5801 3.7369 11.2431 3.8076 11.3168 4.5862 L 11.4641 11.6638 C 11.6114 11.4515 11.6851 11.1684 11.8324 10.956 L 15.221 11.8054 C 15.8103 11.6638 15.8103 11.2391 15.8103 10.8145 C 17.9466 8.125 19.9355 5.2232 22.2192 2.6752 C 22.5138 2.3213 23.1031 2.3213 23.3978 2.3213 C 24.2818 2.3213 24.4291 3.1707 24.4291 3.5953 Z" fill="#737067">
                                    </path>
                                </g>
                            </svg>
                        </i>
                    </button>

                    <button className="btn-round button-fullscreen d-inline-flex" title="Full screen" onClick={this.handleClick}>
                        <i id="fullscreen" icon="fullscreen" className="svg-icon svg-icon-fullscreen">
                            <svg id="fullscreen" viewBox="0 0 26 26" width="26" height="26">
                                <title>fullscreen</title>
                                <rect id="fullscreen" x="5" y="7" width="16" height="12" rx="1" strokeWidth="2" stroke="#737067" strokeLinecap="round" strokeLinejoin="round" fill="none"></rect>
                                <path id="fullscreen" d="M23,2H17V4h6a1,1,0,0,1,1,1v5h2V5A3,3,0,0,0,23,2Z" fill="#737067"></path>
                                <path id="fullscreen" d="M24,16v5a1,1,0,0,1-1,1H17v2h6a3,3,0,0,0,3-3V16Z" fill="#737067"></path>
                                <path id="fullscreen" d="M9,22H3a1,1,0,0,1-1-1V16H0v5a3,3,0,0,0,3,3H9Z" fill="#737067"></path>
                                <path id="fullscreen" d="M2,10V5A1,1,0,0,1,3,4H9V2H3A3,3,0,0,0,0,5v5Z" fill="#737067"></path>
                            </svg>
                        </i>
                    </button>
                </div>

                <div className="ring-controls-top-right">
                    <button id="email_share" className="btn-round button-email-share" onClick={this.handleClick}>
                        <i id="email_share" icon="email-share" className="svg-icon svg-icon-email-share">
                            <svg id="email_share" viewBox="0 0 26 26" width="26" height="26">
                                <title>email-share</title>
                                <line id="email_share" x1="13" y1="15" x2="13" y2="3" fill="none" stroke="#737067" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></line>
                                <polyline id="email_share" points="9 7 13 3 17 7" fill="none" stroke="#737067" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></polyline>
                                <polyline id="email_share" points="10 11 6 11 6 23 20 23 20 11 16 11" fill="none" stroke="#737067" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                            </svg>
                        </i>
                    </button>
                </div>
            </>
        );
    }
}

CanvasControls.propTypes = {
    ui: PropTypes.object.isRequired,
    setHandView: PropTypes.func.isRequired,
    stopHandView: PropTypes.func.isRequired,
    setFullScreen: PropTypes.func.isRequired,
    stopFullScreen: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ ui: state.ui });
const mapActionsToProps = { setHandView, stopHandView, setFullScreen, stopFullScreen };

export default connect(mapStateToProps, mapActionsToProps)(CanvasControls);