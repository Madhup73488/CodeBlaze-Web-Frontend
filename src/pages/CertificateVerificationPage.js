import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import adminApi from "../admin/utils/api"; // Ensure this path is correct
import { QRCodeSVG } from "qrcode.react";
import companyLogo from "../assets/images/codeblazelogoorange.png"; // Adjust path as needed
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// --- Helper Components for a cleaner structure ---

const LoadingIndicator = ({ isDark }) => (
  <div
    className={`flex flex-col items-center justify-center min-h-screen text-center p-4 ${
      isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-700"
    }`}
  >
    <div className="w-16 h-16 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
    <h2 className="text-2xl font-semibold mt-6">Verifying Certificate...</h2>
    <p className={isDark ? "text-gray-400" : "text-gray-500"}>
      Please wait while we validate the certificate details.
    </p>
  </div>
);

const ErrorDisplay = ({ error, isDark }) => (
  <div
    className={`flex flex-col items-center justify-center min-h-screen text-center p-4 ${
      isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-700"
    }`}
  >
    <div className="bg-red-100 p-4 rounded-full mb-6">
      <svg
        className="w-12 h-12 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h1 className="text-3xl font-bold text-red-600">Verification Failed</h1>
    <p
      className={`mt-2 text-lg max-w-md ${
        isDark ? "text-gray-400" : "text-gray-600"
      }`}
    >
      {error}
    </p>
    <a
      href="/"
      className="mt-8 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
    >
      Go to Homepage
    </a>
  </div>
);

// --- Main Certificate Verification Page ---

