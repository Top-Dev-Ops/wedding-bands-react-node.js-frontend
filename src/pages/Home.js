import React, { useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

import Loading from '../components/Loading';
import Header from '../components/Header';
import Wizard from '../components/Wizard';
import BackgroundGirl from '../components/BackgroundGirl';
import CanvasContainer from '../components/CanvasContainer';
import PriceOrderContainer from '../components/PriceOrderContainer';
import SettingsContainer from '../components/SettingsContainer';
import SummaryContainer from '../components/SummaryContainer';
import Footer from '../components/Footer';

export default function Home() {
    const { loading } = useSelector(state => state.ui);

    return (
        <>
            <Header />
            <div className="container-fluid">
                <Wizard />
                <BackgroundGirl />

                <div className="row">
                    {loading && <Loading />}
                    <div className="col-lg-6 col-xl-5 offset-xl-1">
                        <CanvasContainer />
                        <PriceOrderContainer />
                    </div>
                    <div className="col-lg-6 col-xl-5">
                        <SettingsContainer />
                    </div>
                </div>
            </div>

            <SummaryContainer />
            <Footer />
        </>
    )
}