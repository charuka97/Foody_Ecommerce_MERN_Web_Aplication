import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
  const [cart] = useCart();

  //Calculate the checkout price
  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    cartTotal += cart[i].price;
  }
  // const cartTotal = cart.reduce((sum, item) => {
  //   sum + item.price, 0;
  // });

  const totalPrice = parseFloat(cartTotal.toFixed(2));

  return (
    <div className="container px-4 mx-auto max-w-screen-2xl xl:px-24 py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
};

export default Payment;
