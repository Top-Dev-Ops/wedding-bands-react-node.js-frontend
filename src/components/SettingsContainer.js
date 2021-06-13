
import React, { Component } from 'react';

import SettingsTab from './SettingsTab';
import SettingsCard from './SettingsCard';
import SettingsFooter from './SettingsFooter';

export default class SettingsContainer extends Component {
    render() {
        return (
            <>
                <SettingsTab />
                <SettingsCard />
                <SettingsFooter />
            </>
        );
    }
}