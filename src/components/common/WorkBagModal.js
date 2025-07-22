import React, { useState, useEffect } from "react";
import { useWorkBag } from "../../contexts/WorkBagContext";
import { useAuth } from "../../contexts/AuthContext";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import "./WorkBagModal.css";
import codeblazeLogoOrange from "../../assets/images/codeblazelogoorange.png";
import CartDrawerSkeleton from "./CartDrawerSkeleton";
import EnrollNowModal from "../ForStudents/EnrollNow/EnrollNowModal";
const WorkBagModal = () => {
  const {
    workBag,
    removeFromWorkBag,
    clearWorkBag,
    isWorkBagOpen,
    closeWorkBag,
    setCheckoutInitiated,
  } = useWorkBag();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerLoading, setDrawerLoading] = useState(true);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    if (isWorkBagOpen) {
      setDrawerLoading(true);
      const timer = setTimeout(() => {
        setDrawerLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isWorkBagOpen]);

  const total = workBag.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setCheckoutInitiated(true);
      openAuthModal();
      return;
    }
    // For now, let's assume the first item in the cart is the one to enroll in
    if (workBag.length > 0) {
      setSelectedInternship(workBag[0]);
      setIsEnrollmentModalOpen(true);
    }
  };

  if (!isWorkBagOpen) {
    return null;
  }

  return (
    <>
      {isEnrollmentModalOpen && selectedInternship && (
        <EnrollNowModal
          internship={selectedInternship}
          onClose={() => setIsEnrollmentModalOpen(false)}
        />
      )}
      <div className="work-bag-modal-overlay" onClick={closeWorkBag}>
        <div className="work-bag-modal" onClick={(e) => e.stopPropagation()}>
          <div className="work-bag-modal-header">
            <h2>Your Work Bag</h2>
            <button onClick={closeWorkBag}>
              <X size={24} />
            </button>
          </div>
          {isDrawerLoading ? (
            <CartDrawerSkeleton />
          ) : (
            <div className="cart-drawer-body">
              {workBag.length === 0 ? (
                <p>Your work bag is empty.</p>
              ) : (
                workBag.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <div className="cart-item-details">
                      <h3>{item.title}</h3>
                      <p>
                        ₹{item.price} x {item.quantity}
                      </p>
                    </div>
                    <button onClick={() => removeFromWorkBag(item.id)}>
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
              disabled={isLoading || workBag.length === 0}
            >
              {isLoading ? "Processing..." : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkBagModal;
