
// components/Careers/ApplicationProcess.jsx
const ApplicationProcess = ({ theme, colorStyles }) => {
  const steps = [
    {
      number: "01",
      title: "Apply Online",
      description: "Submit your application through our careers portal with your resume and cover letter."
    },
    {
      number: "02",
      title: "Initial Screening",
      description: "Our recruiting team reviews applications and reaches out to qualified candidates."
    },
    {
      number: "03",
      title: "Technical Interview",
      description: "Showcase your skills and experience in a focused technical discussion."
    },
    {
      number: "04",
      title: "Team Interview",
      description: "Meet your potential teammates and learn more about our culture and projects."
    },
    {
      number: "05",
      title: "Offer",
      description: "Receive and review your offer package with our HR team."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Hiring Process</h2>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: colorStyles.primary }}></div>
          <p className="mt-6 max-w-2xl mx-auto text-lg">
            We've designed our hiring process to be thorough, fair, and respectful of your time.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Process timeline line */}
          <div 
            className="absolute left-0 md:left-1/2 top-0 h-full w-1 md:transform md:-translate-x-1/2"
            style={{ backgroundColor: colorStyles.primary }}
          ></div>
          
          {/* Process steps */}
          {steps.map((step, index) => (
            <div key={index} className={`relative z-10 flex flex-col md:flex-row items-center mb-12 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}>
              <div className="md:w-1/2 flex justify-center md:justify-end md:pr-8">
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold mb-4 md:mb-0 ${
                    index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'
                  }`}
                  style={{ backgroundColor: colorStyles.primary }}
                >
                  {step.number}
                </div>
              </div>
              <div 
                className={`md:w-1/2 p-6 rounded-lg ${
                  index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                }`}
                style={{ 
                  background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;
