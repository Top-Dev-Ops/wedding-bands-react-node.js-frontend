import React, { Component } from 'react'

export default class SummaryHeader extends Component {
    render() {
        return (
            <div className="summary-header">
                <div className="container-fluid-without-background">
                    <div className="col-xl-10 offset-xl-1 summary-header-controls">
                        <h3>Summary of your configuration</h3>

                        <div>
                            <button className="btn-round">
                                <i icon="printnormal" className="svg-icon svg-icon-printnormal">
                                    <svg id="printnormal" viewBox="0 0 26 26" width="26" height="26">
                                        <title>print</title>
                                        <path d="M 6 9 L 6 3 L 20 3 L 20 9 L 6 9 ZM 7 15 L 19 15 L 19 23 L 7 23 L 7 15 ZM 6 20 L 6 24 L 20 24 L 20 20 L 21.2813 20 C 22.8346 20 24 18.6438 24 17.125 L 24 11.625 C 24 10.1062 22.5533 9 21 9 L 21 9 L 21 2 L 5 2 L 5 9 L 5 9 C 3.4467 9 2 10.1062 2 11.625 L 2 17.125 C 2 18.6438 3.0717 20 4.625 20 L 6 20 ZM 6 19 L 4.625 19 C 3.693 19 3 17.8607 3 17 L 3 11.5 C 3 10.6393 3.818 10 4.75 10 L 21.25 10 C 22.182 10 23 10.7643 23 11.625 L 23 17 C 23 17.8607 22.2132 19 21.2813 19 L 20 19 L 20 14 L 6 14 L 6 19 ZM 9 20 L 9 21 L 17 21 L 17 20 L 9 20 ZM 9 17 L 9 18 L 17 18 L 17 17 L 9 17 Z" fill="currentColor"></path>
                                    </svg>
                                </i>
                            </button>
                            <button className="btn-round">
                                <i icon="share" className="svg-icon svg-icon-share">
                                    <svg id="share" viewBox="0 0 26 26" width="26" height="26">
                                        <title>share</title>
                                        <path d="M18.5,2.5v4s-5,0-5,3v2h5v3h-5v9h-4v-9h-4v-3h4V9C9.5,2.64,18.5,2.5,18.5,2.5Z" fill="none" stroke="currentColor" strokeMiterlimit="10"></path>
                                    </svg>
                                </i>
                            </button>
                            <button className="btn-round">
                                <i icon="email" className="svg-icon svg-icon-email">
                                    <svg id="email" viewBox="0 0 26 26" width="26" height="26">
                                        <title>email</title>
                                        <rect x="2.5" y="4.5" width="21" height="17" rx="2" ry="2" fill="none" stroke="currentColor" strokeMiterlimit="10"></rect>
                                        <polyline points="5.5 8.5 13 15.5 20.5 8.5" fill="none" stroke="currentColor" strokeMiterlimit="10"></polyline>
                                        <line x1="6.5" y1="17.5" x2="10.5" y2="13.5" fill="none" stroke="currentColor" strokeMiterlimit="10"></line>
                                        <line x1="19.5" y1="17.5" x2="15.5" y2="13.5" fill="none" stroke="currentColor" strokeMiterlimit="10"></line>
                                    </svg>
                                </i>
                            </button>
                        </div>

                        <button className="btn-iconed btn">
                            <i className="icon-24 icon-left svg-icon svg-icon-saveload" icon="saveload">
                                <svg id="saveload" viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M6.24,2H0V17.18L3,6H19.32L18.24,3.9H7.2ZM24,8H4.32L0,22H11V14.86L8.2,17.71,7,16.46l5-5.08,5,5.06-1.15,1.28L13,14.86V22h6.68Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span>Loading / saving</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
