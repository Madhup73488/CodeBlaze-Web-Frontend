import React from 'react';

const ShippingAndDeliveryPolicy = ({ theme = 'light' }) => {
  const styles = {
    light: {
      backgroundColor: '#ffffff',
      color: '#111827',
      headingColor: '#1f2937',
      borderColor: '#e5e7eb',
    },
    dark: {
      backgroundColor: '#1f2937',
      color: '#e0e0e0',
      headingColor: '#f9fafb',
      borderColor: '#374151',
    },
  };

  const currentStyle = styles[theme];

  return (
    <div style={{ padding: '2rem', backgroundColor: currentStyle.backgroundColor, color: currentStyle.color }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: currentStyle.headingColor, borderBottom: `2px solid ${currentStyle.borderColor}`, paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          Shipping and Delivery Policy
        </h1>
        
        <p><strong>Last Updated: 07 July 2025</strong></p>

        <h2 style={{ color: currentStyle.headingColor, marginTop: '2rem' }}>1. Service Delivery</h2>
        <p>
          All our services are delivered digitally. Upon successful payment, you will receive an email confirmation with the details of your purchase and instructions on how to access the service.
        </p>
        <p>
          For subscription-based services, access will be granted immediately after payment confirmation and will continue for the duration of the subscription period.
        </p>

        <h2 style={{ color: currentStyle.headingColor, marginTop: '2rem' }}>2. Delivery Timeframes</h2>
        <p>
          Digital services are delivered almost instantaneously. You should receive access to your purchased service within 15-30 minutes of a successful transaction.
        </p>
        <p>
          If you do not receive your access details within this timeframe, please check your spam or junk folder before contacting our support team.
        </p>

        <h2 style={{ color: currentStyle.headingColor, marginTop: '2rem' }}>3. Contact Us</h2>
        <p>
          If you have any questions about our Shipping and Delivery Policy, please contact us at:
          <br />
          Email: codeblazee@gmail.com
          <br />
          Phone: +91 99453 90672
        </p>
      </div>
    </div>
  );
};

export default ShippingAndDeliveryPolicy;
