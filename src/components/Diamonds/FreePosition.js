import React, { Component } from 'react';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setRingPairDiamondSetting, setRing1DiamondSetting, setRing2DiamondSetting } from '../../redux/actions';

import HorizontalSlider from '../GroovesEdges/Components/HorizontalSlider';

class FreePosition extends Component {

  constructor(props) {
    super(props);
    this.state = { show_diamonds: false }
  }

  render() {

    return (
      <>
        <canvas id="diamondCanvas" height="10px" style={{ background: '#f3f3f3', width: '100%' }}></canvas>

        {(['pair', 'ring_1'].includes(this.props.data.ring)) && <HorizontalSlider ring_number="Ring 1" />}
        {(this.props.data.ring === 'ring_2') && <HorizontalSlider ring_number="Ring 2" />}
      </>
    );
  }
}

FreePosition.propTypes = { data: PropTypes.object.isRequired };

const mapStateToProps = (state) => ({ data: state.data });
const mapActionsToProps = { setRingPairDiamondSetting, setRing1DiamondSetting, setRing2DiamondSetting };

export default connect(mapStateToProps, mapActionsToProps)(FreePosition);