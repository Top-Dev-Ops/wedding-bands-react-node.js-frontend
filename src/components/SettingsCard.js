import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

// redux
import { connect } from 'react-redux';

import ProfilesControls from './Profiles/ProfilesControls';
import DimensionsControls from './Dimensions/DimensionsControls';
import MetalControls from './Metal/MetalControls';
import GroovesEdgesControls from './GroovesEdges/GroovesEdgesControls';
import DiamondsControls from './Diamonds/DiamondsControls';
import EngravingControls from './Engraving/EngravingControls';

class SettingsCard extends Component {
    render() {
        const { wizard } = this.props;

        return (
            <>
                <Card className="ring-settings-card">
                    <Card.Header className="ring-settings-card-header">
                        <span>{wizard}</span>
                        <i icon="help" className="svg-icon svg-icon-help">
                            <svg id="help" viewBox="0 0 28 28" width="28" height="28">
                                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="svg-grad">
                                    <stop stopColor="#f7f6f3" stopOpacity="1" offset="0%"></stop>
                                    <stop stopColor="#e5e2d9" stopOpacity="1" offset="100%"></stop>
                                </linearGradient>
                                <g>
                                    <path opacity="0.302" d="M 15.7249 16.1007 C 15.5758 16.4084 15.5053 16.9631 15.5219 17.7608 L 12.6058 17.7608 C 12.5975 17.3842 12.5975 17.1534 12.5975 17.0684 C 12.5975 16.2181 12.7466 15.5136 13.0448 14.963 C 13.3431 14.4123 13.9396 13.7928 14.8343 13.1045 C 15.729 12.4162 16.2675 11.9668 16.4415 11.7522 C 16.7107 11.4161 16.8474 11.0436 16.8474 10.6387 C 16.8474 10.0314 16.6238 9.5131 16.1805 9.0799 C 15.7332 8.6507 15.1325 8.4321 14.3786 8.4321 C 13.6496 8.4321 13.0407 8.6264 12.5519 9.0111 C 12.0631 9.3957 11.7276 9.9788 11.5453 10.7642 L 8.6292 10.5051 C 8.7037 9.3552 9.2422 8.3754 10.2405 7.5697 C 11.2388 6.7639 12.5519 6.359 14.1757 6.359 C 15.8823 6.359 17.2368 6.7963 18.2475 7.6709 C 19.2582 8.5454 19.7636 9.5658 19.7636 10.7238 C 19.7636 11.3635 19.5813 11.9708 19.2168 12.5417 C 18.8523 13.1126 18.0694 13.89 16.8764 14.8698 C 16.2551 15.38 15.874 15.793 15.7249 16.1007 ZM 15.5219 21.6477 L 12.6058 21.6477 L 12.6058 18.7973 L 15.5219 18.7973 L 15.5219 21.6477 ZM 0.8351 14.071 C 0.8351 21.1994 6.742 26.9864 14.0572 27.059 L 28 27.0667 L 23.5103 23.3836 C 26.0069 21.0237 27.5577 17.7236 27.5577 14.071 C 27.5577 6.8975 21.5757 1.0824 14.1964 1.0824 C 6.817 1.0824 0.8351 6.8975 0.8351 14.071 Z"></path>
                                    <path d="M 14.8898 15.0183 C 14.7407 15.326 14.6703 15.8807 14.6868 16.6784 L 11.7707 16.6784 C 11.7624 16.3018 11.7624 16.071 11.7624 15.986 C 11.7624 15.1357 11.9115 14.4312 12.2098 13.8806 C 12.508 13.3299 13.1045 12.7104 13.9992 12.0221 C 14.8939 11.3338 15.4324 10.8844 15.6064 10.6698 C 15.8757 10.3337 16.0124 9.9612 16.0124 9.5563 C 16.0124 8.949 15.7887 8.4307 15.3454 7.9975 C 14.8981 7.5683 14.2975 7.3497 13.5436 7.3497 C 12.8145 7.3497 12.2056 7.544 11.7168 7.9287 C 11.228 8.3133 10.8925 8.8964 10.7102 9.6819 L 7.7941 9.4227 C 7.8687 8.2728 8.4071 7.293 9.4054 6.4873 C 10.4037 5.6815 11.7168 5.2766 13.3406 5.2766 C 15.0472 5.2766 16.4017 5.7139 17.4124 6.5885 C 18.4232 7.4631 18.9285 8.4834 18.9285 9.6414 C 18.9285 10.2811 18.7463 10.8884 18.3817 11.4593 C 18.0172 12.0302 17.2343 12.8076 16.0414 13.7875 C 15.42 14.2976 15.0389 14.7106 14.8898 15.0183 ZM 14.6868 20.5653 L 11.7707 20.5653 L 11.7707 17.7149 L 14.6868 17.7149 L 14.6868 20.5653 ZM 0 12.9886 C 0 20.117 5.9069 25.904 13.2221 25.9766 L 27.1649 25.9843 L 22.6752 22.3012 C 25.1718 19.9413 26.7226 16.6412 26.7226 12.9886 C 26.7226 5.8151 20.7406 0 13.3613 0 C 5.982 0 0 5.8151 0 12.9886 Z" fill="url(#svg-grad)"></path>
                                </g>
                            </svg>
                        </i>
                    </Card.Header>

                    <Card.Body className="ring-settings-card-body">
                        {wizard === 'profiles' && <ProfilesControls />}
                        {wizard === 'dimensions' && <DimensionsControls />}
                        {wizard === 'metal' && <MetalControls />}
                        {wizard === 'grooves' && <GroovesEdgesControls />}
                        {wizard === 'diamonds' && <DiamondsControls />}
                        {wizard === 'engraving' && <EngravingControls />}
                    </Card.Body>
                </Card>
                <div className="ring-settings-card-mobile">
                    {wizard === 'profiles' && <ProfilesControls />}
                    {wizard === 'dimensions' && <DimensionsControls />}
                    {wizard === 'metal' && <MetalControls />}
                    {wizard === 'grooves' && <GroovesEdgesControls />}
                    {wizard === 'diamonds' && <DiamondsControls />}
                    {wizard === 'engraving' && <EngravingControls />}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({ wizard: state.data.wizard });

export default connect(mapStateToProps)(SettingsCard);