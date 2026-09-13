import { useEffect, useState } from "react";
import { AVATAR_URL } from "../utils/constants";

const navItems = [
  { href: "#intro", text: "Home" },
  { href: "#projects", text: "Projects" },
  { href: "#about", text: "About" },
  { href: "#contact", text: "Contact" },
];

const sectionIds = navItems.map((item) => item.href.slice(1));

const Header = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#intro");

  // Track the active section with a rAF-throttled scroll handler that reads four
  // bounding rects, instead of hit-testing with elementsFromPoint on every event.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.4;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let current = sectionIds[0];
      if (atBottom) {
        current = sectionIds[sectionIds.length - 1];
      } else {
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= marker) current = id;
        }
      }
      setActive(`#${current}`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header id="header" className={active === "#intro" ? "transparent" : ""}>
      <div className="container">
        <nav id="navbar" className="navbar fixed-top">
          <a className="logo" href="#top">
            <img src={AVATAR_URL} alt="Kiran Suthar" width={50} height={50} />
          </a>
          <button
            className={open ? "nav-menu-toggler open" : "nav-menu-toggler"}
            type="button"
            aria-controls="nav-menu"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
          <div id="nav-menu" className={open ? "nav-menu" : "nav-menu mobile-hidden"}>
            <ul className="nav-items">
              {navItems.map((navItem) => (
                <li className="nav-item" key={navItem.href}>
                  <a
                    className={navItem.href === active ? "nav-link active" : "nav-link"}
                    href={navItem.href}
                    onClick={() => setOpen(false)}
                  >
                    {navItem.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
