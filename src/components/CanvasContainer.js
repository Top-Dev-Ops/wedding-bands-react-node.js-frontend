import React, { Component } from 'react';

import CanvasControls from './Canvas/CanvasControls';
import Canvas from './Canvas/Canvas';

export default class CanvasContainer extends Component {
    render() {
        return (
            <>
                <CanvasControls />
                <Canvas />
            </>
        );
    }
}