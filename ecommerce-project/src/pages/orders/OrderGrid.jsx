import { NavLink } from 'react-router'

import OrderHead from "./OrderHead"

import OrderDetailsGrid from "./OrderDetailsGrid"

function OrderGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">

            <OrderHead order={order} />

            <OrderDetailsGrid order={order} />
          </div>
        )
      })}
    </div>
  )
}

export default OrderGrid
