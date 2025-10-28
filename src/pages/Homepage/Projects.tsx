import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, type Variants } from "framer-motion";
import P1 from "../../assets/P1.png";
import P2 from "../../assets/P2.png";
import P3 from "../../assets/P3.png";
import P4 from "../../assets/P4.png";

const projectsData = [
  {
    id: 1,
    title: "Al-Gota",
    imgSrc: P1,
    description: "Al-Gota Food Company.",
    url: "https://algota.com",
  },
  {
    id: 2,
    title: "Al-Omran",
    imgSrc: P2,
    description: "Al-Omran Real Estate Company.",
    url: "https://alomran.sy",
  },
  {
    id: 3,
    title: "GameHub",
    imgSrc: P3,
    description: "Game search website.",
    url: "https://game-hub-rho-silk.vercel.app",
  },
  {
    id: 4,
    title: "Relix",
    imgSrc: P4,
    description: "Technical services website.",
    url: "https://relix-ten.vercel.app",
  },
];

const letterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.03,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    transition: {
      delay: i * 0.02,
    },
  }),
};

type ProjectsProps = {
  onOpenProject: (url: string) => void;
};

export function Projects({ onOpenProject }: ProjectsProps) {
  const controls = useAnimation();

  const cardWidth = 600;
  const projectsCount = projectsData.length;
  const singleWidth = cardWidth * projectsCount;
  const totalWidth = singleWidth * 2;

  const lines = [
    "We take pride in delivering quality",
    "projects that showcase our expertise",
    "and innovation.",
  ];

  const [hoveredLine, setHoveredLine] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 1025);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    controls.start({
      x: [0, -singleWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        },
      },
    });
  }, [controls, singleWidth]);

  return (
    <section
      ref={sectionRef}
      className="w-[90%] mx-auto px-4 py-16 overflow-hidden"
      id="projects"
    >
      <h2 className="text-4xl font-extrabold text-[#53ADE3] mb-4">Projects</h2>

      <div
        className="w-full sm:w-[100%] mb-10 leading-relaxed select-none"
        style={{ fontSize: "clamp(20px, 4vw, 40px)" }}
      >
        {lines.map((line, idx) => {
          const isVisible = hoveredLine >= idx + 1 || isMobile;
          return (
            <motion.p
              key={idx}
              onMouseEnter={() => !isMobile && setHoveredLine(idx + 1)}
              onMouseLeave={() =>
                !isMobile && hoveredLine === idx + 1 && setHoveredLine(idx)
              }
              className="cursor-default flicker-hover-white mb-2"
              style={{
                userSelect: "none",
                whiteSpace: "normal",
                wordWrap: "break-word",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {line.split(" ").map((word, wordIdx) => (
                <motion.span
                  key={wordIdx}
                  custom={wordIdx}
                  variants={letterVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  exit="exit"
                  style={{
                    display: "inline-block",
                    marginRight: "0.35em",
                  }}
                >
                  {word.split("").map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </motion.span>
              ))}
            </motion.p>
          );
        })}
      </div>

      <div className="relative overflow-hidden w-full">
        <motion.div
          animate={controls}
          className="flex space-x-6"
          style={{ width: `${totalWidth}px` }}
        >
          {[...projectsData, ...projectsData].map(
            ({ id, title, imgSrc, description, url }, index) => (
              <a
                key={`${id}-${index}`}
                onClick={() => onOpenProject(url)}
                className="border border-white rounded-lg p-3 w-fit cursor-pointer block"
              >
                <div
                  className="w-[600px] h-[300px] rounded-lg shadow-md overflow-hidden flex-shrink-0 relative"
                  style={{
                    width: window.innerWidth <= 370 ? "300px" : "600px",
                    height: window.innerWidth <= 370 ? "150px" : "300px",
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 z-20 pointer-events-none">
                    <h3 className="text-white text-lg font-semibold mb-1">
                      {title}
                    </h3>
                    <p className="text-white text-sm">{description}</p>
                  </div>
                  <div className="absolute bottom-5 right-5 z-30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 -rotate-45 text-white"
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
                  </div>
                </div>
              </a>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
