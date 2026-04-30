import axios from 'axios'
import OrderSummary from './OrderSummary'
import PaymentSummary from './PaymentSummary'
import { useState, useEffect } from 'react'
import CheckoutHeader from './CheckoutHeader'

import './CheckoutPage.css'


function CheckoutPage({ cart, loadCart }) {

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get('https://react-backend-eb45.onrender.com/api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOptions(response.data)


      response = await axios.get('https://react-backend-eb45.onrender.com/api/payment-summary')
      setPaymentSummary(response.data)
    }

    fetchCheckoutData()
  }, [])

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await axios.get('https://react-backend-eb45.onrender.com/api/payment-summary')
      setPaymentSummary(response.data)
    }

    fetchCheckoutData()
  }, [cart])

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />


      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid" data-testId="checkout-container">

          <OrderSummary cart={cart} loadCart={loadCart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  )
}

export default CheckoutPage
