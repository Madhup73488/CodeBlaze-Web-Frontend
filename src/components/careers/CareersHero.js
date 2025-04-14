
// components/Careers/CareersHero.jsx
const CareersHero = ({ theme, colorStyles }) => {
    return (
      <section className="careers-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-gradient-to-r"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${theme === 'dark' ? 'rgba(10, 10, 10, 0.9)' : 'rgba(255, 255, 255, 0.9)'}, ${theme === 'dark' ? 'rgba(10, 10, 10, 0.7)' : 'rgba(255, 255, 255, 0.7)'}), url('/images/careers-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Join Our Team of Innovators</h1>
            <p className="text-xl mb-8">
              At CodeBlaze, we're building the future of digital transformation. Join us in creating innovative solutions that make a real impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                className="px-6 py-3 rounded-md text-white font-medium transition-all"
                style={{ backgroundColor: colorStyles.primary, boxShadow: `0 4px 14px rgba(0, 0, 0, 0.1)` }}
              >
                View Open Positions
              </button>
              <button 
                className={`px-6 py-3 rounded-md font-medium transition-all border-2`}
                style={{ 
                  borderColor: colorStyles.primary,
                  color: theme === 'dark' ? '#fff' : '#0a0a0a'
                }}
              >
                Our Culture
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default CareersHero;
  