import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useAdmin } from '../../contexts/AdminContext';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import adminApi from '../../utils/api';
import companyLogo from '../../../assets/images/codeblazelogoorange.png';

function CertificateGeneratorPage() {
  const { theme } = useAdmin();
  
  const generateNewCertificateId = () => `CB-CERT-${new Date().getFullYear()}${(Math.random() * 100000).toFixed(0).padStart(5, '0')}`;

  const [formData, setFormData] = useState({
    recipientName: '',
    internshipRole: '',
    joiningDate: '',
    leavingDate: '',
    projectWorkedOn: '',
    certificateId: generateNewCertificateId(),
    companyName: 'CodeBlaze Technologies Pvt Ltd',
    issuedDate: new Date().toISOString().split('T')[0],
    verifierName: 'Syed Roshan',
    verifierTitle: 'Founder, CodeBlaze',
  });
  const [previewContent, setPreviewContent] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef(null); // Ref for the on-page preview div
  const qrCodeContainerRef = useRef(null); // Ref for the React root of QR in on-page preview

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateNewId = () => {
    setFormData(prev => ({ ...prev, certificateId: generateNewCertificateId() }));
  };

  useEffect(() => {
    if (formData.certificateId) {
      setQrCodeValue(`${window.location.origin}/internship-certificate-verification/${formData.certificateId}`);
    }
  }, [formData.certificateId]);

  useEffect(() => {
    const joining = formData.joiningDate ? new Date(formData.joiningDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '[Joining Date]';
    const leaving = formData.leavingDate ? new Date(formData.leavingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '[Leaving Date]';
    const issued = formData.issuedDate ? new Date(formData.issuedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '[Date of Issue]';
    const content = `
      <div id="pdf-content-root" style="font-family: 'Georgia', serif; border: 10px solid #003366; padding: 50px; max-width: 800px; margin: auto; text-align: center; background-color: #f0f8ff;">
        <img src="${companyLogo}" alt="Company Logo" style="max-width: 180px; margin-bottom: 20px;" />
        <h1 style="color: #003366; font-size: 2.5em; margin-bottom: 10px;">Certificate of Internship</h1>
        <p style="font-size: 1.2em; margin-bottom: 20px;">This certificate is proudly presented to</p>
        <h2 style="color: #d2691e; font-size: 2em; margin-bottom: 20px; font-family: 'Brush Script MT', cursive;">${formData.recipientName || '[Intern Name]'}</h2>
        <p style="font-size: 1.1em; margin-bottom: 10px;">for successful completion of an internship as a</p>
        <p style="font-size: 1.3em; font-weight: bold; color: #003366; margin-bottom: 20px;">${formData.internshipRole || '[Internship Role]'}</p>
        <p style="font-size: 1em; margin-bottom: 10px;">at <strong>${formData.companyName}</strong></p>
        <p style="font-size: 1em; margin-bottom: 20px;">from ${joining} to ${leaving}.</p>
        ${formData.projectWorkedOn ? `<p style="font-size: 1em; margin-bottom: 20px;">During this period, they have diligently worked on the project: <strong>${formData.projectWorkedOn}</strong>.</p>` : ''}
        <p style="font-size: 1em; margin-bottom: 30px;">We commend their dedication, hard work, and valuable contributions during the internship.</p>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc;">
          <div style="text-align: left;">
            <p style="margin: 0; font-size: 0.9em;"><strong>${formData.verifierName}</strong></p>
            <p style="margin: 0; font-size: 0.8em;">${formData.verifierTitle}</p>
            <p style="margin: 0; font-size: 0.8em;">${formData.companyName}</p>
            <p style="margin-top: 10px; font-size: 0.8em;">Date of Issue: ${issued}</p>
          </div>
          <div style="text-align: right;">
            {/* Removed stray comment here */}
            <div id="qr-code-container" style="margin-bottom: 5px; display: inline-block;"></div> 
            <p style="margin: 0; font-size: 0.8em;">Certificate ID: ${formData.certificateId}</p>
          </div>
        </div>
      </div>
    `;
    setPreviewContent(content);
  }, [formData]);

  useEffect(() => {
    if (previewContent && qrCodeValue) {
      const qrContainer = previewRef.current?.querySelector('#qr-code-container');
      if (qrContainer) {
        if (qrCodeContainerRef.current) { 
          qrCodeContainerRef.current.unmount();
        }
        const root = createRoot(qrContainer);
        root.render(<QRCodeSVG value={qrCodeValue} size={80} level="H" includeMargin={true} />);
        qrCodeContainerRef.current = root;
      }
    }
    return () => {
      if (qrCodeContainerRef.current) {
        qrCodeContainerRef.current.unmount();
        qrCodeContainerRef.current = null;
      }
    };
  }, [previewContent, qrCodeValue]);

  const handleGeneratePdf = async () => {
    setIsGenerating(true);
    try {
      const certificateDataToSave = { ...formData, qrCodeValue };
      const savedCertificateResponse = await adminApi.generateCertificate(certificateDataToSave); 
      if (!savedCertificateResponse || !savedCertificateResponse.success) {
        if (savedCertificateResponse?.message?.includes("already exists")) {
             alert(`Failed to save certificate: ${savedCertificateResponse.message} Please generate a new Certificate ID.`);
        } else {
            throw new Error(savedCertificateResponse?.message || "Failed to save certificate data.");
        }
        setIsGenerating(false);
        return; 
      }
      console.log("Certificate data saved:", savedCertificateResponse.data);

      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.top = '-9999px';
      iframe.style.width = '1123px'; 
      iframe.style.height = 'auto'; // Allow iframe height to adjust to content
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(`
        <html>
          <head>
            <style>
              body { margin: 0; font-family: 'Georgia', serif; display: inline-block; } /* Ensure body fits content for scrollHeight */
              img { max-width: 100%; display: block; }
              #pdf-content-root { width: 1050px !important; margin: auto; } 
            </style>
          </head>
          <body>
            ${previewContent}
          </body>
        </html>
      `);
      iframeDoc.close();

      const qrPlaceholderInIframe = iframeDoc.getElementById('qr-code-container');
      if (qrPlaceholderInIframe && qrCodeValue) {
        const qrRoot = createRoot(qrPlaceholderInIframe);
        qrRoot.render(<QRCodeSVG value={qrCodeValue} size={80} level="H" includeMargin={true} />);
      }
      
      // Allow time for iframe content and QR code to render fully
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      const elementToCaptureInIframe = iframeDoc.getElementById('pdf-content-root');

      if (!elementToCaptureInIframe) {
        document.body.removeChild(iframe);
        throw new Error("Could not find element with ID 'pdf-content-root' within the iframe.");
      }
      
      // Ensure iframe body is sized to content before capture
      iframe.style.height = iframeDoc.body.scrollHeight + 'px';


      const canvas = await html2canvas(elementToCaptureInIframe, {
        scale: 2, useCORS: true, logging: true, backgroundColor: '#f0f8ff',
        width: elementToCaptureInIframe.scrollWidth,
        height: elementToCaptureInIframe.scrollHeight,
        windowWidth: elementToCaptureInIframe.scrollWidth, // Use element's scroll dimensions
        windowHeight: elementToCaptureInIframe.scrollHeight,
      });

      document.body.removeChild(iframe);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      let imgWidth = imgProps.width;
      let imgHeight = imgProps.height;
      const ratio = imgWidth / imgHeight;

      // Scale to fit within 95% of PDF page dimensions while maintaining aspect ratio
      const maxWidth = pdfWidth * 0.95;
      const maxHeight = pdfHeight * 0.95;

      if (imgWidth > maxWidth) {
        imgWidth = maxWidth;
        imgHeight = imgWidth / ratio;
      }
      if (imgHeight > maxHeight) {
        imgHeight = maxHeight;
        imgWidth = imgHeight * ratio;
      }
      
      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(`Certificate_${formData.recipientName.replace(/\s+/g, '_') || 'Intern'}_${formData.certificateId}.pdf`);
      alert("Certificate PDF generated!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Failed to generate PDF: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const isDark = theme === 'dark';
  const pageContainerClasses = isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800';
  const formCardClasses = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const inputClasses = isDark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400';
  const labelClasses = isDark ? 'text-gray-300' : 'text-gray-700';
  const buttonClasses = `w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isDark ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"}`;
  const secondaryButtonClasses = `py-2 px-4 border rounded-md text-sm font-medium ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`;

  return (
    <div className={`p-4 md:p-6 min-h-screen ${pageContainerClasses}`}>
      <h1 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Completion Certificate Generator</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className={`p-6 rounded-lg shadow-lg border ${formCardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Enter Details</h2>
          <form className="space-y-4">
            <div><label htmlFor="recipientName" className={`block text-sm font-medium mb-1 ${labelClasses}`}>Recipient Name:</label><input type="text" name="recipientName" id="recipientName" value={formData.recipientName} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`} /></div>
            <div><label htmlFor="internshipRole" className={`block text-sm font-medium mb-1 ${labelClasses}`}>Internship Role:</label><input type="text" name="internshipRole" id="internshipRole" value={formData.internshipRole} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`} /></div>
            <div><label htmlFor="joiningDate" className={`block text-sm font-medium mb-1 ${labelClasses}`}>Joining Date:</label><input type="date" name="joiningDate" id="joiningDate" value={formData.joiningDate} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`} /></div>
            <div><label htmlFor="leavingDate" className={`block text-sm font-medium mb-1 ${labelClasses}`}>Leaving Date:</label><input type="date" name="leavingDate" id="leavingDate" value={formData.leavingDate} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`} /></div>
            <div><label htmlFor="projectWorkedOn" className={`block text-sm font-medium mb-1 ${labelClasses}`}>Project Worked On:</label><textarea name="projectWorkedOn" id="projectWorkedOn" value={formData.projectWorkedOn} onChange={handleInputChange} rows="3" className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}></textarea></div>
            <div>
              <label htmlFor="certificateId" className={`block text-sm font-medium mb-1 ${labelClasses}`}>Certificate ID:</label>
              <div className="flex items-center space-x-2">
                <input type="text" name="certificateId" id="certificateId" value={formData.certificateId} readOnly className={`flex-grow px-3 py-2 border rounded-md shadow-sm focus:outline-none ${inputClasses} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`} />
                <button type="button" onClick={handleGenerateNewId} className={secondaryButtonClasses}>New ID</button>
              </div>
            </div>
            <div className="pt-2"><button type="button" className={`${buttonClasses} ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleGeneratePdf} disabled={isGenerating}>{isGenerating ? 'Generating...' : 'Save & Generate PDF'}</button></div>
          </form>
        </div>
        <div className={`p-6 rounded-lg shadow-lg border ${formCardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Live Preview</h2>
          <div 
            ref={previewRef}
            className={`prose max-w-none p-4 border rounded ${isDark ? 'border-gray-700 bg-gray-900 text-gray-300' : 'border-gray-300 bg-white text-gray-700'}`}
            style={{ minHeight: '500px', overflowY: 'auto' }}
            dangerouslySetInnerHTML={{ __html: previewContent }}
          >
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateGeneratorPage;
