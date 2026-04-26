import axios from 'axios'

import { useEffect, useState } from 'react'

import OrderGrid from './OrderGrid'
import Header from '../../components/Header'


import './OrdersPage.css'

function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get('/api/orders?expand=products')
      setOrders(response.data)
    }

    fetchOrderData()
  }, [])

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />


      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrderGrid orders={orders} loadCart={loadCart} />
      </div>

    </>
  )
}

export default OrdersPage
