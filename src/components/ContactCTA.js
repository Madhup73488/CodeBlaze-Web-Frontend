// components/ContactCTA.js
function ContactCTA({ theme, color }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  return (
    <div
      style={{
        padding: "5rem 5%",
        backgroundColor: theme === "dark" ? "#07071b" : "#f1f5f9",
        textAlign: "center",
        borderRadius: "1rem",
        margin: "4rem 5%",
      }}
    >
      <h2
        style={{
          fontSize: "2.2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          lineHeight: "1.3",
        }}
      >
        <span style={{ color: primaryColor }}>
          Advance Your Digital Journey With Us.
        </span>{" "}
        Get In Touch With CodeBlaze And Let's Move Forward Together
      </h2>

      <p
        style={{
          fontSize: "1.1rem",
          opacity: "0.8",
          maxWidth: "800px",
          margin: "2rem auto",
          lineHeight: "1.6",
        }}
      >
        Whether you are an established business looking to transform digitally
        or a start-up seeking to get off the ground, we have the expertise and
        solutions to meet your bespoke needs.
      </p>

      <button
        style={{
          backgroundColor: primaryColor,
          color: "white",
          padding: "0.75rem 2rem",
          borderRadius: "0.5rem",
          fontWeight: "bold",
          cursor: "pointer",
          border: "none",
          marginTop: "1rem",
        }}
      >
        Get in touch
      </button>
    </div>
  );
}

export default ContactCTA;
