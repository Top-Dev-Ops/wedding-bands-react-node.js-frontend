import React, { useEffect } from 'react';

import Header from '../components/Header';
import SummaryContainer from '../components/SummaryContainer';
import Footer from '../components/Footer';

export default function Order() {

    return (
        <section className="min-h-100">
            <Header />
            <SummaryContainer />
            <Footer />
        </section>
    )
}