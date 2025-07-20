import { Linkedin, Twitter, Instagram } from "lucide-react";

export const footerLinkSections = [
  {
    title: "Main Links",
    links: [
      { text: "Home", path: "/" },
      { text: "Contact Us", path: "/contact" },
      { text: "Privacy Policy", path: "/privacy" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About Us", path: "/aboutus" },
      { text: "Our Team", path: "/ourteam" },
      { text: "Our Mission", path: "/ourmission" },
      { text: "Our Values", path: "/ourvalues" },
      {
        text: "Cancellation and Refund Policy",
        path: "/cancellation-and-refund-policy",
      },
      {
        text: "Shipping and Delivery Policy",
        path: "/shipping-and-delivery-policy",
      },
    ],
  },
];

export const socialLinks = [
  {
    href: "https://www.linkedin.com/company/codeblazee/?viewAsMember=true",
    icon: Linkedin,
  },
  {
    href: "https://www.linkedin.com/company/codeblazee/?viewAsMember=true",
    icon: Twitter,
  },
  {
    href: "https://www.instagram.com/codeblaze.tech/",
    icon: Instagram,
  },
];
