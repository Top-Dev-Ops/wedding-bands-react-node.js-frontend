import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';

class PriceOrderContainer extends Component {

    render() {
        const { ring_1_disabled, ring_2_disabled, ring_1_price, ring_2_price } = this.props.data;
        let price = ring_1_disabled ? 0 : ring_1_price;
        price += ring_2_disabled ? 0 : ring_2_price;
        price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return (
            <section className="price-order-container">
                <div className="price-order-row">
                    <div className="col-4">
                        <span className="price-panel-text">Pair price</span>
                        <span className="price-panel-price">{price},- €</span>
                        <span className="price-panel-taxinfo">incl. VAT</span>
                    </div>
                    <div className="col-3 text-right my-auto">
                        <Link to="/order">
                            <button className="btn btn-iconed" type="button">
                                <i className="icon-left svg-icon svg-icon-cart" icon="cart">
                                    <svg id="cart" viewBox="0 0 22 20" width="22" height="20">
                                        <path d="M 10.3263 12 L 8 12 L 7.385 10 L 10.195 10 L 10.3263 12 ZM 13.6737 12 L 11.3263 12 L 11.195 10 L 13.805 10 L 13.6737 12 ZM 17.525 10 L 17 12 L 14.6737 12 L 14.805 10 L 17.525 10 ZM 15 7 L 18.3131 7 L 17.79 9 L 14.87 9 L 15 7 ZM 11 7 L 14 7 L 13.87 9 L 11.13 9 L 11 7 ZM 6.461 7 L 10 7 L 10.13 9 L 7.075 9 L 6.461 7 ZM 1 3 L 1 4 L 4.2188 4 L 7 13 L 18 13 L 20 6 L 6.205 6 L 5 3 L 1 3 ZM 15 16 C 15 15.4477 15.4477 15 16 15 C 16.5523 15 17 15.4477 17 16 C 17 16.5523 16.5523 17 16 17 C 15.4477 17 15 16.5523 15 16 ZM 14 16 C 14 17.1046 14.8954 18 16 18 C 17.1046 18 18 17.1046 18 16 C 18 14.8954 17.1046 14 16 14 C 14.8954 14 14 14.8954 14 16 ZM 8 16 C 8 15.4477 8.4477 15 9 15 C 9.5523 15 10 15.4477 10 16 C 10 16.5523 9.5523 17 9 17 C 8.4477 17 8 16.5523 8 16 ZM 7 16 C 7 17.1046 7.8954 18 9 18 C 10.1046 18 11 17.1046 11 16 C 11 14.8954 10.1046 14 9 14 C 7.8954 14 7 14.8954 7 16 Z"></path>
                                    </svg>
                                </i>
                                <span>Order</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}

PriceOrderContainer.propTypes = {
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ data: state.data });

export default connect(mapStateToProps)(PriceOrderContainer);