import axios from "axios";
import dayjs from "dayjs";

import { Fragment } from "react";
import { NavLink } from "react-router";

import buyAgainIcon from '../../assets/icons/buy-again.png'

function OrderDetailsGrid({ order, loadCart }) {

  return (
    <div key={order.id} className="order-details-grid">
      {order.products.map((orderProduct) => {
        const addToCart = async () => {
          await axios.post('https://react-backend-eb45.onrender.com/api/cart-items', {
            productId: orderProduct.product.id,
            quantity: 1
          })
          await loadCart()
        }

        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src={buyAgainIcon} />
                <span className="buy-again-message"
                  onClick={addToCart}>
                  Add to Cart
                </span>
              </button>
            </div>

            <div className="product-actions">
              <NavLink to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </NavLink>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}

export default OrderDetailsGrid
