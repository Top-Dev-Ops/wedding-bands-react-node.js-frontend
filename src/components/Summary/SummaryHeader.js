import React, { Component } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/all';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { loadFile } from '../../redux/actions';

import ring_img from '../../assets/img/ring.jpeg';

class SummaryHeader extends Component {

    constructor() {
        super();
        this.state = {
            page: 'home',
            mobile: false,
            load_save: false,
            save_name: '',
            load_name: '',
            count: 0
        }
    }

    componentDidMount() {
        if (window.location.pathname === '/order') {
            this.setState({ page: 'order' });
        }
        if (window.innerWidth < 768) {
            this.setState({ mobile: true });
        }
        let count = 0;
        Object.keys(localStorage).forEach(key => {
            if (key.includes('savedFile')) { count++; }
        });
        if (this.state.count !== count) {
            this.setState({ count: count });
        }
    }

    // save file - save filename and redux store in localStorage with unique name with time, increases the count of saved files by 1
    save = () => {
        const save_file = {
            id: this.state.save_name,
            data: this.props.data
        };
        const filename = new Date().getTime().toString();
        localStorage.setItem(`savedFile${filename}`, JSON.stringify(save_file));
        this.setState({ count: this.state.count + 1, save_name: '' });
    }

    // load file - load file from localStorage and set them as state in redux
    load = (id) => {
        let savedFile = null;
        Object.keys(localStorage).forEach(key => {
            if (key.includes('savedFile')) {
                savedFile = JSON.parse(localStorage.getItem(key));
                if (savedFile.id === id) {
                    this.setState({ load_save: false, load_name: '' });
                    this.props.loadFile(savedFile.data);
                }
            }
        });
    }

    // remove file - remove file from localStorage, decreases the count by 1
    remove = (id) => {
        let savedFile = null;
        Object.keys(localStorage).forEach(key => {
            if (key.includes('savedFile')) {
                savedFile = JSON.parse(localStorage.getItem(key));
                if (savedFile.id === id) {
                    localStorage.removeItem(key);
                    this.setState({ count: this.state.count - 1 });
                }
            }
        });
    }

    // print wedding band canvas & customization info(redux state) in PDF
    print = () => {
        console.log("PRINT");
    }