const CertificateVerificationPage = ({ theme = "light" }) => {
  const { certificateId } = useParams();
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const pdfCertificateRef = useRef(null);

  const isDark = theme === "dark";

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!certificateId) {
        setError("No Certificate ID provided in the URL.");
        setLoading(false);
        return;
      }
      try {
        const response = await adminApi.verifyCertificatePublic(certificateId);

        if (response && response.success) {
          setCertificateData(response.data);
          setTimeout(() => setIsVerified(true), 500);
        } else {
          setError(response?.message || "Certificate not found or invalid.");
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [certificateId]);

  const handleDownloadPdf = async () => {
    const certificateElement = pdfCertificateRef.current;
    if (!certificateElement) return;

    try {
      const canvas = await html2canvas(certificateElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: "white",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Certificate-${certificateData.certificate_id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Could not download the certificate. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const joiningDate = formatDate(certificateData?.joining_date);
  const leavingDate = formatDate(certificateData?.leaving_date);
  const issuedDate = formatDate(certificateData?.issued_date);

  const qrCodeValue = `${
    process.env.REACT_APP_FRONTEND_URL || window.location.origin
  }/internship-certificate-verification/${certificateData?.certificate_id}`;

  if (loading) return <LoadingIndicator isDark={isDark} />;
  if (error) return <ErrorDisplay error={error} isDark={isDark} />;
  if (!certificateData) return null;

  return (
    <>
      <div
        className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 ${
          isDark ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className={`mb-8 p-6 rounded-xl transition-all duration-700 ease-out ${
              isVerified ? "bg-green-100 border-green-200" : "bg-gray-200"
            } ${isDark ? "bg-opacity-10 border-gray-700" : ""}`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${
                  isVerified ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                {isVerified && (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    isVerified ? "text-green-800" : "text-gray-700"
                  } ${isDark && isVerified ? "text-green-300" : ""} ${
                    isDark ? "text-gray-300" : ""
                  }`}
                >
                  {isVerified ? "Certificate Verified" : "Verifying..."}
                </h1>
                <p
                  className={`${
                    isVerified ? "text-green-700" : "text-gray-600"
                  } ${isDark && isVerified ? "text-green-300" : ""} ${
                    isDark ? "text-gray-400" : ""
                  }`}
                >
                  This certificate is authentic and has been confirmed by our
                  records.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl shadow-lg p-6 sm:p-10 transition-colors duration-300 ${
              isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
            }`}
          >
            <div className="text-center mb-8">
              <h2
                className={`text-4xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Certificate of Internship
              </h2>
              <p
                className={`mt-2 text-lg ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                This acknowledges the successful completion of an internship.
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <p
                  className={`text-sm uppercase tracking-widest ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Presented To
                </p>
                <p
                  className={`text-4xl font-serif mt-1 ${
                    isDark ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  {certificateData.recipient_name}
                </p>
              </div>
              <div className="text-center">
                <p
                  className={`text-sm uppercase tracking-widest ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  For the role of
                </p>
                <p
                  className={`text-2xl font-semibold mt-1 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {certificateData.internship_role}
                </p>
                <p
                  className={`mt-1 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  at{" "}
                  <span className="font-bold">
                    {certificateData.company_name}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-dashed">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm uppercase tracking-widest text-gray-500">
                    Duration
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {joiningDate} to {leavingDate}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm uppercase tracking-widest text-gray-500">
                    Date Issued
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {issuedDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={handleDownloadPdf}
                disabled={!isVerified}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5 inline-block mr-2 -mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Certificate (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Hidden, Professional PDF Certificate Template (Corrected) --- */}
      <div
        ref={pdfCertificateRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "297mm",
          height: "210mm",
          backgroundColor: "white",
          fontFamily: "'Garamond', serif",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10mm",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "8px solid #002D62",
            padding: "2mm",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "2px solid #E4A01C",
              boxSizing: "border-box",
              padding: "15mm",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Top-right QR Code and ID */}
            <div
              style={{
                position: "absolute",
                top: "10mm",
                right: "10mm",
                textAlign: "center",
              }}
            >
              <QRCodeSVG value={qrCodeValue} size={70} level={"H"} />
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: "7pt",
                  letterSpacing: "0.5px",
                  margin: "4px 0 0 0",
                  color: "#555",
                }}
              >
                ID: {certificateData.certificate_id}
              </p>
            </div>

            {/* Centered Logo */}
            <img
              src={companyLogo}
              alt="Company Logo"
              style={{ width: "50px", margin: "0 auto 10mm auto" }}
            />

            {/* Main Certificate Text */}
            <p
              style={{ fontSize: "18pt", color: "#333", margin: "0 0 10mm 0" }}
            >
              Certificate of Internship
            </p>

            <p style={{ fontSize: "14pt", color: "#666", margin: "0 0 8mm 0" }}>
              This certificate is hereby presented to
            </p>

            <h1
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "36pt",
                color: "#E4A01C",
                margin: "0 0 10mm 0",
                fontWeight: "bold",
              }}
            >
              {certificateData.recipient_name}
            </h1>

            <p
              style={{
                fontSize: "15pt",
                color: "#333",
                margin: "0 auto",
                maxWidth: "80%",
                lineHeight: "1.6",
              }}
            >
              In recognition of the successful completion of the internship as a{" "}
              <strong style={{ color: "#002D62" }}>
                {certificateData.internship_role}
              </strong>{" "}
              at{" "}
              <strong style={{ color: "#002D62" }}>
                {certificateData.company_name}
              </strong>{" "}
              from <strong>{joiningDate}</strong> to{" "}
              <strong>{leavingDate}</strong>.
            </p>

            {/* Footer with Signatures and Date */}
            <div
              style={{
                position: "absolute",
                bottom: "20mm",
                left: "15mm",
                right: "15mm",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderTop: "1px solid #ccc",
                paddingTop: "8mm",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "14pt",
                    margin: "0",
                    fontWeight: "bold",
                  }}
                >
                  {certificateData.verifier_name}
                </p>
                <hr
                  style={{
                    width: "100%",
                    margin: "4px auto",
                    border: "none",
                    borderTop: "0.5px solid #888",
                  }}
                />
                <p style={{ fontSize: "11pt", margin: "0", color: "#555" }}>
                  {certificateData.verifier_title}
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "14pt",
                    margin: "0",
                    fontWeight: "bold",
                  }}
                >
                  {issuedDate}
                </p>
                <hr
                  style={{
                    width: "100%",
                    margin: "4px auto",
                    border: "none",
                    borderTop: "0.5px solid #888",
                  }}
                />
                <p style={{ fontSize: "11pt", margin: "0", color: "#555" }}>
                  Date of Issue
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateVerificationPage;
