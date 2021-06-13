import React, { Component } from 'react';

import ProfilesControl from './ProfilesControl';

export default class ProfilesControls extends Component {
    state = {
        controls: []
    }

    componentDidMount() {
        let controls = [];
        const alphas = Array.from(Array(15)).map((e, i) => i + 65);
        alphas.forEach(alpha => {
            controls.push({ id: alpha - 65, data: String.fromCharCode(alpha) });
        });
        this.setState({ controls });
    }

    render() {
        const controls = this.state.controls;

        return (
            <section className="profile-controls-list">
                {
                    controls.map(control => {
                        return <ProfilesControl key={control.id} control={control} />
                    })
                }
            </section>
        );
    }
}