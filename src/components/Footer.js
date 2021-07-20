import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {

    constructor() {
        super();
        this.state = {
            page: 'home'
        }
    }

    componentDidMount() {
        if (window.location.pathname === '/order') {
            this.setState({ page: 'order' });
        }
    }

    render() {
        const { page } = this.state;

        return (
            <div className={`${page === 'home' ? 'footer' : 'footer-fixed'}`}>
                <div className="col-xl-10 offset-xl-1">
                    <a>Jeweller access</a>
                    <div>
                        <Link to="/privacypolicy">Privacy Policy</Link>
                        <Link to="/impress">Impress</Link>
                    </div>
                </div>
            </div>
        );
    }
}