    render() {
        const { page, mobile, load_save } = this.state;

        let savedFiles = [];
        Object.keys(localStorage).forEach(key => {
            if (key.includes('savedFile')) {
                savedFiles.push(JSON.parse(localStorage.getItem(key)));
            }
        });
        savedFiles = savedFiles.map((item, index) => {
            return (
                <div className="saved-items" key={index} onClick={e => {
                    e.stopPropagation();
                    this.load(item.id);
                }}>
                    <AiOutlineCloseCircle
                        className="nav-icon"
                        style={{ color: '#aaa' }}
                        onClick={e => {
                            e.stopPropagation();
                            this.remove(item.id);
                        }}
                    />
                    <img src={ring_img} />
                    <span className="d-block">{item.id}</span>
                </div>
            )
        });

        return (
            page === 'order' && mobile === true ?
                <></> :
                <>
                    <div className="summary-header">
                        <div className="container-fluid-without-background">
                            <div className="col-xl-10 offset-xl-1 summary-header-controls">
                                <h3>{this.state.page === 'home' ? 'Summary of your configuration' : 'Order details'}</h3>

                                {this.state.page === 'home' &&
                                    <div>
                                        {/* print */}
                                        <button className="btn-round" onClick={this.print}>
                                            <i icon="printnormal" className="svg-icon svg-icon-printnormal">
                                                <svg id="printnormal" viewBox="0 0 26 26" width="26" height="26">
                                                    <title>print</title>
                                                    <path d="M 6 9 L 6 3 L 20 3 L 20 9 L 6 9 ZM 7 15 L 19 15 L 19 23 L 7 23 L 7 15 ZM 6 20 L 6 24 L 20 24 L 20 20 L 21.2813 20 C 22.8346 20 24 18.6438 24 17.125 L 24 11.625 C 24 10.1062 22.5533 9 21 9 L 21 9 L 21 2 L 5 2 L 5 9 L 5 9 C 3.4467 9 2 10.1062 2 11.625 L 2 17.125 C 2 18.6438 3.0717 20 4.625 20 L 6 20 ZM 6 19 L 4.625 19 C 3.693 19 3 17.8607 3 17 L 3 11.5 C 3 10.6393 3.818 10 4.75 10 L 21.25 10 C 22.182 10 23 10.7643 23 11.625 L 23 17 C 23 17.8607 22.2132 19 21.2813 19 L 20 19 L 20 14 L 6 14 L 6 19 ZM 9 20 L 9 21 L 17 21 L 17 20 L 9 20 ZM 9 17 L 9 18 L 17 18 L 17 17 L 9 17 Z" fill="currentColor"></path>
                                                </svg>
                                            </i>
                                        </button>

                                        {/* share */}
                                        <button className="btn-round" onClick={() => window.open('https://www.facebook.com', '_blank')}>
                                            <i icon="share" className="svg-icon svg-icon-share">
                                                <svg id="share" viewBox="0 0 26 26" width="26" height="26">
                                                    <title>share</title>
                                                    <path d="M18.5,2.5v4s-5,0-5,3v2h5v3h-5v9h-4v-9h-4v-3h4V9C9.5,2.64,18.5,2.5,18.5,2.5Z" fill="none" stroke="currentColor" strokeMiterlimit="10"></path>
                                                </svg>
                                            </i>
                                        </button>

                                        {/* email */}
                                        <button className="btn-round" onClick={() => window.location.href = "mailto:suppport@fischer.com"}>
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
                                }

                                {/* loading & saving */}
                                {this.state.page === 'home' ?
                                    <button className="btn-iconed btn" onClick={() => this.setState({ load_save: !load_save })}>
                                        <i className="icon-24 icon-left svg-icon svg-icon-saveload" icon="saveload">
                                            <svg id="saveload" viewBox="0 0 24 24" width="24" height="24">
                                                <path d="M6.24,2H0V17.18L3,6H19.32L18.24,3.9H7.2ZM24,8H4.32L0,22H11V14.86L8.2,17.71,7,16.46l5-5.08,5,5.06-1.15,1.28L13,14.86V22h6.68Z" fill="currentColor"></path>
                                            </svg>
                                        </i>
                                        <span>Loading / saving</span>
                                    </button> :
                                    <button className="btn-iconed btn">
                                        <i className="icon-left svg-icon svg-icon-cart" icon="cart">
                                            <svg id="cart" viewBox="0 0 22 20" width="22" height="20">
                                                <path d="M 10.3263 12 L 8 12 L 7.385 10 L 10.195 10 L 10.3263 12 ZM 13.6737 12 L 11.3263 12 L 11.195 10 L 13.805 10 L 13.6737 12 ZM 17.525 10 L 17 12 L 14.6737 12 L 14.805 10 L 17.525 10 ZM 15 7 L 18.3131 7 L 17.79 9 L 14.87 9 L 15 7 ZM 11 7 L 14 7 L 13.87 9 L 11.13 9 L 11 7 ZM 6.461 7 L 10 7 L 10.13 9 L 7.075 9 L 6.461 7 ZM 1 3 L 1 4 L 4.2188 4 L 7 13 L 18 13 L 20 6 L 6.205 6 L 5 3 L 1 3 ZM 15 16 C 15 15.4477 15.4477 15 16 15 C 16.5523 15 17 15.4477 17 16 C 17 16.5523 16.5523 17 16 17 C 15.4477 17 15 16.5523 15 16 ZM 14 16 C 14 17.1046 14.8954 18 16 18 C 17.1046 18 18 17.1046 18 16 C 18 14.8954 17.1046 14 16 14 C 14.8954 14 14 14.8954 14 16 ZM 8 16 C 8 15.4477 8.4477 15 9 15 C 9.5523 15 10 15.4477 10 16 C 10 16.5523 9.5523 17 9 17 C 8.4477 17 8 16.5523 8 16 ZM 7 16 C 7 17.1046 7.8954 18 9 18 C 10.1046 18 11 17.1046 11 16 C 11 14.8954 10.1046 14 9 14 C 7.8954 14 7 14.8954 7 16 Z"></path>
                                            </svg>
                                        </i>
                                        <span>Checkout</span>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>

                    {/* load/save modal */}
                    <div className={`summary-modal ${load_save ? 'd-block' : 'd-none'}`}>
                        <div className="summary-header-modal">
                            <div className="summary-header-modal-content p-3">
                                <div className="d-flex justify-content-between">
                                    <h3>Load / save</h3>
                                    <AiOutlineCloseCircle className="nav-icon mr-0" style={{ color: '#777' }} onClick={() => this.setState({ load_save: false })} />
                                </div>
                                <div>
                                    <p className="mb-5">
                                        Have you have already configured your desired rings in the configurator and would like to load them again? Then start here with the existing wedding ring ID.
                                    </p>
                                    <div>
                                        <label>Save</label>
                                        <div className="d-flex mb-5">
                                            <input
                                                className="form-control text-center input-box w-75"
                                                placeholder="Name for your configuration"
                                                value={this.state.save_name}
                                                onChange={e => this.setState({ save_name: e.target.value })}
                                            ></input>
                                            <button className="form-control button-box w-25" onClick={this.save}>Save configuration</button>
                                        </div>
                                        {savedFiles.length > 0 &&
                                            <>
                                                <label>Load</label>
                                                <div className="saved-panel mb-5">
                                                    {savedFiles}
                                                </div>
                                            </>
                                        }
                                        <label>Load wedding ring ID</label>
                                        <div className="d-flex mb-4">
                                            <input
                                                className="form-control text-center input-box w-75"
                                                placeholder="Your wedding ring ID"
                                                value={this.state.load_name}
                                                onChange={e => this.setState({ load_name: e.target.value })}
                                            ></input>
                                            <button className="form-control button-box w-25" onClick={() => this.load(this.state.load_name)}>Load configuration</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        )
    }
}

SummaryHeader.propTypes = {
    ui: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    loadFile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ ui: state.ui, data: state.data });
const mapActionsToProps = { loadFile };

export default connect(mapStateToProps, mapActionsToProps)(SummaryHeader);
