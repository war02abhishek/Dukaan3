// ShopCard.js (Card Component)
import React from 'react';
import PropTypes from 'prop-types';

const ShopreqCard = ({ shop }) => {
    return (
        <div className="shop-card">
            <h2 className="shop-name">{shop.shopName}</h2>
            <p className="shop-address">{shop.address}</p>
            <p className="shop-owner">{shop.ownerName}</p>
            <p className="shop-email">{shop.email}</p>
            <p className="shop-license">{shop.shopLiscNo}</p>
            <p className="shop-location">
                Location: {shop.location.coordinates[0]}, {shop.location.coordinates[1]}
            </p>
        </div>
    );
};

ShopreqCard.propTypes = {
    shop: PropTypes.shape({
        shopName: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        ownerName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        shopLiscNo: PropTypes.string.isRequired,
        location: PropTypes.shape({
            type: PropTypes.string.isRequired,
            coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
        }).isRequired,
    }).isRequired,
};

export default ShopreqCard;
