import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, it } from "vitest";
import PaymentSummary from "./PaymentSummary";

describe('Payment component', () => {
  let sample;
  beforeEach(() => {
    sample = {
      "totalItems": 0,
      "productCostCents": 0,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 0,
      "taxCents": 0,
      "totalCostCents": 0
    }
  });


  it('tests for dollar amounts', () => {
    render(
      <MemoryRouter>
        <PaymentSummary />
      </MemoryRouter>
    )


  })
})