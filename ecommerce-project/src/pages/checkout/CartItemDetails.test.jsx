import axios from "axios";
import userEvent from "@testing-library/user-event";

import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import CartItemDetails from "./CartItemDetails";

vi.mock('axios')

describe('cart item details', () => {
  let loadCart;
  let cartItem;
  let user;
  beforeEach(() => {
    cartItem = {
      id: 5,
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
      createdAt: "2026-04-28T06:56:08.612Z",
      updatedAt: "2026-04-28T06:56:09.624Z",
      product: {
        keywords: [
          "socks",
          "sports",
          "apparel"
        ],
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        priceCents: 1090,
        createdAt: "2026-04-26T13:31:03.766Z",
        updatedAt: "2026-04-26T13:31:03.766Z"
      }
    }
    loadCart = vi.fn()

    render(
      <MemoryRouter>
        <CartItemDetails cartItem={cartItem} loadCart={loadCart} />
      </MemoryRouter>
    )

    user = userEvent.setup()
  })

  it('Displays the cart correct', () => {

    expect(
      screen.getByTestId("product-image")
    ).toHaveAttribute('src', "images/products/athletic-cotton-socks-6-pairs.jpg");

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument()

    expect(
      screen.getByText("$10.90")
    ).toBeInTheDocument()
  })

  it('Deletes the cart item', async () => {

    const deleteLink = screen.getByTestId("delete-quantity-link");
    await user.click(deleteLink);

    expect(axios.delete).toHaveBeenCalledTimes(1)
    expect(loadCart).toHaveBeenCalled()
  });

  it('Updates the cart item', async () => {

    const updateLink = screen.getByTestId("update-quantity-link");
    await user.click(updateLink);
    const inputQuantity = screen.getByTestId("input-quantity")
    expect(
      inputQuantity
    ).toHaveAttribute('value', '2');

    await user.click(updateLink);

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith('/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6', {
      quantity: 2
    });

    expect(loadCart).toHaveBeenCalled();
  });
})