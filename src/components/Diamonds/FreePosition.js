import React, { Component } from 'react';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { setRingPairDiamondSetting, setRing1DiamondSetting, setRing2DiamondSetting } from '../../redux/actions';

class FreePosition extends Component {

  constructor(props) {
    super(props);
    this.state = { show_diamonds: false }
  }

  componentDidMount() {

  }

  render() {

    return (
      <canvas id="diamondCanvas" height="10px" style={{ background: '#f3f3f3', width: '100%' }}></canvas>
    );
  }
}

FreePosition.propTypes = { data: PropTypes.object.isRequired };

const mapStateToProps = (state) => ({ data: state.data });
const mapActionsToProps = { setRingPairDiamondSetting, setRing1DiamondSetting, setRing2DiamondSetting };

export default connect(mapStateToProps, mapActionsToProps)(FreePosition);