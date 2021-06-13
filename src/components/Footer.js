import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
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
