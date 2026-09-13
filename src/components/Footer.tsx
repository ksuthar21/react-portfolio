import Contact from "./Contact";
import Stars from "./Stars";

const Footer = () => {
  return (
    <footer id="footer">
      <Stars count={100} />

      <Contact />

      <div className="content">
        Made with ❤️ By{" "}
        <a
          href="https://www.linkedin.com/in/kiransuthar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kiran Suthar
        </a>
      </div>
    </footer>
  );
};

export default Footer;
