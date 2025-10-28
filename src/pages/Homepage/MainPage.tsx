import {
  FaGithub,
  FaWhatsapp,
  FaTelegramPlane,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import "../../index.css";
import spaceVideo from "../../assets/test.mp4";
// import poster from "../../assets/poster1.png";
import { RotatingText } from "../../components/RotatingText";
import { Projects } from "./Projects";
import Services from "./Services";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import { motion, easeOut, type Variants } from "framer-motion";
import Navbar from "./Navbar";
import { useState } from "react";
import { AboutUsPage } from "../AboutUS/AboutUsPage";

type MainPageProps = {
  onOpenProject: (url: string) => void;
  onNavigate: (page: string) => void;
};

export function MainPage({ onOpenProject, onNavigate }: MainPageProps) {
  const [currentPage] = useState<"main" | "about">("main");

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: easeOut },
    }),
  };

  return (
    <>
      <Navbar onNavigate={onNavigate} />

      <div className="w-full h-full ">
        {currentPage === "main" && (
          <>
            {/* ================= HERO SECTION ================= */}
            <section
              id="home"
              className="relative w-full h-screen overflow-hidden "
            >
              {/* Background Video */}
              <video
                src={spaceVideo}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* Social Icons */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col gap-3 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <SocialIcon
                  href="https://www.facebook.com/people/Relix-Software-Solutions/61580505101436/"
                  Icon={FaFacebook}
                  color="hover:text-blue-500"
                />
                <SocialIcon
                  href="https://www.instagram.com/relix.software.solutions/"
                  Icon={FaInstagram}
                  color="hover:text-pink-500"
                />
                <SocialIcon
                  href="https://www.linkedin.com/company/relix-software-solutions/"
                  Icon={FaLinkedin}
                  color="hover:text-sky-600"
                />
                <SocialIcon
                  href="https://github.com/relix-software-solution"
                  Icon={FaGithub}
                  color="hover:text-gray-300"
                />
                <SocialIcon
                  href="https://wa.me/963953670264"
                  Icon={FaWhatsapp}
                  color="hover:text-green-400"
                />
                <SocialIcon
                  href="https://t.me/MohammadShero"
                  Icon={FaTelegramPlane}
                  color="hover:text-sky-400"
                />
                <SocialIcon
                  href="mailto:mo3206213@gmail.com"
                  Icon={FaEnvelope}
                  color="hover:text-red-400"
                />
              </div>

              {/* Text Overlay */}
              <div className="absolute z-20 bottom-8 left-6 sm:left-[5%] text-white text-left">
                <motion.h1
                  className="text-3xl sm:text-5xl font-extrabold leading-tight"
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  custom={0}
                >
                  We craft digital
                </motion.h1>

                <motion.h1
                  className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4"
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  custom={1}
                >
                  experiences
                </motion.h1>

                <RotatingText
                  texts={[
                    "Web Development",
                    "App Development",
                    "UI & UX Design",
                  ]}
                  interval={2500}
                />
              </div>

              {/* CTA Button */}
              <div className="hidden md:flex absolute z-20 bottom-12 right-[5%] items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white cursor-pointer transition-all hover:bg-white/20">
                <span className="text-sm sm:text-base font-medium">
                  Discover more
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </section>

            {/* ================= OTHER SECTIONS ================= */}
            <Projects onOpenProject={onOpenProject} />
            <Services />
            <AboutUs />
            <Contact />
          </>
        )}

        {currentPage === "about" && <AboutUsPage />}
      </div>
    </>
  );
}

/* -------- Social Icon Component -------- */
type SocialIconProps = {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string; // هنا تمرّر "hover:text-green-400"
};

function SocialIcon({ href, Icon, color }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-white transition-colors ${color}`}
    >
      <Icon className="w-6 h-6" />
    </a>
  );
}
