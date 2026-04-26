import { NavLink } from 'react-router'

import OrderHead from "./OrderHead"

import OrderDetailsGrid from "./OrderDetailsGrid"

function OrderGrid({ orders, loadCart }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">

            <OrderHead order={order} />

            <OrderDetailsGrid loadCart={loadCart} order={order} />
          </div>
        )
      })}
    </div>
  )
}

export default OrderGrid
