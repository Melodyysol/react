import axios from 'axios'
import { NavLink } from 'react-router'
import { useState, useEffect } from 'react'

import Header from '../components/Header'

import './TrackingPage.css'



function TrackingPage({ cart }) {

  const [tracking, setTracking] = useState([])

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get('/api/tracking')
      setTracking(response.data)
    }

    fetchTrackingData()
  })

  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />


      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <NavLink className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </NavLink>

          <div className="delivery-date">
            Arriving on Monday, June 13
          </div>

          <div className="product-info">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>

          <div className="product-info">
            Quantity: 1
          </div>

          <img className="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrackingPage
