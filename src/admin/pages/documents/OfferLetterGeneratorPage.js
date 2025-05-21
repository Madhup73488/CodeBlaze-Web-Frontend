import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import adminApi from '../../utils/api'; // Import the default export

// Placeholder for a more sophisticated preview component if needed
// import OfferLetterPreview from '../../components/documents/OfferLetterPreview';

// Assuming the logo path
import companyLogo from '../../../assets/images/codeblazelogoorange.png'; 

function OfferLetterGeneratorPage() {
  const { theme } = useAdmin();
  const [formData, setFormData] = useState({
    recipientName: '',
    internshipRole: '',
    joiningDate: '',
    // Add more fields as needed based on a standard template
    companyName: 'CodeBlaze Technologies Pvt Ltd',
    companyAddressLine1: '123 Tech Park', // Placeholder
    companyAddressLine2: 'Silicon Valley, Bangalore 560100', // Placeholder
    companyContact: '+91 99XXXXXX00', // Placeholder
    companyWebsite: 'www.codeblaze.net', // Placeholder
    senderName: 'Syed Roshan', // Placeholder
    senderTitle: 'Founder, CodeBlaze', // Placeholder
  });
  const [previewContent, setPreviewContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Generate a basic preview (can be enhanced with a proper template)
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    // Basic template, will be improved
    const content = `
      <div id="pdf-content-root" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #eee; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="${companyLogo}" alt="Company Logo" style="max-width: 200px; margin-bottom: 10px;" />
          <h2 style="margin: 0; color: #2c3e50;">CodeBlaze Technologies Pvt Ltd</h2>
          <p style="margin: 0; font-size: 0.9em;">Igniting Ideas, Delivering Excellence</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <p><strong>${formData.companyName}</strong></p>
            <p>${formData.companyAddressLine1}</p>
            <p>${formData.companyAddressLine2}</p>
            <p>Tel: ${formData.companyContact}</p>
            <p>Web: ${formData.companyWebsite}</p>
          </div>
          <div>
            <p><strong>Date:</strong> ${today}</p>
            <p><strong>UNID:</strong> CB-INT-${new Date().getFullYear()}${(Math.random() * 10000).toFixed(0).padStart(4, '0')}</p>
          </div>
        </div>

        <p>Dear ${formData.recipientName || '[Candidate Name]'},</p>
        <p>We are pleased to offer you the position of <strong>${formData.internshipRole || '[Internship Role]'}</strong> at CodeBlaze Technologies Pvt Ltd, starting from <strong>${formData.joiningDate ? new Date(formData.joiningDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '[Joining Date]'}</strong>.</p>
        
        <p>This internship is an excellent opportunity to gain hands-on experience and contribute to exciting projects. We were impressed with your skills and enthusiasm during the selection process.</p>

        <p>Further details regarding your internship, including specific responsibilities, duration, and stipend (if applicable), will be shared with you shortly in a formal offer letter addendum or discussed during your onboarding.</p>
        
        <p>We look forward to you joining our team and making significant contributions.</p>
        
        <p>Warm regards,</p>
        <p><strong>${formData.senderName}</strong><br/>${formData.senderTitle}<br/>${formData.companyName}</p>
      </div>
    `;
    setPreviewContent(content);
  }, [formData]);

  const handleGeneratePdf = async () => {
    if (!previewRef.current) {
      alert("Preview content is not available.");
      return;
    }
    setIsGenerating(true);

    try {
      // Step 1: Save data to backend (optional, but good for record keeping)
      // The backend might return a unique ID or path for the saved document
      const offerLetterDataToSave = {
        recipientName: formData.recipientName,
        internshipRole: formData.internshipRole,
        joiningDate: formData.joiningDate,
        // Include any other relevant fields from formData that need to be saved
        // companyName: formData.companyName, // etc.
      };
      
      const savedOfferLetterResponse = await adminApi.generateOfferLetter(offerLetterDataToSave); // Corrected: removed .default

      if (!savedOfferLetterResponse || !savedOfferLetterResponse.success) { // Assuming backend returns { success: true, data: ... }
        throw new Error(savedOfferLetterResponse?.message || "Failed to save offer letter data to backend.");
      }
      console.log("Offer letter data saved to backend:", savedOfferLetterResponse.data);
      // You might use savedOfferLetterResponse.data._id or other info in the PDF if needed, e.g., for filename

      // Step 2: Generate PDF using an iframe for style isolation
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.top = '-9999px';
      iframe.style.width = '850px'; // Approximate width of A4 content area in pixels for rendering
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow.document;
      iframeDoc.open();
      // Write only the previewContent HTML. This HTML uses inline styles with safe colors.
      // Add a basic reset and ensure images load.
      iframeDoc.write(`
        <html>
          <head>
            <style>
              body { margin: 0; font-family: Arial, sans-serif; } 
              img { max-width: 100%; display: block; } /* Ensure images are handled correctly */
            </style>
          </head>
          <body>
            ${previewContent}
          </body>
        </html>
      `);
      iframeDoc.close();

      // Wait for images inside the iframe to load (if any)
      // This is a simplified wait; a more robust solution would track image load events.
      await new Promise(resolve => setTimeout(resolve, 500)); // Reduced wait time slightly

      const elementToCaptureInIframe = iframeDoc.getElementById('pdf-content-root'); // Query by ID

      if (!elementToCaptureInIframe) {
        document.body.removeChild(iframe);
        throw new Error("Could not find content within the iframe to capture.");
      }
      
      const canvas = await html2canvas(elementToCaptureInIframe, {
        scale: 2,
        useCORS: true, // Important if companyLogo is from a different origin or needs CORS
        logging: true,
        backgroundColor: '#ffffff', // Ensure canvas background is white
        windowWidth: iframe.contentWindow.innerWidth, // Use iframe's dimensions
        windowHeight: iframe.contentWindow.innerHeight,
      });

      document.body.removeChild(iframe); // Clean up the iframe

      const imgData = canvas.toDataURL('image/png');
      
      // Calculate PDF dimensions
      // A4 dimensions in mm: 210 x 297
      // html2canvas captures based on element size, jspdf uses points or mm.
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt', // points
        format: 'a4' // A4 paper
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate the aspect ratio
      const imgWidth = pdfWidth * 0.9; // Use 90% of page width
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      
      let position = 0;
      let heightLeft = imgHeight;

      // Centering the image on the page
      const xOffset = (pdfWidth - imgWidth) / 2;


      // If image is taller than one page, split it
      if (imgHeight > pdfHeight * 0.9) { // Check if image height is greater than 90% of page height
         pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
         heightLeft -= pdfHeight;
         while (heightLeft > 0) {
            position = heightLeft - imgHeight; // Or position = position - pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
         }
      } else {
         pdf.addImage(imgData, 'PNG', xOffset, 10, imgWidth, imgHeight); // Add some top margin
      }
      
      pdf.save(`Offer_Letter_${formData.recipientName.replace(/\s+/g, '_') || 'Intern'}.pdf`);
      alert("Offer Letter PDF generated and download started!");

    } catch (error) {
      console.error("Error generating PDF:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Failed to generate PDF: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const isDark = theme === 'dark';
  // Consistent styling with other admin pages
  const pageContainerClasses = isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800';
  const formCardClasses = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const inputClasses = isDark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400';
  const labelClasses = isDark ? 'text-gray-300' : 'text-gray-700';
  const buttonClasses = `w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`;


  return (
    <div className={`p-4 md:p-6 min-h-screen ${pageContainerClasses}`}>
      <h1 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Offer Letter Generator</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form Section */}
        <div className={`p-6 rounded-lg shadow-lg border ${formCardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Enter Details</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="recipientName" className={`block text-sm font-medium mb-1 ${labelClasses}`}>Recipient Name:</label>
              <input type="text" name="recipientName" id="recipientName" value={formData.recipientName} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`} />
            </div>
            <div>
              <label htmlFor="internshipRole" className={`block text-sm font-medium mb-1 ${labelClasses}`}>Internship Role:</label>
              <input type="text" name="internshipRole" id="internshipRole" value={formData.internshipRole} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`} />
            </div>
            <div>
              <label htmlFor="joiningDate" className={`block text-sm font-medium mb-1 ${labelClasses}`}>Joining Date:</label>
              <input type="date" name="joiningDate" id="joiningDate" value={formData.joiningDate} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`} />
            </div>
            {/* Add more input fields here as needed */}
            <div className="pt-2">
              <button 
                type="button" 
                className={`${buttonClasses} ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`} 
                onClick={handleGeneratePdf}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Save & Generate PDF'}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className={`p-6 rounded-lg shadow-lg border ${formCardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Live Preview</h2>
          <div 
            ref={previewRef} // Attach ref here
            className={`prose max-w-none p-4 border rounded ${isDark ? 'border-gray-700 bg-gray-900 text-gray-300' : 'border-gray-300 bg-white text-gray-700'}`}
            dangerouslySetInnerHTML={{ __html: previewContent }}
            style={{ minHeight: '400px', overflowY: 'auto' }} // Ensure content is visible for html2canvas
          >
            {/* Content is set by dangerouslySetInnerHTML */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferLetterGeneratorPage;
