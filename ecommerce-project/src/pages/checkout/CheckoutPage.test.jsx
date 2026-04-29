import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, it, vi } from "vitest";
import axios from "axios";
import CheckoutPage from "./CheckoutPage";

vi.mock('axios')

describe('Checkout page', () => {
  let loadCart;
  let cart;
  beforeEach(() => {
    loadCart = vi.fn()
    axios.get.mockImplementation((urlPath) => {
      if (urlPath === '/api/cart-items') {
        return {
          data: [
            {
              productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              quantity: 2,
              deliveryOptionId: "1"
            },
            {
              productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity: 1,
              deliveryOptionId: "2"
            }
          ]
        }
      }
    })
    cart = [

    ]
    render(
      <MemoryRouter>
        <CheckoutPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>
    )
  })

  it('Displays checkout page correct', () => {
    // checkoutContainer = screen.getByTestId("checkout-container")

    // expect(cart.length).toBe(2);

  })
})