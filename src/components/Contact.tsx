import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

const socialLinks = [
  {
    id: "email",
    href: "mailto:ksuthar2016@gmail.com",
    background: "#f5c647",
    icon: <MdMail />,
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/kiransuthar/",
    background: "#0082ca",
    icon: <FaLinkedin />,
  },
  {
    id: "github",
    href: "https://github.com/ksuthar21",
    background: "#333333",
    icon: <FaGithub />,
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/ksuthar21",
    background: "#3b5998",
    icon: <FaFacebookF />,
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/ksuthar__21/",
    background:
      "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
    icon: <FaInstagram />,
  },
  {
    id: "x",
    href: "https://x.com/ksuthar21",
    background: "#000000",
    icon: <FaXTwitter />,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="social-icons">
        <div className="heading-wrapper">
          <h2 className="section-heading heading">Get In Touch</h2>
        </div>

        {socialLinks.map((link) => (
          <a
            key={link.id}
            className="icon"
            style={{ background: link.background }}
            href={link.href}
            target="_new"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
