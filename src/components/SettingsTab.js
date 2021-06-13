import React, { Component } from 'react';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setRing } from '../redux/actions';

class SettingsTab extends Component {
    /* changes 'Pair', 'Ring 1' or 'Ring 2' */
    handleMode = mode => {
        this.props.setRing(mode);
    }

    render() {
        const { ring, wizard } = this.props.data;

        return (
            <section className="ring-mode-select">
                <ul>
                    <li className={`option option-both ${ring === 'pair' && 'active'}`} onClick={() => this.handleMode('pair')}>
                        <span className="option-image">
                            <span className="option-image-icon"></span>
                        </span>
                        <span className="option-label">Pair of rings</span>
                    </li>
                    <li className={`option option-left ${ring === 'ring_1' && 'active'} ${wizard === 'dimensions' && 'disabled'}`} onClick={() => this.handleMode('ring_1')}>
                        <span className="option-image">
                            <span className="option-image-icon"></span>
                        </span>
                        <span className="option-label">Ring 1</span>
                    </li>
                    <li className={`option option-right ${ring === 'ring_2' && 'active'} ${wizard === 'dimensions' && 'disabled'}`} onClick={() => this.handleMode('ring_2')} >
                        <span className="option-image">
                            <span className="option-image-icon"></span>
                        </span>
                        <span className="option-label">Ring 2</span>
                    </li>
                </ul>
            </section>
        );
    }
}

SettingsTab.propTypes = {
    data: PropTypes.object.isRequired,
    setRing: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ data: state.data });
const mapActionToProps = { setRing };

export default connect(mapStateToProps, mapActionToProps)(SettingsTab);