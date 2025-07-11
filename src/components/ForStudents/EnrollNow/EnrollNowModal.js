import React, { useState } from 'react';
import './EnrollNowModal.css';
import CloseConsent from './CloseConsent';
import EnrollmentSuccess from './EnrollmentSuccess';
import codeblazeLogoOrange from '../../../assets/images/codeblazelogoorange.png';

const EnrollNowModal = ({ internship, onClose, onSubmit, theme }) => {
  const [showConsent, setShowConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    const formData = {
      name: e.target.fullName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      course: internship.title,
      college: e.target.college.value,
    };

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const orderResponse = await fetch(`${apiUrl}/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(internship.fees.replace(/[^0-9]/g, '')) * 100, // Amount in paise
          currency: 'INR',
          receipt: `receipt_enroll_${Date.now()}`,
          notes: {
            course: internship.title,
            name: formData.name,
            email: formData.email,
          },
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create Razorpay order');
      }

      const order = await orderResponse.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'CodeBlaze',
        description: `Enrollment for ${internship.title}`,
        image: codeblazeLogoOrange,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verificationResponse = await fetch(`${apiUrl}/api/payment/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verificationResponse.ok) {
              // Payment is successful, now save the enrollment
              const enrollmentResponse = await fetch(`${apiUrl}/api/enrollment`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });

              if (enrollmentResponse.ok) {
                setIsSubmitted(true);
              } else {
                console.error('Failed to save enrollment after payment');
              }
            } else {
              console.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Error during payment verification or enrollment:', error);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: 'CodeBlaze Technologies',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error:', error);
    } finally {
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
              <button className="close-button" onClick={handleCloseClick}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="internship">Internship</label>
                  <input type="text" id="internship" value={internship.title} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone No</label>
                  <input type="tel" id="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Id</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="college">College Name</label>
                  <input type="text" id="college" required />
                </div>
                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? <div className="loader"></div> : 'Continue to Payment'}
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
