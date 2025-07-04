import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import adminApi from '../admin/utils/api'; // Path to admin API utils
import { QRCodeSVG } from 'qrcode.react';
import companyLogo from '../assets/images/codeblazelogoorange.png'; // Adjust path as needed

const CertificateVerificationPage = ({ theme = 'light' }) => { // Assuming theme might be passed or from a context
  const { certificateId } = useParams();
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!certificateId) {
        setError("No Certificate ID provided.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Use the verifyCertificatePublic function from adminApi
        const response = await adminApi.verifyCertificatePublic(certificateId);
        if (response && response.success) { // Assuming backend returns { success: true, data: ... }
          setCertificateData(response.data);
        } else {
          setError(response?.message || "Certificate not found or invalid ID.");
        }
      } catch (err) {
        setError(err.message || "Failed to verify certificate.");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [certificateId]);

  const isDark = theme === 'dark'; // For potential dark theme styling
  const containerClasses = isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700';
  const cardClasses = isDark ? 'bg-gray-700' : 'bg-white';

  if (loading) {
    return <div className={`flex justify-center items-center min-h-screen ${containerClasses}`}>Loading certificate details...</div>;
  }

  if (error) {
    return <div className={`flex flex-col justify-center items-center min-h-screen ${containerClasses} p-4`}>
      <h1 className="text-2xl font-bold text-red-500 mb-4">Verification Failed</h1>
      <p>{error}</p>
      <a href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go to Homepage</a>
    </div>;
  }

  if (!certificateData) {
    return <div className={`flex justify-center items-center min-h-screen ${containerClasses}`}>Certificate not found.</div>;
  }

  // Format dates from certificateData
  const joiningDate = certificateData.joining_date ? new Date(certificateData.joining_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';
  const leavingDate = certificateData.leaving_date ? new Date(certificateData.leaving_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';
  const issuedDate = certificateData.issued_date ? new Date(certificateData.issued_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';

  const qrCodeValue = `${process.env.REACT_APP_FRONTEND_URL}/internship-certificate-verification/${certificateData.certificate_id}`;

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${containerClasses}`}>
      <div className={`max-w-3xl mx-auto p-6 sm:p-10 shadow-2xl rounded-lg ${cardClasses}`}>
        {/* This structure should mirror the one in CertificateGeneratorPage's previewContent for visual consistency */}
        <div style={{ fontFamily: "'Georgia', serif", border: "10px solid #003366", padding: "50px", textAlign: "center", backgroundColor: "#f0f8ff", color: "#333" }}>
          <img src={companyLogo} alt="Company Logo" style={{ maxWidth: "180px", marginBottom: "20px", display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
          <h1 style={{ color: "#003366", fontSize: "2.5em", marginBottom: "10px" }}>Certificate of Internship</h1>
          <p style={{ fontSize: "1.2em", marginBottom: "20px" }}>This certificate is proudly presented to</p>
          <h2 style={{ color: "#d2691e", fontSize: "2em", marginBottom: "20px", fontFamily: "'Brush Script MT', cursive" }}>
            {certificateData.recipient_name}
          </h2>
          <p style={{ fontSize: "1.1em", marginBottom: "10px" }}>for successful completion of an internship as a</p>
          <p style={{ fontSize: "1.3em", fontWeight: "bold", color: "#003366", marginBottom: "20px" }}>
            {certificateData.internship_role}
          </p>
          <p style={{ fontSize: "1em", marginBottom: "10px" }}>at <strong>{certificateData.company_name}</strong></p>
          <p style={{ fontSize: "1em", marginBottom: "20px" }}>from {joiningDate} to {leavingDate}.</p>
          {certificateData.project_worked_on && (
            <p style={{ fontSize: "1em", marginBottom: "20px" }}>
              During this period, they have diligently worked on the project: <strong>{certificateData.project_worked_on}</strong>.
            </p>
          )}
          <p style={{ fontSize: "1em", marginBottom: "30px" }}>
            We commend their dedication, hard work, and valuable contributions during the internship.
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #ccc" }}>
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "0.9em" }}><strong>{certificateData.verifier_name || 'Syed Roshan'}</strong></p>
              <p style={{ margin: 0, fontSize: "0.8em" }}>{certificateData.verifier_title || 'Founder, CodeBlaze'}</p>
              <p style={{ margin: 0, fontSize: "0.8em" }}>{certificateData.company_name}</p>
              <p style={{ marginTop: "10px", fontSize: "0.8em" }}>Date of Issue: {issuedDate}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              {qrCodeValue && (
                <div style={{ marginBottom: "5px" }}>
                  <QRCodeSVG value={qrCodeValue} size={80} level="H" includeMargin={true} />
                </div>
              )}
              <p style={{ margin: 0, fontSize: "0.8em" }}>Certificate ID: {certificateData.certificate_id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerificationPage;
