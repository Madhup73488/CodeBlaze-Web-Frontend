import React, { useRef, useState } from 'react';

// Play Icon SVG Component
const PlayIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
  </svg>
);

// Previous Arrow Icon
const PrevIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

// Next Arrow Icon
const NextIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Close Icon
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Star Icon for Rating
const StarIcon = ({ filled = true }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Rating Component
const Rating = ({ rating }) => (
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <StarIcon key={star} filled={star <= rating} />
    ))}
    <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
  </div>
);

// Testimonial Modal Component
const TestimonialModal = ({ learner, isOpen, onClose }) => {
  if (!isOpen || !learner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Modal Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
          >
            <CloseIcon />
          </button>
          {/* Left Side - Video */}
          <div className="space-y-4">
            <div className="w-full bg-gray-900 rounded-xl overflow-hidden relative" style={{ height: '500px' }}>
              <video
                className="w-full h-full object-cover"
                controls
                poster={learner.imageUrl}
              >
                <source src={learner.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Right Side - Testimonial Details */}
          <div className="space-y-6">
            {/* Reviewer Info */}
            <div className="flex items-center space-x-4">
              <img
                src={learner.imageUrl}
                alt={learner.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xl font-bold text-gray-800">{learner.name}</h4>
                <p className="text-gray-600">{learner.role}</p>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h5 className="text-sm font-semibold text-gray-700 mb-2">Rating</h5>
              <Rating rating={learner.rating} />
            </div>

            {/* Testimonial */}
            <div>
              <h5 className="text-sm font-semibold text-gray-700 mb-3">Testimonial</h5>
              <p className="text-gray-700 leading-relaxed">{learner.testimonial}</p>
            </div>

            {/* Review Date */}
            <div>
              <h5 className="text-sm font-semibold text-gray-700 mb-2">Reviewed on</h5>
              <p className="text-gray-600">{learner.reviewDate}</p>
            </div>

            {/* Course/Program */}
            <div>
              <h5 className="text-sm font-semibold text-gray-700 mb-2">Program Completed</h5>
              <p className="text-blue-600 font-medium">{learner.program}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Learner Card Component
const LearnerCard = ({ learner, onPlayClick }) => (
  <div className="flex-shrink-0 w-72 h-96 rounded-2xl overflow-hidden relative shadow-lg group">
    <img 
      src={learner.imageUrl} 
      alt={`Story from ${learner.name}`} 
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/288x384/e2e8f0/4a5568?text=Learner'; }}
    />
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
    
    {/* Card Content */}
    <div className="absolute bottom-0 left-0 p-6 flex items-center justify-between w-full">
      <div className="text-white">
        <h4 className="font-bold text-lg">{learner.name}</h4>
        <p className="text-sm text-gray-200">{learner.role}</p>
      </div>
      <button
        onClick={() => onPlayClick(learner)}
        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 cursor-pointer transition-colors hover:bg-white/30"
      >
        <PlayIcon />
      </button>
    </div>
  </div>
);

// Main Component
export default function SuccessfulLearners() {
  const scrollRef = useRef(null);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const learners = [
    { 
      name: 'Yesha Khan', 
      role: 'UI/UX Designer', 
      imageUrl: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      rating: 5,
      testimonial: "Syntellite Labs completely transformed my career! The UI/UX design program was comprehensive and practical. The mentors were incredibly supportive, and the hands-on projects helped me build a portfolio that landed me my dream job. I went from having no design experience to becoming a confident UI/UX designer in just 6 months.",
      reviewDate: "December 15, 2024",
      program: "Complete UI/UX Design Bootcamp"
    },
    { 
      name: 'Ethan Samuel', 
      role: 'Product Designer', 
      imageUrl: 'https://images.pexels.com/photos/4240505/pexels-photo-4240505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      rating: 5,
      testimonial: "The product design course at Syntellite Labs exceeded all my expectations. The curriculum was up-to-date with industry standards, and the real-world projects gave me the confidence to tackle complex design challenges. The career support team helped me secure a position at a top tech company.",
      reviewDate: "November 28, 2024",
      program: "Advanced Product Design Program"
    },
    { 
      name: 'William Henry', 
      role: 'Web Developer', 
      imageUrl: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      rating: 4,
      testimonial: "As someone who was completely new to programming, Syntellite Labs made web development accessible and enjoyable. The step-by-step approach and practical projects helped me understand complex concepts easily. I'm now working as a full-stack developer and loving every moment of it!",
      reviewDate: "January 8, 2025",
      program: "Full-Stack Web Development"
    },
    { 
      name: 'Robert Fox', 
      role: 'Frontend Developer', 
      imageUrl: 'https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      rating: 5,
      testimonial: "The frontend development program was exactly what I needed to advance my career. The instructors were industry experts who provided valuable insights and feedback. The collaborative learning environment and peer support made the journey even more rewarding.",
      reviewDate: "October 22, 2024",
      program: "Modern Frontend Development"
    },
    { 
      name: 'Jane Doe', 
      role: 'Data Scientist', 
      imageUrl: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      rating: 5,
      testimonial: "Syntellite Labs' data science program is outstanding! The combination of theoretical knowledge and practical applications prepared me well for the industry. The machine learning projects and real datasets gave me hands-on experience that employers value highly.",
      reviewDate: "September 14, 2024",
      program: "Data Science & Machine Learning"
    },
  ];

  const openModal = (learner) => {
    setSelectedLearner(learner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLearner(null);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div id="successful-learners" className="bg-gradient-to-br from-pink-50 via-white to-blue-50 font-sans antialiased py-16 sm:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section with Navigation */}
        <div className="flex items-center justify-between mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Stories from Our <span className="text-pink-500">Successful Learners</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              See how everyday learners became professionals with guidance, effort, and expert-led learning.
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex space-x-2">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors duration-200"
              aria-label="Previous stories"
            >
              <PrevIcon />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors duration-200"
              aria-label="Next stories"
            >
              <NextIcon />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Stories */}
        <div 
          ref={scrollRef}
          className="flex space-x-8 pb-4 -mx-4 px-4 overflow-x-auto" 
          style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
        >
          {/* This is a simple way to hide scrollbars, more robust solutions might need a custom CSS class */}
          <style>{`
            .overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {learners.map((learner, index) => (
            <LearnerCard key={index} learner={learner} onPlayClick={openModal} />
          ))}
        </div>

        {/* Testimonial Modal */}
        <TestimonialModal 
          learner={selectedLearner} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />

      </div>
    </div>
  );
}
