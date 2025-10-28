import { useEffect, useRef, useState } from "react";
import logo from "../../assets/Logo.png";

function FlickerText({ text }: { text: string }) {
  return (
    <span className="flicker-hover text-black">
      {text.split("").map((char, i) => (
        <span key={i}>{char}</span>
      ))}
    </span>
  );
}
function FlickerText1({ text }: { text: string }) {
  return (
    <span className="flicker-hover2 text-black">
      {text.split("").map((char, i) => (
        <span key={i}>{char}</span>
      ))}
    </span>
  );
}

export type NavbarProps = {
  onNavigate?: (page: string) => void;
};

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Projects", id: "projects" },
    { label: "Services", id: "services" },
    { label: "About Us", id: "about-us" },
  ];

  const handleClick = (id: string) => {
    if (id === "about-us" && onNavigate) {
      onNavigate("about"); // ← لما تضغط على About Us
    } else if (id === "home" && onNavigate) {
      onNavigate("home"); // ← لما تضغط على Home
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-1/2 w-[90%]  py-3 px-6 rounded-[16px] shadow-md border- border-[#fff] backdrop-blur-md bg-white/10 text-white font-medium text-sm z-50 flex items-center mt-3 transition-transform duration-300"
        style={{
          transform: `translateX(-50%) translateY(${
            showNavbar ? "0" : "-100px"
          })`,
        }}
      >
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium text-sm flex-1">
          {menuItems.map(({ label, id }) => (
            <li
              key={label}
              className="cursor-pointer"
              onClick={() => handleClick(id)}
            >
              <FlickerText text={label} />
            </li>
          ))}
        </ul>

        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-32  object-contain  cursor-pointer"
          onClick={() => handleClick("home")}
        />

        {/* Contact Button Desktop */}
        <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
          <a
            href="#contact"
            className="relative bg-white rounded-[12px] px-4 py-2 flex items-center space-x-2  text-sm font-medium cursor-pointer"
          >
            <FlickerText1 text="Contact" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 -rotate-45 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {/* Hamburger Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 cursor-pointer ml-auto"
        >
          <span
            className={`block w-6 h-0.5 bg-[#fff] rounded transition-transform duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#fff] rounded transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#fff] rounded transition-transform duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul
          className="md:hidden space-y-3 rounded-[16px] py-4 px-6 shadow-md border border-[#fff] backdrop-blur-md bg-white/10 text-white font-medium text-sm"
          style={{
            position: "fixed",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "1120px",
            width: "90%",
            zIndex: 51,
            marginTop: 0,
          }}
        >
          {menuItems.map(({ label, id }) => (
            <li
              key={label}
              className="cursor-pointer"
              onClick={() => handleClick(id)}
            >
              <FlickerText text={label} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Navbar;
