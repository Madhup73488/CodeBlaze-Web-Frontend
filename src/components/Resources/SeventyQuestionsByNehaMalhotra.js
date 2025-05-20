import React, { useState, useEffect, useRef } from "react";

// Reusable component for a single expandable question
const QuestionItem = ({
  index,
  question,
  answer,
  theme,
  isOpen,
  toggleQuestion,
  isActive,
  onSetActive,
}) => {
  const questionRef = useRef(null);

  useEffect(() => {
    if (isActive && questionRef.current) {
      questionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isActive]);

  return (
    <div
      ref={questionRef}
      className={`rounded-lg mb-4 overflow-hidden transition-all duration-300 ${
        isActive ? "ring-2 ring-offset-2" : ""
      }`}
      style={{
        background: theme === "dark" ? "#1a1a1a" : "#ffffff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        borderColor: isActive
          ? theme === "dark"
            ? "rgb(255, 121, 7)"
            : "rgb(255, 121, 7)"
          : "transparent",
        ringColor: isActive
          ? theme === "dark"
            ? "rgb(255, 121, 7)"
            : "rgb(255, 121, 7)"
          : "transparent",
      }}
      onClick={() => onSetActive(index)}
    >
      <button
        className="w-full p-5 text-left font-semibold flex justify-between items-center transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          toggleQuestion(index);
        }}
        style={{
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
          color: theme === "dark" ? "#f5f5f7" : "#111",
          borderBottom:
            isOpen && theme === "dark"
              ? "1px solid #333"
              : isOpen
              ? "1px solid #eee"
              : "none",
        }}
      >
        <span className="flex-1">
          <span
            className="inline-block w-8 h-8 text-center mr-3 rounded-full"
            style={{
              backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
              color: theme === "dark" ? "#fff" : "#333",
              lineHeight: "2rem",
            }}
          >
            {index + 1}
          </span>
          {question}
        </span>
        <span
          className="text-xl ml-2 flex-shrink-0"
          style={{
            color: theme === "dark" ? "rgb(255, 121, 7)" : "rgb(255, 121, 7)", // Accent color for icon
          }}
        >
          {isOpen ? "-" : "+"}
        </span>
      </button>
      {isOpen && (
        <div
          className="p-5"
          style={{
            backgroundColor: theme === "dark" ? "#242424" : "#f9f9f9",
            color: theme === "dark" ? "#ccc" : "#444",
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
};

const SeventyQuestionsByNehaMalhotra = ({ theme, colorStyles }) => {
  // Your 70 interview questions data
  const interviewQuestions = [
    {
      id: 1,
      question: "Tell me about yourself.",
      answer:
        "Certainly, I'd be happy to. I hold a Bachelor's degree in Computer Science and have spent the last six years working in software development. I've had the opportunity to work on various projects, from developing mobile applications to leading a team of developers in my previous role at XYZ Company. I'm known for my problem-solving skills and my ability to work collaboratively with cross-functional teams. Outside of work, I'm passionate about volunteering for coding boot camps, where I mentor aspiring developers.",
    },
    {
      id: 2,
      question: "Why should we hire you?",
      answer:
        "You should hire me because I bring a unique combination of technical expertise, leadership experience, and a proven track record of delivering results. In my previous role at ABC Inc., I not only led a team that completed a critical project ahead of schedule but also identified and implemented process improvements that saved the company 20% in operational costs. My ability to collaborate effectively and my commitment to continuous learning make me a valuable asset to any team.",
    },
    {
      id: 3,
      question: "What's your greatest strength?",
      answer:
        "One of my greatest strengths is my adaptability. I thrive in dynamic work environments and have consistently demonstrated the ability to learn new technologies quickly. For example, at my previous job, I was asked to lead a project that involved using a programming language I had never worked with before. I immersed myself in learning it and successfully delivered the project on time.",
    },
    {
      id: 4,
      question: "What's your greatest weakness?",
      answer:
        "I used to struggle with delegating tasks, often taking on too much myself. However, I recognized this as a weakness and actively worked on improving my delegation skills. I now understand the importance of empowering team members and have seen how it enhances both productivity and team morale.",
    },
    {
      id: 5,
      question:
        "Can you describe a challenging situation you faced at work and how you handled it?",
      answer:
        "Certainly. In my previous role, we faced a tight deadline to complete a project with a high degree of complexity. The team was under immense pressure, and conflicts started to arise. I took the initiative to organize a team meeting, where we openly discussed our concerns and brainstormed solutions. By fostering open communication and reassigning tasks based on team members' strengths, we not only met the deadline but also improved team dynamics.",
    },
    {
      id: 6,
      question: "Where do you see yourself in 5 years?",
      answer:
        "In five years, I see myself in a leadership role within the company, possibly in a senior project management position. I'm dedicated to continuous growth and would like to leverage my experience to mentor and lead teams to success while contributing to the company's long-term goals.",
    },
    {
      id: 7,
      question: "Why did you leave your last job?",
      answer:
        "I left my last job because I felt that I had outgrown the opportunities it offered. I was seeking new challenges and a role that aligned better with my career goals. I wanted to contribute my skills and expertise to a company where I could make a more significant impact, which is why I'm excited about the opportunity with your organization.",
    },
    {
      id: 8,
      question: "Tell me about a time you failed and what you learned from it.",
      answer:
        "One notable failure occurred when I was managing a project that ended up exceeding the budget due to unforeseen challenges. It was a difficult situation, but I took full responsibility, communicated transparently with stakeholders, and devised a cost-cutting plan. This experience taught me the importance of thorough risk assessment and proactive problem-solving, skills I've since honed to prevent similar issues in the future.",
    },
    {
      id: 9,
      question: "How do you handle stress or pressure?",
      answer:
        "I handle stress and pressure by first staying organized and breaking down tasks into manageable steps. I also prioritize effectively and maintain open communication with my team to ensure everyone is aligned and informed. Additionally, I make it a point to take short breaks to recharge and maintain a healthy work-life balance.",
    },
    {
      id: 10,
      question:
        "Describe a situation where you had to work with a difficult coworker.",
      answer:
        "In my previous role, I encountered a colleague who had a different working style and communication approach, leading to conflicts. To address this, I initiated a one-on-one conversation to understand their perspective and find common ground. We established clear communication guidelines, which significantly improved our collaboration and overall team dynamics.",
    },
    {
      id: 11,
      question: "What's your leadership style?",
      answer:
        "I would describe my leadership style as collaborative and results-oriented. I believe in empowering team members to make decisions within their areas of expertise while providing clear guidance and support. I also emphasize setting measurable goals and regularly checking progress to ensure we stay on track.",
    },
    {
      id: 12,
      question:
        "How do you stay updated with industry trends and developments?",
      answer:
        "I stay updated with industry trends by subscribing to industry-specific publications, participating in webinars and conferences, and actively engaging with professional networks and forums. Additionally, I make it a priority to seek out online courses and certifications to continually enhance my skills and knowledge.",
    },
    {
      id: 13,
      question: "What do you know about our company?",
      answer:
        "I've thoroughly researched your company and am impressed by your innovative products and commitment to sustainability. Your recent expansion into international markets caught my attention, and I believe my experience in global project management aligns well with your company's growth trajectory. Your mission to improve people's lives through technology resonates with my personal and professional values.",
    },
    {
      id: 14,
      question: "Why do you want to work here?",
      answer:
        "I want to work here because I'm drawn to your company's culture of innovation and your commitment to making a positive impact on the world. Your reputation for fostering employee growth and development also aligns perfectly with my career aspirations. I'm excited about the opportunity to contribute my skills and be part of a dynamic team.",
    },
    {
      id: 15,
      question:
        "Can you provide an example of a time you had to adapt to a change at work?",
      answer:
        "Certainly. In my previous role, our company underwent a significant software migration project that required all employees to learn a new system. I embraced this change by proactively seeking training, assisting colleagues in the transition, and providing feedback to improve the process. As a result, our team adapted quickly, and the transition was remarkably smooth.",
    },
    {
      id: 16,
      question: "What motivates you in your career?",
      answer:
        "What motivates me is the opportunity to continually learn and grow professionally. I thrive when I can tackle new challenges and expand my skill set. Additionally, I find great motivation in knowing that my work contributes to the success of the team and the company as a whole.",
    },
    {
      id: 17,
      question:
        "Describe a project where you had to meet tight deadlines. How did you manage it?",
      answer:
        "I encountered a project where we had an unexpectedly tight deadline due to a client's urgent request. To meet the deadline, I implemented a structured project plan, allocated tasks based on team members' strengths, and closely monitored progress. We also maintained open communication with the client, managing expectations and delivering the project on time.",
    },
    {
      id: 18,
      question:
        "What is your preferred work style: working independently or in a team?",
      answer:
        "I value both working independently and collaborating with a team. I find that independent work allows me to focus and execute tasks efficiently, while teamwork fosters creativity and diverse perspectives. My approach depends on the project's requirements, and I'm adaptable in both scenarios.",
    },
    {
      id: 19,
      question: "How do you handle constructive criticism?",
      answer:
        "I welcome constructive criticism as an opportunity for growth. When receiving feedback, I actively listen, ask clarifying questions, and express gratitude for the input. I then take the feedback to heart and use it to improve my performance. Constructive criticism has been instrumental in my professional development.",
    },
    {
      id: 20,
      question:
        "Can you discuss a time you had to resolve a customer's complaint or issue?",
      answer:
        "Certainly. In my previous role as a customer service representative, I encountered a situation where a customer was dissatisfied with our product. I empathized with their frustration, actively listened to their concerns, and offered a solution that exceeded their expectations. The customer ultimately became a loyal advocate for our brand.",
    },
    {
      id: 21,
      question: "How do you handle ambiguity and uncertainty in a project?",
      answer:
        "I thrive in ambiguous situations by breaking down complex problems into manageable tasks. I also engage in thorough research and consultation with team members to gather insights and make informed decisions. My ability to adapt and remain calm under uncertainty has allowed me to successfully navigate challenging projects.",
    },
    {
      id: 22,
      question:
        "Describe a situation where you had to persuade a team to adopt your idea.",
      answer:
        "In a previous role, I proposed a new project management software to improve efficiency. To persuade the team, I conducted research to highlight the benefits, presented a clear implementation plan, and invited team members to share their input. By addressing concerns and demonstrating the positive impact, we gained unanimous support for the change.",
    },
    {
      id: 23,
      question: "How do you prioritize tasks when you have multiple deadlines?",
      answer:
        "I prioritize tasks by assessing their urgency and importance. I create a task list, assign deadlines, and break down larger projects into smaller, manageable steps. Effective time management, delegation when possible, and regular progress checks help me ensure all deadlines are met.",
    },
    {
      id: 24,
      question:
        "Can you discuss a situation where you had to make a difficult decision at work?",
      answer:
        "Certainly. I was once tasked with deciding whether to allocate additional resources to salvage a project that was falling behind schedule. After conducting a thorough analysis, I made the tough decision to reallocate resources, which temporarily impacted other projects. In the end, the project was successfully completed, and I learned the importance of making data-driven decisions.",
    },
    {
      id: 25,
      question:
        "How do you handle a team member who is not meeting their goals or expectations?",
      answer:
        "When faced with a team member who is struggling, I take a proactive approach. I initiate a private conversation to understand their challenges, offer support, and set clear expectations. If the issues persist, I work with them to develop an improvement plan and provide ongoing feedback and coaching.",
    },
    {
      id: 26,
      question:
        "What do you consider your most significant professional achievement?",
      answer:
        "My most significant professional achievement was leading a cross-functional team that successfully launched a product ahead of schedule, resulting in a 30% increase in revenue for the company. This achievement showcased my leadership and project management skills and had a direct positive impact on the organization's bottom line.",
    },
    {
      id: 27,
      question:
        "Can you describe a time you had to deal with a difficult client or customer?",
      answer:
        "In a previous role, I worked with a particularly demanding client who was dissatisfied with our services. I maintained professionalism, actively listened to their concerns, and took swift action to address their issues. By exceeding their expectations and providing exceptional service, we not only retained the client but also received positive referrals.",
    },
    {
      id: 28,
      question: "How do you handle failure or setbacks in a project?",
      answer:
        "I view failure or setbacks as opportunities for learning and improvement. When faced with setbacks, I conduct a thorough analysis to identify the root causes and develop corrective action plans. This proactive approach ensures that I not only address immediate issues but also prevent similar problems in the future.",
    },
    {
      id: 29,
      question: "What role do ethics and integrity play in your work?",
      answer:
        "Ethics and integrity are fundamental to my work. I believe in conducting business honestly, treating all stakeholders with respect, and adhering to ethical standards and company policies. Upholding these values builds trust, maintains reputation, and contributes to a positive work environment.",
    },
    {
      id: 30,
      question:
        "Describe a situation where you had to handle confidential information.",
      answer:
        "In my previous role, I was entrusted with confidential client data. I ensured its security by following strict protocols, limiting access to authorized personnel, and regularly updating encryption measures. Maintaining confidentiality is a core responsibility, and I take it very seriously.",
    },
    {
      id: 31,
      question: "What's your approach to setting and achieving career goals?",
      answer:
        "I set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals to ensure clarity and attainability. I break down larger career goals into smaller, actionable steps and regularly review progress. Additionally, I seek mentorship and professional development opportunities to stay on track and continuously advance.",
    },
    {
      id: 32,
      question:
        "Can you provide an example of a time you had to lead a team through a crisis?",
      answer:
        "I once led a team that faced a sudden crisis when a key team member had to take medical leave during a critical project phase. I quickly reassigned tasks, adjusted timelines, and communicated transparently with stakeholders about the situation. By leveraging the team's strengths and maintaining focus, we successfully mitigated the crisis and delivered the project on schedule.",
    },
    {
      id: 33,
      question: "How do you stay organized and manage your time effectively?",
      answer:
        "I stay organized by using a combination of digital tools and time management techniques. I maintain a detailed calendar, set priorities, and allocate time for specific tasks. I also practice the Pomodoro Technique to maintain focus and productivity throughout the day.",
    },
    {
      id: 34,
      question:
        "Can you discuss a time you had to negotiate a challenging contract or deal?",
      answer:
        "Certainly. In my previous role, I negotiated a complex contract with a client who had specific demands and tight budget constraints. To reach an agreement, I conducted thorough research, identified mutually beneficial terms, and engaged in open and transparent communication. We successfully closed the deal, and both parties were satisfied with the outcome.",
    },
    {
      id: 35,
      question:
        "How do you handle a situation where you disagree with your supervisor's decision?",
      answer:
        "When I disagree with a supervisor's decision, I approach the situation with respect and professionalism. I seek clarification to understand their perspective, share my viewpoint with supporting evidence, and propose alternative solutions if applicable. Ultimately, I respect their final decision and continue to work collaboratively.",
    },
    {
      id: 36,
      question:
        "Can you describe a time you had to adapt to a new software or technology quickly?",
      answer:
        "Certainly. In a previous role, I was required to learn a new project management software within a short timeframe to effectively manage a project. I immersed myself in online tutorials, attended training sessions, and sought guidance from colleagues with expertise in the software. My dedication paid off, as I became proficient in the software and successfully managed the project.",
    },
    {
      id: 37,
      question:
        "How do you handle a situation where a project is falling behind schedule?",
      answer:
        "When a project is falling behind schedule, I take immediate action by assessing the reasons for the delay, reallocating resources if necessary, and devising a recovery plan. I also maintain transparent communication with stakeholders, keeping them informed about the situation and the steps being taken to get back on track.",
    },
    {
      id: 38,
      question:
        "Can you discuss a time you had to resolve a conflict within your team?",
      answer:
        "In my role as a team leader, I encountered a situation where two team members had a disagreement that was affecting team morale. I facilitated a private discussion, actively listened to both parties, and helped them find common ground. By addressing the issue promptly and effectively, we restored a harmonious working environment.",
    },
    {
      id: 39,
      question:
        "How do you keep yourself motivated and engaged during routine or repetitive tasks?",
      answer:
        "I stay motivated during routine tasks by finding ways to make them more engaging and efficient. I seek opportunities to streamline processes, set personal performance goals, and focus on the larger purpose or impact of the task. This approach helps me maintain a high level of motivation and commitment.",
    },
    {
      id: 40,
      question:
        "Can you discuss a time you had to deliver a presentation to a large audience?",
      answer:
        "Certainly. I had the opportunity to deliver a presentation at an industry conference attended by over 500 professionals. To prepare, I invested time in researching the topic thoroughly, creating engaging visual aids, and practicing my delivery extensively. The presentation was well-received, and it boosted my confidence in public speaking.",
    },
    {
      id: 41,
      question:
        "How do you handle high-pressure situations, such as tight deadlines or unexpected crises?",
      answer:
        "In high-pressure situations, I remain calm and focused by prioritizing tasks, breaking them down into manageable steps, and communicating effectively with the team. I also draw on my problem-solving skills and experience to make informed decisions swiftly.",
    },
    {
      id: 42,
      question:
        "Can you discuss a time when you had to work on a project with limited resources?",
      answer:
        "Certainly. In a previous role, we had a project with budget constraints. To maximize our resources, I identified cost-effective solutions, optimized processes, and leveraged the skills of team members effectively. This allowed us to deliver a successful project within the limitations.",
    },
    {
      id: 43,
      question:
        "What's the most innovative idea you've implemented in your previous role?",
      answer:
        "In my last role, I introduced an automated data analysis tool that significantly reduced manual data entry and processing time, improving efficiency by 40%. This innovation not only saved time but also enhanced data accuracy.",
    },
    {
      id: 44,
      question:
        "How do you stay motivated and productive during remote work or when working independently?",
      answer:
        "To stay motivated and productive during remote work, I establish a dedicated workspace, maintain a structured daily routine, and set clear goals. Regular check-ins with my team and regular breaks help maintain motivation and focus.",
    },
    {
      id: 45,
      question:
        "Describe a situation where you had to manage competing priorities.",
      answer:
        "In a previous role, I had to balance multiple projects with overlapping deadlines. To manage competing priorities, I created a priority matrix, assessed the urgency and importance of each task, and adjusted timelines and resources accordingly. Effective communication with stakeholders ensured everyone was aware of the situation.",
    },
    {
      id: 46,
      question:
        "Can you provide an example of a time when you took the initiative to learn a new skill or technology?",
      answer:
        "Certainly. I recognized the importance of data analytics in my field, so I proactively enrolled in an online data analytics course and earned a certification. This allowed me to bring valuable data-driven insights to my team and improve decision-making.",
    },
    {
      id: 47,
      question: "How do you handle feedback from peers or subordinates?",
      answer:
        "I value feedback as an opportunity for growth. I actively listen, consider the feedback objectively, and express gratitude for the insights. I then use the feedback to make improvements in my work or interactions.",
    },
    {
      id: 48,
      question:
        "Can you discuss a time when you had to navigate a project with a diverse, multicultural team?",
      answer:
        "I had the opportunity to lead a multicultural team on a global project. To ensure effective collaboration, I promoted cultural sensitivity, encouraged open communication, and leveraged each team member's unique strengths. This approach led to a successful project outcome and enhanced team cohesion.",
    },
    {
      id: 49,
      question:
        "How do you keep up with the latest industry trends and developments?",
      answer:
        "I stay current with industry trends by regularly reading industry publications, attending conferences, webinars, and participating in professional associations. I also network with industry peers to exchange insights and ideas.",
    },
    {
      id: 50,
      question:
        "Can you describe a situation where you had to resolve a technical issue under tight time constraints?",
      answer:
        "In a previous role, we faced a technical issue during a critical project phase with a tight deadline. I assembled a cross-functional team, conducted a root cause analysis, and implemented a solution within hours, ensuring the project stayed on track.",
    },
    {
      id: 51,
      question:
        "What's your approach to building and maintaining strong professional relationships?",
      answer:
        "I prioritize building professional relationships by being approachable, open to collaboration, and actively listening to others' perspectives. I also maintain clear and respectful communication and follow up on commitments, which fosters trust and strengthens relationships.",
    },
    {
      id: 52,
      question:
        "Can you discuss a time you had to manage a budget for a project?",
      answer:
        "Certainly. I managed a project budget in my previous role by carefully tracking expenses, identifying cost-saving opportunities, and negotiating with suppliers. This resulted in a 15% cost reduction while still delivering a high-quality project.",
    },
    {
      id: 53,
      question:
        "How do you handle situations where you have conflicting priorities with a colleague or team member?",
      answer:
        "In such situations, I seek a middle ground by engaging in open and respectful dialogue with the colleague or team member. I aim to find a compromise that aligns with the overall goals and priorities of the team or organization.",
    },
    {
      id: 54,
      question:
        "Can you discuss a time when you had to handle a dissatisfied client or customer?",
      answer:
        "In a previous role, I had to address a dissatisfied client who was unhappy with our service. I actively listened to their concerns, offered solutions to rectify the issue, and maintained regular communication to ensure their satisfaction. Ultimately, we turned the situation around, and the client continued to work with us.",
    },
    {
      id: 55,
      question: "How do you handle setbacks or obstacles in your career?",
      answer:
        "I view setbacks and obstacles as opportunities for growth and learning. I reflect on the situation, identify areas for improvement, and adapt my approach accordingly. These experiences have often led to personal and professional development.",
    },
    {
      id: 56,
      question:
        "Can you discuss a time when you had to give a presentation without much preparation time?",
      answer:
        "Certainly. I once had to deliver an impromptu presentation due to a last-minute scheduling change. I drew on my subject knowledge and experience, organized my thoughts quickly, and delivered a concise and informative presentation that received positive feedback from the audience.",
    },
    {
      id: 57,
      question: "What's your strategy for managing stress outside of work?",
      answer:
        "To manage stress outside of work, I prioritize self-care activities such as exercise, meditation, and spending quality time with friends and family. These activities help me relax, recharge, and maintain a healthy work-life balance.",
    },
    {
      id: 58,
      question:
        "Can you provide an example of a time when you had to mediate a conflict between team members?",
      answer:
        "In a team project, two team members had conflicting ideas on the project's direction. I stepped in as a mediator, encouraged open communication, and facilitated a compromise that allowed us to move forward collaboratively and successfully.",
    },
    {
      id: 59,
      question:
        "How do you ensure you're up to date with changes in laws, regulations, or compliance standards relevant to your field?",
      answer:
        "I stay informed about changes in laws, regulations, and compliance standards by regularly reviewing relevant government websites, attending compliance training sessions, and consulting with legal experts when necessary. Compliance is a crucial aspect of my work, and I prioritize staying current.",
    },
    {
      id: 60,
      question:
        "Can you describe a situation when you had to lead a team through a major change or transition?",
      answer:
        "I led a team through a major software system transition that required process changes and retraining. To ensure a smooth transition, I created a detailed transition plan, provided comprehensive training, and offered ongoing support. The team successfully adapted to the change with minimal disruptions.",
    },
    {
      id: 61,
      question:
        "What do you do to stay organized and avoid missing deadlines or commitments?",
      answer:
        "I use digital tools like calendars and task management apps to track deadlines and commitments. I also maintain a prioritized to-do list and regularly review and adjust it as needed. This systematic approach helps me stay organized and meet all my obligations.",
    },
    {
      id: 62,
      question:
        "Can you discuss a time when you had to resolve a disagreement with your supervisor or manager?",
      answer:
        "In a previous role, I had a disagreement with my manager regarding the project's direction. I scheduled a private meeting to discuss our differing perspectives, presented data to support my position, and worked collaboratively to reach a mutually beneficial solution that aligned with the project's goals.",
    },
    {
      id: 63,
      question:
        "How do you handle situations where you need to provide constructive feedback to a team member or colleague?",
      answer:
        "I approach providing constructive feedback with empathy and a focus on improvement. I choose an appropriate time and place, use specific examples, and offer solutions or suggestions for improvement. I aim to foster growth and development while maintaining a positive working relationship.",
    },
    {
      id: 64,
      question:
        "Can you discuss a time when you had to make a decision with incomplete information?",
      answer:
        "I encountered a situation where I had to make a time-sensitive decision with limited information. I gathered available data, consulted relevant experts, and used my judgment to make the best decision under the circumstances. The decision was successful, and it highlighted my ability to make informed choices in challenging situations.",
    },
    {
      id: 65,
      question:
        "What role do mentorship and professional development play in your career?",
      answer:
        "Mentorship and professional development are vital components of my career growth. I actively seek mentorship from experienced professionals to gain valuable insights and guidance. Additionally, I continually invest in professional development opportunities, such as courses and certifications, to stay relevant in my field.",
    },
    {
      id: 66,
      question:
        "Can you describe a situation when you had to motivate a team member who was demotivated or struggling?",
      answer:
        "I once had a team member who was demotivated due to personal challenges. I approached them with empathy, offered support, and worked together to adjust their workload and deadlines. By showing understanding and offering assistance, we successfully helped them regain motivation and contribute positively to the team.",
    },
    {
      id: 67,
      question:
        "How do you ensure your work aligns with the company's mission and values?",
      answer:
        "I regularly refer to the company's mission and values as guiding principles in my work. I ensure that my actions, decisions, and projects align with these values, and I actively contribute to a positive work culture that reflects the company's mission.",
    },
    {
      id: 68,
      question:
        "Can you discuss a time when you had to take on additional responsibilities beyond your job description?",
      answer:
        "In a previous role, my team was short-staffed, and I willingly took on additional responsibilities to ensure project completion. I balanced these tasks alongside my existing workload and communicated effectively with my manager to prioritize deliverables. This flexibility allowed us to meet project deadlines successfully.",
    },
    {
      id: 69,
      question:
        "How do you handle situations where you need to persuade stakeholders or team members to change their opinion or approach?",
      answer:
        "To persuade stakeholders or team members, I focus on presenting data-backed arguments and benefits. I actively listen to their concerns, address any objections, and find common ground. Building consensus through open and respectful communication is key to achieving buy-in for change.",
    },
    {
      id: 70,
      question:
        "Can you provide an example of a time when you had to navigate a project with tight budget constraints?",
      answer:
        "Certainly. I managed a project with tight budget constraints by closely monitoring expenses, negotiating with suppliers for favorable terms, and optimizing resource allocation. By prioritizing essential elements and minimizing non-essential costs, we successfully delivered the project within budget.",
    },
  ];

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [openStates, setOpenStates] = useState(
    interviewQuestions.map(() => false)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuestions, setFilteredQuestions] =
    useState(interviewQuestions);

  // Handle toggling a question's open state
  const toggleQuestion = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  // Navigate to the next question
  const goToNextQuestion = () => {
    if (activeQuestionIndex < filteredQuestions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  // Navigate to the previous question
  const goToPrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  // Open/close all questions
  const toggleAllQuestions = (shouldOpen) => {
    setOpenStates(filteredQuestions.map(() => shouldOpen));
  };

  // Filter questions based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredQuestions(interviewQuestions);
    } else {
      const filtered = interviewQuestions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuestions(filtered);
    }
    setActiveQuestionIndex(0);
  }, [searchTerm]);

  return (
    <section
      className="py-20"
      style={{
        background: theme === "dark" ? "rgb(13 13 13)" : "#f5f5f7",
        color: theme === "dark" ? "#f5f5f7" : "#111",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            70 Toughest Interview Questions and Answers
          </h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: colorStyles.primary }}
          ></div>
          <p className="mt-6 max-w-2xl mx-auto text-lg">
            Notes by Neha Malhotra. Prepare for your next interview with these
            common and challenging questions.
          </p>
        </div>

        {/* Progress tracker */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">
              Question {activeQuestionIndex + 1} of {filteredQuestions.length}
            </div>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 rounded font-medium"
                onClick={() => toggleAllQuestions(true)}
                style={{
                  backgroundColor: theme === "dark" ? "#333" : "#e0e0e0",
                  color: theme === "dark" ? "#fff" : "#333",
                }}
              >
                Expand All
              </button>
              <button
                className="px-4 py-2 rounded font-medium"
                onClick={() => toggleAllQuestions(false)}
                style={{
                  backgroundColor: theme === "dark" ? "#333" : "#e0e0e0",
                  color: theme === "dark" ? "#fff" : "#333",
                }}
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full p-3 rounded-lg"
              style={{
                backgroundColor: theme === "dark" ? "#333" : "#fff",
                color: theme === "dark" ? "#fff" : "#333",
                border: theme === "dark" ? "1px solid #444" : "1px solid #ddd",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Progress bar */}
          <div
            className="w-full h-2 rounded-full mb-6"
            style={{
              backgroundColor: theme === "dark" ? "#333" : "#e0e0e0",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((activeQuestionIndex + 1) / filteredQuestions.length) * 100
                }%`,
                backgroundColor:
                  theme === "dark" ? "rgb(255, 121, 7)" : "rgb(255, 121, 7)",
              }}
            ></div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mb-6">
            <button
              onClick={goToPrevQuestion}
              disabled={activeQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={{
                backgroundColor:
                  theme === "dark" ? "rgb(255 121 7)" : "rgb(255 121 7)",
                color: "#fff",
              }}
            >
              Previous Question
            </button>
            <button
              onClick={goToNextQuestion}
              disabled={activeQuestionIndex === filteredQuestions.length - 1}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeQuestionIndex === filteredQuestions.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              style={{
                backgroundColor:
                  theme === "dark" ? "rgb(255 121 7)" : "rgb(255 121 7)",
                color: "#fff",
              }}
            >
              Next Question
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {filteredQuestions.map((item, index) => (
            <QuestionItem
              key={item.id}
              index={index}
              question={item.question}
              answer={item.answer}
              theme={theme}
              isOpen={openStates[index]}
              toggleQuestion={toggleQuestion}
              isActive={index === activeQuestionIndex}
              onSetActive={setActiveQuestionIndex}
            />
          ))}
        </div>

        {/* Jump to section */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-xl font-bold mb-4">Jump to Question Set</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {[...Array(Math.ceil(filteredQuestions.length / 10))].map(
              (_, i) => (
                <button
                  key={i}
                  className="px-3 py-2 rounded-lg text-sm"
                  style={{
                    backgroundColor:
                      Math.floor(activeQuestionIndex / 10) === i
                        ? theme === "dark"
                          ? "rgb(255, 121, 7)"
                          : "rgb(255, 121, 7)"
                        : theme === "dark"
                        ? "#333"
                        : "#e0e0e0",
                    color:
                      Math.floor(activeQuestionIndex / 10) === i
                        ? "#fff"
                        : theme === "dark"
                        ? "#ccc"
                        : "#333",
                  }}
                  onClick={() => {
                    const newIndex = i * 10;
                    if (newIndex < filteredQuestions.length) {
                      setActiveQuestionIndex(newIndex);
                    }
                  }}
                >
                  {i * 10 + 1}-
                  {Math.min((i + 1) * 10, filteredQuestions.length)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Study mode controls */}
        <div
          className="max-w-4xl mx-auto mt-12 p-6 rounded-lg"
          style={{
            backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
          }}
        >
          <h3 className="text-xl font-bold mb-4">Study Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <button
                className="w-full p-3 rounded-lg font-medium mb-3"
                style={{
                  backgroundColor: theme === "dark" ? "#333" : "#e0e0e0",
                  color: theme === "dark" ? "#fff" : "#333",
                }}
                onClick={() => {
                  // Set a random question as active
                  const randomIndex = Math.floor(
                    Math.random() * filteredQuestions.length
                  );
                  setActiveQuestionIndex(randomIndex);

                  // And open it
                  const newOpenStates = [...openStates];
                  newOpenStates[randomIndex] = true;
                  setOpenStates(newOpenStates);
                }}
              >
                Random Question
              </button>
              <button
                className="w-full p-3 rounded-lg font-medium"
                style={{
                  backgroundColor: theme === "dark" ? "#333" : "#e0e0e0",
                  color: theme === "dark" ? "#fff" : "#333",
                }}
                onClick={() => {
                  // Start from the beginning
                  setActiveQuestionIndex(0);
                  setOpenStates(filteredQuestions.map(() => false));
                }}
              >
                Start Over
              </button>
            </div>
            <div>
              <button
                className="w-full p-3 rounded-lg font-medium mb-3"
                style={{
                  backgroundColor: theme === "dark" ? "#333" : "#e0e0e0",
                  color: theme === "dark" ? "#fff" : "#333",
                }}
                onClick={() => {
                  // Open only active question, close others
                  const newOpenStates = filteredQuestions.map(
                    (_, i) => i === activeQuestionIndex
                  );
                  setOpenStates(newOpenStates);
                }}
              >
                Focus Mode (Show Only Current)
              </button>
              <button
                className="w-full p-3 rounded-lg font-medium"
                style={{
                  backgroundColor:
                    theme === "dark" ? "rgb(255, 121, 7)" : "rgb(255, 121, 7)",
                  color: "#fff",
                }}
                onClick={() => {
                  // Toggle current question
                  const newOpenStates = [...openStates];
                  newOpenStates[activeQuestionIndex] =
                    !newOpenStates[activeQuestionIndex];
                  setOpenStates(newOpenStates);
                }}
              >
                Toggle Current Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeventyQuestionsByNehaMalhotra;
