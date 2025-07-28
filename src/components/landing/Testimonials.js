import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Rohan Sharma",
    title: "Software Engineer, TCS",
    image:
      "https://res.cloudinary.com/duiotumuy/image/upload/v1753719594/Image4_j1uout.webp",
    text: "Codeblaze transformed our operations with a custom ERP system. Their team is professional, responsive, and highly skilled. We couldn't be happier with the result.",
  },
  {
    name: "Priya Patel",
    title: "Software Developer, Infosys",
    image:
      "https://res.cloudinary.com/duiotumuy/image/upload/v1753719595/Image10_nma0ao.webp",
    text: "The mobile app developed by Codeblaze has been a game-changer for our business. It's intuitive, fast, and has received amazing feedback from our users.",
  },
  {
    name: "Amit Singh",
    title: "Product Solution Engineer, Juspay",
    image:
      "https://res.cloudinary.com/duiotumuy/image/upload/v1753719593/Image9_xbnbrb.webp",
    text: "Working with Codeblaze on our cloud migration was a seamless experience. Their expertise in AWS and DevOps is unparalleled.",
  },
  {
    name: "kavita Desai",
    title: "Data Scientist, DeltaX",
    image:
      "https://res.cloudinary.com/duiotumuy/image/upload/v1753719594/Image11_y1ulgi.webp",
    text: "The data analytics platform Codeblaze built for us is incredibly powerful. It has given us insights we never thought possible.",
  },
  {
    name: "Rahul Verma",
    title: "Cybersecurity Analyst, Syntellite",
    image:
      "https://res.cloudinary.com/duiotumuy/image/upload/v1753719593/Image6_blzos7.webp",
    text: "Codeblaze's security audit was thorough and insightful. They helped us identify and fix critical vulnerabilities in our system.",
  },
  {
    name: "Anjali Mehta",
    title: "UX Designer, Tech Mahindra",
    image:
      "https://res.cloudinary.com/duiotumuy/image/upload/v1753719592/Image3_uhi2fg.webp",
    text: "The user experience of our new website, designed by Codeblaze, is exceptional. Our user engagement has increased by 50%.",
  },
  {
    name: "Suresh Kumar",
    title: "DevOps Engineer, Wipro",
    image:
      "https://res.cloudinary.com/duiotumuy/image/upload/v1753719593/Image7_oygm2f.webp",
    text: "Codeblaze helped us streamline our deployment process, reducing our release cycle time by 30%. Their team is top-notch.",
  },
  {
    name: "Kavita Singh",
    title: "AI/ML Engineer, Icici Lombard",
    image:
      "https://res.cloudinary.com/duiotumuy/image/upload/v1753719591/Image1_biwif5.webp",
    text: "The machine learning model developed by Codeblaze has improved our recommendation engine's accuracy by 20%.",
  },
  {
    name: "Rajesh Gupta",
    title: "Blockchain Developer, Polygon",
    image:
      "https://res.cloudinary.com/duiotumuy/image/upload/v1753719592/Image2_q4epqm.webp",
    text: "Codeblaze's expertise in blockchain technology is impressive. They helped us build a secure and scalable decentralized application.",
  },
  {
    name: "Deepak Sharma",
    title: "Full Stack Developer, L&T",
    image:
      "https://res.cloudinary.com/duiotumuy/image/upload/v1753719593/Imgae5_zvxxmq.webp",
    text: "I was able to land my dream job after completing the Full Stack Development course from Codeblaze. The instructors are amazing.",
  },
  {
    name: "Vikas Yadav",
    title: "Backend Developer, Wipro Technologies",
    image:
      "https://res.cloudinary.com/duiotumuy/image/upload/v1753719592/Image8_cxphjq.webp",
    text: "The Backend Development course at Codeblaze is very comprehensive. I learned a lot and was able to build a solid foundation.",
  },
];

const Testimonials = () => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      className="testimonials-container"
      style={{ backgroundColor: "hsl(var(--website-background))" }}
    >
      <div className="testimonials-content">
        <h2 className="text-2xl sm:text-3xl font-bold text-left sm:text-center text-gray-900 mb-8">
          What our <span className="text-red-500">students</span> say
        </h2>
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
                        loading="lazy"
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
