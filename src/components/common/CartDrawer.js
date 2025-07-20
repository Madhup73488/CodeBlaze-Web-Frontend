import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import "./CartDrawer.css";
import codeblazeLogoOrange from "../../assets/images/codeblazelogoorange.png";
import CartDrawerSkeleton from "./CartDrawerSkeleton";

const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    isCartOpen,
    closeCart,
    setCheckoutInitiated,
  } = useCart();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerLoading, setDrawerLoading] = useState(true);

  useEffect(() => {
    if (isCartOpen) {
      setDrawerLoading(true);
      const timer = setTimeout(() => {
        setDrawerLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setCheckoutInitiated(true);
      openAuthModal();
      return;
    }
    setIsLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const orderResponse = await fetch(`${apiUrl}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total * 100, // Amount in paise
          currency: "INR",
          receipt: `receipt_cart_${Date.now()}`,
          notes: {
            items: cart.map((item) => item.title).join(", "),
          },
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const order = await orderResponse.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "CodeBlaze",
        description: "Course Enrollment",
        image: codeblazeLogoOrange,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verificationResponse = await fetch(
              `${apiUrl}/api/payment/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            if (verificationResponse.ok) {
              clearCart();
              closeCart();
              // You can redirect to a success page here
            } else {
              console.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Error during payment verification:", error);
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        notes: {
          address: "CodeBlaze Technologies",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button onClick={closeCart}>
            <X size={24} />
          </button>
        </div>
        {isDrawerLoading ? (
          <CartDrawerSkeleton />
        ) : (
          <div className="cart-drawer-body">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p>
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
        <div className="cart-drawer-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full"
            disabled={isLoading || cart.length === 0}
          >
            {isLoading ? "Processing..." : "Checkout"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
