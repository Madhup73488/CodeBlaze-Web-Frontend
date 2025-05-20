import React, { useState } from "react";

// Reusable component for a single article card
const ArticleCard = ({
  title,
  author,
  description,
  content,
  theme,
  colorStyles,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-lg overflow-hidden transition-all duration-300 mb-6"
      style={{
        background: theme === "dark" ? "#1a1a1a" : "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Card Header */}
      <div className="p-6">
        <h3
          className="text-2xl font-bold mb-2"
          style={{
            color: theme === "dark" ? "#fff" : "#111",
          }}
        >
          {title}
        </h3>
        <p
          className="text-sm mb-4"
          style={{
            color: theme === "dark" ? "#ccc" : "#666",
          }}
        >
          By {author}
        </p>
        <p
          className="mb-4"
          style={{
            color: theme === "dark" ? "#f5f5f7" : "#333",
          }}
        >
          {description}
        </p>

        {/* Read More Button */}
        <button
          className="font-semibold rounded-lg px-4 py-2 flex items-center transition-all duration-200"
          onClick={() => setExpanded(!expanded)}
          style={{
            backgroundColor: theme === "dark" ? "#ff6b00" : "#007bff",
            color: "#fff",
          }}
        >
          {expanded ? "Show Less" : "Read More"}
          <span className="ml-2">{expanded ? "↑" : "↓"}</span>
        </button>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div
          className="px-6 pb-6"
          style={{
            color: theme === "dark" ? "#ccc" : "#444",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

// Collection of Resume Writing Tips
const ResumeWritingTips = ({ theme, colorStyles }) => {
  // Tips data
  const resumeTips = [
    {
      id: 1,
      title: "Effective Resume Writing Tips",
      author: "CodeBlaze Team",
      description:
        "Learn how to craft a compelling resume that stands out to recruiters.",
      content: (
        <div className="space-y-4">
          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            1. Tailor Your Resume to the Job
          </h4>
          <p>
            Customize your resume for each position you apply for. Highlight
            relevant skills and experiences that match the job description. Use
            keywords from the job posting to help your resume pass through
            Applicant Tracking Systems (ATS).
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            2. Use a Clean, Professional Format
          </h4>
          <p>
            Choose a simple, easy-to-read font and maintain consistent
            formatting throughout. Use bullet points to list accomplishments and
            responsibilities. Include adequate white space to make your resume
            visually appealing and easy to scan.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            3. Start with a Strong Summary
          </h4>
          <p>
            Begin your resume with a compelling professional summary that
            highlights your key qualifications and career goals. This gives
            recruiters an immediate snapshot of your value proposition.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            4. Quantify Your Achievements
          </h4>
          <p>
            Use numbers and percentages to demonstrate your impact. For example,
            "Increased sales by 25%" or "Managed a team of 15 people" provides
            concrete evidence of your contributions and capabilities.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            5. Highlight Relevant Skills
          </h4>
          <p>
            Include a dedicated skills section that showcases both technical and
            soft skills relevant to the position. This allows recruiters to
            quickly identify if you have the necessary qualifications.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            6. Keep it Concise
          </h4>
          <p>
            Aim for a one-page resume if you have less than 10 years of
            experience. Focus on your most recent and relevant positions, and
            avoid including outdated or irrelevant information.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            7. Use Action Verbs
          </h4>
          <p>
            Start bullet points with strong action verbs like "achieved,"
            "implemented," "developed," or "led" to convey confidence and
            emphasize your contributions.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            8. Include Keywords
          </h4>
          <p>
            Incorporate industry-specific keywords and phrases throughout your
            resume to optimize for ATS and demonstrate your familiarity with the
            field.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            9. Proofread Carefully
          </h4>
          <p>
            Eliminate spelling errors, grammatical mistakes, and
            inconsistencies. Ask someone else to review your resume to catch
            errors you might have missed.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            10. Update Regularly
          </h4>
          <p>
            Keep your resume current by adding new skills, certifications, and
            accomplishments as you acquire them. Review and refresh your resume
            at least twice a year.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Resume Formatting Guidelines",
      author: "CodeBlaze Team",
      description:
        "Master the visual aspects of your resume with these formatting tips.",
      content: (
        <div className="space-y-4">
          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            1. Select an Appropriate Font
          </h4>
          <p>
            Use professional fonts like Arial, Calibri, or Georgia. Maintain a
            font size between 10-12 points for body text and 14-16 points for
            headings.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            2. Utilize Strategic White Space
          </h4>
          <p>
            Include appropriate margins (typically 1 inch on all sides) and
            spacing between sections to improve readability and give your resume
            a clean look.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            3. Maintain Consistent Formatting
          </h4>
          <p>
            Keep your formatting choices consistent throughout your resume. This
            includes bullet styles, indentation, bold/italic usage, and spacing.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            4. Use Bullet Points Effectively
          </h4>
          <p>
            Limit bullet points to 4-6 per position and keep them concise. Start
            each bullet with an action verb and focus on achievements rather
            than just job duties.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            5. Create Visual Hierarchy
          </h4>
          <p>
            Use different font sizes, bolding, and spacing to create a clear
            hierarchy of information, making it easier for recruiters to
            navigate your resume.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "Common Resume Mistakes to Avoid",
      author: "CodeBlaze Team",
      description:
        "Learn what pitfalls to watch out for when creating your professional resume.",
      content: (
        <div className="space-y-4">
          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            1. Including an Objective Statement
          </h4>
          <p>
            Replace outdated objective statements with a professional summary
            that highlights your qualifications and what you bring to the table.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            2. Using a Generic Template
          </h4>
          <p>
            Avoid using overly common templates that don't allow your unique
            qualifications to stand out. Personalize your resume layout while
            keeping it professional.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            3. Including Irrelevant Information
          </h4>
          <p>
            Omit information that doesn't contribute to your qualifications for
            the specific job, such as hobbies or outdated positions that aren't
            relevant.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            4. Neglecting to Proofread
          </h4>
          <p>
            Spelling and grammatical errors can instantly disqualify you. Always
            proofread carefully and have someone else review your resume as
            well.
          </p>

          <h4
            className="text-xl font-semibold"
            style={{ color: theme === "dark" ? "#fff" : "#111" }}
          >
            5. Using Unprofessional Contact Information
          </h4>
          <p>
            Ensure your email address is professional and appropriate for job
            applications. Avoid nicknames or humorous email addresses.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section
      className="py-20"
      style={{
        background: theme === "dark" ? "rgb(13, 13, 13)" : "#f5f5f7",
        color: theme === "dark" ? "#f5f5f7" : "#111",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Professional Resume Resources
          </h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{
              backgroundColor: theme === "dark" ? "#ff6b00" : "#007bff",
            }}
          ></div>
          <p className="mt-6 max-w-2xl mx-auto text-lg">
            Enhance your job search with our expert resume writing advice and
            tips.
          </p>
        </div>

        {/* Article grid */}
        <div className="max-w-4xl mx-auto grid gap-6">
          {resumeTips.map((tip) => (
            <ArticleCard
              key={tip.id}
              title={tip.title}
              author={tip.author}
              description={tip.description}
              content={tip.content}
              theme={theme}
              colorStyles={colorStyles}
            />
          ))}
        </div>

        {/* Newsletter signup */}
        <div
          className="max-w-4xl mx-auto mt-12 p-6 rounded-lg"
          style={{
            background: theme === "dark" ? "#1a1a1a" : "#ffffff",
          }}
        >
          <h3
            className="text-xl font-bold mb-4"
            style={{
              color: theme === "dark" ? "#fff" : "#111",
            }}
          >
            Get More Career Tips
          </h3>
          <p
            className="mb-4"
            style={{
              color: theme === "dark" ? "#ccc" : "#444",
            }}
          >
            Subscribe to our newsletter for weekly career advice, resume
            templates, and job search strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="p-3 rounded-lg flex-grow"
              style={{
                backgroundColor: theme === "dark" ? "#333" : "#f5f5f7",
                color: theme === "dark" ? "#fff" : "#333",
                border: theme === "dark" ? "1px solid #444" : "1px solid #ddd",
              }}
            />
            <button
              className="p-3 rounded-lg font-medium"
              style={{
                backgroundColor: theme === "dark" ? "#ff6b00" : "#007bff",
                color: "#fff",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeWritingTips;
