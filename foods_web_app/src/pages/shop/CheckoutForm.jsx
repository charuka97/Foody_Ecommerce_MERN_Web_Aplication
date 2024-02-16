import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { FaPaypal } from "react-icons/fa";
import useAuth from "./../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ totalPrice, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof totalPrice !== "number" || totalPrice < 1) {
      console.log("Price is not a number or less than 1");
      return;
    }
    // Create PaymentIntent as soon as the page loads
    axiosSecure.post("/create-payment-intent", { totalPrice }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [totalPrice, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("Payment Success!");
      //   console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || "Anonymous User",
            email: user?.email || "Unknown User",
          },
        },
      });

    if (confirmError) {
      alert(confirmError);
    }
    if (paymentIntent.status === "succeeded") {
      setCardError(`Your transaction Id is ${paymentIntent.id}`);

      const paymentInfo = {
        email: user.email,
        transactionId: paymentIntent.id,
        price: totalPrice,
        quantity: cart.length,
        status: "order pending",
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };

      //send payment information to the backend
      useAxiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        alert("Payment Successful!");
        navigate("/order");
      });
    }
  };
  return (
    <div className="flex flex-col items-start justify-start gap-8 sm:flex-row">
      {/* left side */}
      <div className="w-full space-y-3 md:w-1/2">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ${totalPrice}</p>
        <p>Number of Items: {cart.length}</p>
      </div>
      {/* right side */}
      <div className="w-full max-w-sm px-4 py-8 space-y-6 shadow-2xl md:w-1/3 card shrink-0 bg-base-100">
        <h4 className="text-lg font-semibold">Process Your Payment!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
        {/* React strip form from react stripe git repo */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div className="text-center">
            <button
              type="submit"
              disabled={!stripe}
              className="w-full mt-5 text-white btn btn-sm bg-primary"
            >
              Pay
            </button>
          </div>
        </form>

        {cardError ? (
          <p className="italic text-md text-red">{cardError}</p>
        ) : (
          ""
        )}

        <div className="mt-5 text-center">
          <hr />
          <button type="submit" className="mt-5 text-white btn btn-sm bg-green">
            <FaPaypal /> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
