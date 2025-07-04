import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import adminApi from '../admin/utils/api'; // Path to admin API utils
import { QRCodeSVG } from 'qrcode.react';
import companyLogo from '../assets/images/codeblazelogoorange.png'; // Adjust path as needed
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CertificateVerificationPage = ({ theme = 'light' }) => { // Assuming theme might be passed or from a context
  const { certificateId } = useParams();
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const certificateRef = useRef(null);

  const handleDownloadPdf = () => {
    const input = certificateRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;
      pdf.addImage(imgData, 'PNG', 0, (pdfHeight - height) / 2, width, height);
      pdf.save(`certificate-${certificateData.certificate_id}.pdf`);
    });
  };

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
        if (response && response.success) {
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

  const isDark = theme === 'dark';
  const containerClasses = isDark ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800';
  const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const certificateTextColor = isDark ? '#FFFFFF' : '#333333';
  const certificatePrimaryColor = isDark ? '#A78BFA' : '#003366';
  const certificateSecondaryColor = isDark ? '#FB923C' : '#d2691e';

  // Loading State
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${containerClasses}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Verifying Certificate</h2>
          <p className="text-gray-500">Please wait while we validate your certificate...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${containerClasses} p-4`}>
        <div className={`max-w-md w-full ${cardClasses} border rounded-xl shadow-lg p-8 text-center`}>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  if (!certificateData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${containerClasses}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Certificate not found</h2>
        </div>
      </div>
    );
  }

  // Format dates from certificateData
  const joiningDate = certificateData.joining_date ? new Date(certificateData.joining_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';
  const leavingDate = certificateData.leaving_date ? new Date(certificateData.leaving_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';
  const issuedDate = certificateData.issued_date ? new Date(certificateData.issued_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';

  const qrCodeValue = `${process.env.REACT_APP_FRONTEND_URL}/internship-certificate-verification/${certificateData.certificate_id}`;

  return (
    <div className={`min-h-screen py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 ${containerClasses}`}>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            Certificate Verified
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            This certificate has been successfully verified and is authentic. Below are the verified details.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Certificate Details Card */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className={`${cardClasses} border rounded-xl shadow-lg p-6`}>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`}>
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Certificate Details
              </h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Recipient</h3>
                  <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>{certificateData.recipient_name}</p>
                </div>
                
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Role</h3>
                  <p className="text-lg font-semibold text-indigo-600 mt-1">{certificateData.internship_role}</p>
                </div>
                
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Company</h3>
                  <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>{certificateData.company_name}</p>
                </div>
                
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Duration</h3>
                  <p className={`text-md ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>{joiningDate} to {leavingDate}</p>
                </div>
                
                {certificateData.project_worked_on && (
                  <div className="border-b border-gray-200 pb-3">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Project</h3>
                    <p className={`text-md ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>{certificateData.project_worked_on}</p>
                  </div>
                )}
                
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Issued Date</h3>
                  <p className={`text-md ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>{issuedDate}</p>
                </div>
                
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Certificate ID</h3>
                  <p className={`text-md font-mono ${isDark ? 'text-white bg-gray-700' : 'text-gray-900 bg-gray-100'} p-2 rounded text-sm break-all`}>
                    {certificateData.certificate_id}
                  </p>
                </div>
                
                <div className="pt-2">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Verification QR Code</h3>
                  <div className="flex justify-center">
                    <div className="p-3 bg-white rounded-lg shadow-sm border">
                      <QRCodeSVG value={qrCodeValue} size={120} level="H" includeMargin={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Preview */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className={`${cardClasses} border rounded-xl shadow-lg p-4 sm:p-6`}>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Certificate Preview
              </h2>
              
              {/* Certificate Container with responsive scaling */}
              <div className="overflow-auto rounded-lg shadow-inner bg-gray-50">
                <div ref={certificateRef} style={{ 
                    fontFamily: "'Georgia', serif", 
                    border: `10px solid ${certificatePrimaryColor}`, 
                    padding: "50px", 
                    textAlign: "center", 
                    backgroundColor: isDark ? "#111827" : "#f0f8ff", 
                    color: certificateTextColor,
                    width: "800px",
                    height: "600px",
                    position: "relative"
                  }}>
                    <img 
                      src={companyLogo} 
                      alt="Company Logo" 
                      style={{ 
                        maxWidth: "180px", 
                        marginBottom: "20px", 
                        display: 'block', 
                        marginLeft: 'auto', 
                        marginRight: 'auto' 
                      }} 
                    />
                    <h1 style={{ color: certificatePrimaryColor, fontSize: "2.5em", marginBottom: "10px" }}>
                      Certificate of Internship
                    </h1>
                    <p style={{ fontSize: "1.2em", marginBottom: "20px" }}>
                      This certificate is proudly presented to
                    </p>
                    <h2 style={{ 
                      color: certificateSecondaryColor, 
                      fontSize: "2em", 
                      marginBottom: "20px", 
                      fontFamily: "'Brush Script MT', cursive" 
                    }}>
                      {certificateData.recipient_name}
                    </h2>
                    <p style={{ fontSize: "1.1em", marginBottom: "10px" }}>
                      for successful completion of an internship as a
                    </p>
                    <p style={{ 
                      fontSize: "1.3em", 
                      fontWeight: "bold", 
                      color: certificatePrimaryColor, 
                      marginBottom: "20px" 
                    }}>
                      {certificateData.internship_role}
                    </p>
                    <p style={{ fontSize: "1em", marginBottom: "10px" }}>
                      at <strong>{certificateData.company_name}</strong>
                    </p>
                    <p style={{ fontSize: "1em", marginBottom: "20px" }}>
                      from {joiningDate} to {leavingDate}.
                    </p>
                    {certificateData.project_worked_on && (
                      <p style={{ fontSize: "1em", marginBottom: "20px" }}>
                        During this period, they have diligently worked on the project: <strong>{certificateData.project_worked_on}</strong>.
                      </p>
                    )}
                    <p style={{ fontSize: "1em", marginBottom: "30px" }}>
                      We commend their dedication, hard work, and valuable contributions during the internship.
                    </p>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "flex-end", 
                      marginTop: "40px", 
                      paddingTop: "20px", 
                      borderTop: "1px solid #ccc",
                      position: "absolute",
                      bottom: "50px",
                      left: "50px",
                      right: "50px"
                    }}>
                      <div style={{ textAlign: "left" }}>
                        <p style={{ margin: 0, fontSize: "0.9em" }}>
                          <strong>{certificateData.verifier_name || 'Syed Roshan'}</strong>
                        </p>
                        <p style={{ margin: 0, fontSize: "0.8em" }}>
                          {certificateData.verifier_title || 'Founder, CodeBlaze'}
                        </p>
                        <p style={{ margin: 0, fontSize: "0.8em" }}>
                          {certificateData.company_name}
                        </p>
                        <p style={{ marginTop: "10px", fontSize: "0.8em" }}>
                          Date of Issue: {issuedDate}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ marginBottom: "5px" }}>
                          <QRCodeSVG value={qrCodeValue} size={80} level="H" includeMargin={true} />
                        </div>
                        <p style={{ margin: 0, fontSize: "0.8em" }}>
                          Certificate ID: {certificateData.certificate_id}
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="max-w-7xl mx-auto mt-8 text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={handleDownloadPdf} className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Certificate
          </button>
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerificationPage;
