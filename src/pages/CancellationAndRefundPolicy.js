import React from 'react';

const CancellationAndRefundPolicy = ({ theme = 'light' }) => {
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
          Cancellation and Refund Policy
        </h1>
        
        <p><strong>Last Updated: 07 July 2025</strong></p>

        <h2 style={{ color: currentStyle.headingColor, marginTop: '2rem' }}>1. Cancellation Policy</h2>
        <p>
          You may cancel your service subscription at any time. To cancel, please contact our support team at support@codeblaze.net.
          Cancellations will take effect at the end of your current billing cycle. You will continue to have access to the service until the end of the billing period.
        </p>

        <h2 style={{ color: currentStyle.headingColor, marginTop: '2rem' }}>2. Refund Policy</h2>
        <p>
          We offer a 7-day money-back guarantee for new customers. If you are not satisfied with our service, you may request a full refund within 7 days of your initial purchase.
        </p>
        <p>
          To request a refund, please contact our support team with your purchase details. Refunds will be processed within 5-7 business days to the original method of payment.
        </p>
        <p>
          After the 7-day period, we do not offer refunds for partially used subscription periods or for cancellations made after the billing cycle has started.
        </p>

        <h2 style={{ color: currentStyle.headingColor, marginTop: '2rem' }}>3. Exceptions</h2>
        <p>
          In certain cases, such as a service outage or a significant failure to provide the service as described, we may offer a partial or full refund at our discretion.
        </p>

        <h2 style={{ color: currentStyle.headingColor, marginTop: '2rem' }}>4. Contact Us</h2>
        <p>
          If you have any questions about our Cancellation and Refund Policy, please contact us at:
          <br />
          Email: codeblazee@gmail.com
          <br />
          Phone: +91 7348878479
        </p>
      </div>
    </div>
  );
};

export default CancellationAndRefundPolicy;
