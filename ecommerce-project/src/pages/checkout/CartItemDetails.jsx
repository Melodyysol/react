import axios from "axios"
import { Fragment, useState } from "react"
import { formatMoney } from "../../utils/money"


function CartItemDetails({ cartItem, loadCart }) {

  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity)

  const deleteCartItem = async () => {
    await axios.delete(`https://react-backend-eb45.onrender.com/api/cart-items/${cartItem.productId}`)
    await loadCart()
  }

  const updateCartQuantity = async () => {
    if (isUpdatingQuantity) {
      await axios.put(`https://react-backend-eb45.onrender.com/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity)
      })
      await loadCart()
      setIsUpdatingQuantity(false)
    } else {
      setIsUpdatingQuantity(true)
    }
  }

  const handleChange = (e) => {
    setQuantity(e.target.value)
  }

  const handleQuantityKeyDown = (e) => {
    if (e.key === 'Enter') {
      updateCartQuantity()
    } else if (e.key === 'Escape') {
      setQuantity(cartItem.quantity)
      setIsUpdatingQuantity(false)
    }
  }

  return (
    <Fragment>
      <img className="product-image"
        src={cartItem.product.image} data-testId="product-image" />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {isUpdatingQuantity
              ? <input className="input-quantity" type="text"
                value={quantity}
                onKeyDown={handleQuantityKeyDown}
                onChange={handleChange} data-testId="input-quantity" />
              : <span className="quantity-label">{quantity}</span>}
          </span>
          <span className="update-quantity-link link-primary"
            onClick={updateCartQuantity} data-testId="update-quantity-link">
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem} data-testId="delete-quantity-link">
            Delete
          </span>
        </div>
      </div>
    </Fragment>
  )
}

export default CartItemDetails
