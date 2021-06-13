import React, { Component } from 'react';

import SummaryHeader from './Summary/SummaryHeader';
import SummaryContent from './Summary/SummaryContent';

export default class SummaryContainer extends Component {
    render() {
        return (
            <>
                <SummaryHeader />
                <SummaryContent />
            </>
        );
    }
}