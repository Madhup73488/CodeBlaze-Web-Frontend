import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useWorkBag } from "../../../contexts/WorkBagContext";
import "./EnrollNowModal.css";
import CloseConsent from "./CloseConsent";
import EnrollmentSuccess from "./EnrollmentSuccess";
import codeblazeLogoOrange from "../../../assets/images/codeblazelogoorange.png";

const EnrollNowModal = ({ internship, onClose, theme }) => {
  const { user } = useAuth();
  const { clearWorkBag } = useWorkBag();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    college: user?.college || "",
  });
  const [showConsent, setShowConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(`${apiUrl}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setFormData((prev) => ({
              ...prev,
              name: userData.user.name,
              email: userData.user.email,
              phone: userData.user.phone,
              college: userData.user.college,
            }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleCloseClick = () => {
    setShowConsent(true);
  };

  const handleConfirmClose = () => {
    setShowConsent(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowConsent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedFormData = {
      name: e.target.fullName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      course: internship.title,
      college: e.target.college.value,
      userId: user?.id,
    };

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const token = localStorage.getItem("token");

      if (token) {
        await fetch(`${apiUrl}/api/users/me`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone: updatedFormData.phone,
            college: updatedFormData.college,
          }),
        });
      }

      const orderResponse = await fetch(`${apiUrl}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseInt(internship.fees.replace(/[^0-9]/g, "")) * 100,
          currency: "INR",
          receipt: `receipt_enroll_${Date.now()}`,
          notes: {
            course: internship.title,
            name: updatedFormData.name,
            email: updatedFormData.email,
            userId: updatedFormData.userId,
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
        description: `Enrollment for ${internship.title}`,
        order_id: order.id,
        handler: function (response) {
          // This function will be called after the payment is successful.
          // We will show the success message and clear the workbag.
          setIsSubmitted(true);
          clearWorkBag();
        },
        modal: {
          ondismiss: function () {
            // This function is called when the user closes the modal without completing the payment.
            // We can choose to do nothing or show a message.
            setIsLoading(false);
            console.log("Checkout form closed");
          },
        },
        prefill: {
          name: updatedFormData.name,
          email: updatedFormData.email,
          contact: updatedFormData.phone,
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
      console.error("Error in handleSubmit:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className={`modal-overlay ${theme}`}>
      <div className="modal-content">
        {isSubmitted ? (
          <EnrollmentSuccess onClose={onClose} />
        ) : (
          <>
            <div className="modal-header">
              <h2>Enroll for Internship</h2>
              <button className="close-button" onClick={handleCloseClick}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="internship">Internship</label>
                  <input
                    type="text"
                    id="internship"
                    value={internship.title}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    defaultValue={formData.name}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone No</label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue={formData.phone}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Id</label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={formData.email}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="college">College Name</label>
                  <input
                    type="text"
                    id="college"
                    defaultValue={formData.college}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loader"></div>
                  ) : (
                    "Continue to Payment"
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      {showConsent && (
        <CloseConsent
          onConfirm={handleConfirmClose}
          onCancel={handleCancelClose}
          theme={theme}
        />
      )}
    </div>
  );
};

export default EnrollNowModal;
