import React, { Component } from 'react';

import logo from '../assets/img/logo.svg';
import { FaAlignJustify, ImStarEmpty, ImStarFull } from 'react-icons/all';
import { Link } from 'react-router-dom';

class Header extends Component {
    state = {
        isOpen: false,
        star: true,
    };

    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    };

    handleStar = () => {
        this.setState({ star: !this.state.star })
    }

    render() {
        return (
            <section className="header">
                <nav className="navbar">
                    <div className="nav-center">
                        <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/configurator">Configurator</Link></li>
                            <li><Link to="/localjewellers">Local Jewellers</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                </nav>
                <nav className="logo-header">
                    <div className="nav-center">
                        <div className="nav-header">
                            <button type="button" className="nav-btn" onClick={this.handleToggle}>
                                <FaAlignJustify className="nav-icon" />
                            </button>

                            <Link to="/">
                                <img src={logo} alt="logo"></img>
                            </Link>

                            {this.state.star ?
                                <button type="button" className="nav-btn" onClick={this.handleStar}>
                                    <ImStarEmpty className="nav-icon" />
                                </button>
                                : <button type="button" className="nav-btn" onClick={this.handleStar}>
                                    <ImStarFull className="nav-icon" />
                                </button>
                            }
                        </div>
                    </div>
                </nav>
            </section>
        );
    }
}

export default Header;
