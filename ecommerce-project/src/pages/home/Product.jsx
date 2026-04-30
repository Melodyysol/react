import axios from "axios";

import { useState } from "react";

import { formatMoney } from "../../utils/money";

import checkmarkIcon from '../../assets/icons/checkmark.png'

function Product({ product, loadCart }) {

  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const addToCart = async () => {
    await axios.post('https://react-backend-eb45.onrender.com/api/cart-items', {
      productId: product.id,
      quantity
    })
    await loadCart()
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false)
    }, 2000);
  }

  const selectQuantity = e => {
    setQuantity(Number(e.target.value));
    console.log(Number(e.target.value));
  }


  return (
    <div className="product-container"
      data-testId="product-container">
      <div className="product-image-container">
        <img className="product-image"
          data-testId="product-image"
          src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img className="product-rating-stars"
          data-testId="product-rating-stars-image"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}
        data-testId="quantity-selector">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ opacity: isAdded ? 1 : 0 }}>
        <img src={checkmarkIcon} />
        Added
      </div>

      <button className="add-to-cart-button button-primary"
        data-testId="add-to-cart-button"
        onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  )
}

export default Product
