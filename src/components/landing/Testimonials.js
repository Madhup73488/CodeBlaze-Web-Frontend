import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Rohan Sharma",
    title: "Software Engineer, TCS",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Codeblaze transformed our operations with a custom ERP system. Their team is professional, responsive, and highly skilled. We couldn't be happier with the result.",
  },
  {
    name: "Priya Patel",
    title: "Product Manager, Infosys",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The mobile app developed by Codeblaze has been a game-changer for our business. It's intuitive, fast, and has received amazing feedback from our users.",
  },
  {
    name: "Amit Singh",
    title: "CTO, Wipro",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    text: "Working with Codeblaze on our cloud migration was a seamless experience. Their expertise in AWS and DevOps is unparalleled.",
  },
  {
    name: "Rohan Sharma",
    title: "Software Engineer, TCS",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Codeblaze transformed our operations with a custom ERP system. Their team is professional, responsive, and highly skilled. We couldn't be happier with the result.",
  },
  {
    name: "Priya Patel",
    title: "Product Manager, Infosys",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The mobile app developed by Codeblaze has been a game-changer for our business. It's intuitive, fast, and has received amazing feedback from our users.",
  },
  {
    name: "Amit Singh",
    title: "CTO, Wipro",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    text: "Working with Codeblaze on our cloud migration was a seamless experience. Their expertise in AWS and DevOps is unparalleled.",
  },
];

const Testimonials = () => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-container" style={{ backgroundColor: 'hsl(var(--website-background))' }}>
      <div className="testimonials-content">
        <h2 className="text-2xl sm:text-3xl font-bold text-left sm:text-center text-gray-900 mb-8">What our <span className="text-red-500">students</span> say</h2>
        <div className="testimonials-slider">
          <div className="testimonials-slider-inner">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card-wrapper">
                <div className="testimonial-card">
                  <div className="testimonial-card-inner">
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="testimonial-author">
                      <img
                        src={testimonial.image}
                        alt={`Avatar of ${testimonial.name}`}
                        className="testimonial-avatar"
                      />
                      <div>
                        <p className="testimonial-name">{testimonial.name}</p>
                        <p className="testimonial-title-text">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
