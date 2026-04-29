import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DeliveryOptions from "./DeliveryOptions";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock('axios')

describe('Delivery options', () => {
  let loadCart;
  let cartItem;
  let deliveryOptions;
  let user;

  beforeEach(() => {
    loadCart = vi.fn()
    deliveryOptions = [
      {
        id: "1",
        deliveryDays: 7,
        priceCents: 0
      },{
        id: "2",
        deliveryDays: 3,
        priceCents: 499
      },{
        id: "3",
        deliveryDays: 1,
        priceCents: 999
      }
    ]
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

    user = userEvent.setup()

    render(
      <MemoryRouter>
        <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
      </MemoryRouter>
    )

  })

  it('Displays delivery options correct', async () => {
    const deliveryOptionContainer = await screen.findAllByTestId("delivery-option-container");
    expect(
      within(deliveryOptionContainer[0]).getByText("FREE Shipping")
    ).toBeInTheDocument()
    expect(
      within(deliveryOptionContainer[1]).getByText("$4.99 - Shipping")
    ).toBeInTheDocument()
    expect(
      within(deliveryOptionContainer[2]).getByText("$9.99 - Shipping")
    ).toBeInTheDocument()
  })

  it('update the delivery options', async () => {
    const deliveryOptionContainer = await screen.findAllByTestId("delivery-option-container");

    await user.click(deliveryOptionContainer[0]);

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(loadCart).toHaveBeenCalled();

    expect(axios.put).toHaveBeenCalledWith('/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6', {
      deliveryOptionId: "1"
    });

    await user.click(deliveryOptionContainer[1])
    expect(axios.put).toHaveBeenCalledWith('/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6', {
      deliveryOptionId: "2"
    });
  })
})