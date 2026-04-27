import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import PaymentSummary from "./PaymentSummary";
import userEvent from "@testing-library/user-event";

vi.mock('axios')

describe('Payment component', () => {
  let paymentSummary;
  let loadCart;
  let user;
  beforeEach(() => {
    loadCart = vi.fn()
    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251
    };

    user = userEvent.setup()
  });


  it('tests for dollar amounts', () => {

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    )

    expect(
      screen.getByText('Items (3):')
    ).toBeInTheDocument();

    expect(
      within(
        screen.getByTestId("payment-summary-product-cost")
      ).getByText('$42.75')
    ).toBeInTheDocument()

    expect(
      within(
        screen.getByTestId("payment-summary-shipping-cost")
      ).getByText('$4.99')
    ).toBeInTheDocument()

    expect(
      within(
        screen.getByTestId("payment-summary-total-cost-before-tax")
      ).getByText('$47.74')
    ).toBeInTheDocument()

    expect(
      within(
        screen.getByTestId("payment-summary-tax")
      ).getByText('$4.77')
    ).toBeInTheDocument()

    expect(
      within(
        screen.getByTestId("payment-summary-total-cost")
      ).getByText('$52.51')
    ).toBeInTheDocument()

    expect(
      screen.getByTestId("payment-summary-product-cost")
    ).toHaveTextContent('$42.75')

  })

  it('Click place order', async () => {

    function Location() {

      const location = useLocation()

      return (
        <div data-testId="url-path">{location.pathname}</div>
      )
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} /> <Location />
      </MemoryRouter>
    )

    const placeOrderButton = screen.getByTestId("place-order-button");
    await user.click(placeOrderButton);



    expect(axios.post).toHaveBeenCalledWith('/api/orders')
    // expect(axios.post).toHaveBeenCalled('/api/cart-items')
    expect(loadCart).toHaveBeenCalled()

    expect(
      screen.getByTestId("url-path")
    ).toHaveTextContent('/orders')
  })
})