import { useState } from "react";
import type { FC, MouseEvent } from "react";
import { motion, type Variants } from "framer-motion";
import image1 from "../../assets/S1.webp";
import image2 from "../../assets/S2.webp";
import image3 from "../../assets/S3.webp";
import image4 from "../../assets/S4.webp";
import bg from "../../assets/bg.png";

// أمثلة لشعارات الأدوات (استبدلها بصورك)
import tsLogo from "../../assets/Icons/ts.svg";
import jsLogo from "../../assets/Icons/js.svg";
import reactLogo from "../../assets/Icons/react.svg";
import figmaLogo from "../../assets/Icons/figma.svg";
import nodeLogo from "../../assets/Icons/node.svg";
import muiLogo from "../../assets/Icons/mui.svg";
import tailwindLogo from "../../assets/Icons/tailwind.svg";
import flutterLogo from "../../assets/Icons/flutter.svg";
import firebaseLogo from "../../assets/Icons/firebase.svg";
import framerMotionLogo from "../../assets/Icons/framerMotion.svg";
import i18nextLogo from "../../assets/Icons/i18next.svg";
import gitLogo from "../../assets/Icons/git.svg";
import vercelLogo from "../../assets/Icons/vercel.svg";

interface Service {
  id: string;
  title: string;
  desc: string;
  imgSrc: string;
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const ServiceRow: FC<{ service: Service }> = ({ service }) => {
  const [showImg, setShowImg] = useState(false);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const imgWidth = 300;
  const imgHeight = 300;

  const isDesktop = window.innerWidth >= 1025; // lg breakpoint

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return; // ما يعمل شي إلا بالديسكتوب
    setImgPos({
      x: e.clientX + 10, // تبقى بالوسط أفقياً
      y: e.clientY + 10, // تحت الماوس بـ 10px (تقدر تزيد أو تنقص)
    });
  };

  const handleMouseEnter = () => {
    if (isDesktop) setShowImg(true);
  };

  const handleMouseLeave = () => {
    if (isDesktop) setShowImg(false);
  };

  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center gap-6 py-6 border-b-2 border-gray-300"
      >
        <div className="text-xl font-bold min-w-[40px]">{service.id}</div>
        <div className="flex flex-col w-1/4">
          <div className="text-2xl font-semibold text-white">
            {service.title}
          </div>
        </div>
        <div className="text-sm text-white-600 w-1/4 hidden sm:block font-sans">
          <div>{service.desc}</div>
          <div className="absolute bottom-10 right-5 z-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-7-7l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {isDesktop && showImg && (
        <img
          src={service.imgSrc}
          alt={service.title}
          draggable={false}
          style={{
            position: "fixed",
            opacity: 0.8,
            objectFit: "cover",
            left: imgPos.x,
            top: imgPos.y,
            width: imgWidth,
            height: imgHeight,
            pointerEvents: "none",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "transform 0.1s ease-out",
            zIndex: 9999,
            userSelect: "none",
          }}
        />
      )}
    </>
  );
};

const Services: FC = () => {
  const services: Service[] = [
    {
      id: "01",
      title: "Web Design",
      desc: "Creating visually appealing and user-friendly websites that engage visitors and enhance brand presence.",
      imgSrc: image1,
    },
    {
      id: "02",
      title: "App development",
      desc: "Building responsive and efficient mobile applications tailored to meet business and user needs.",
      imgSrc: image2,
    },
    {
      id: "03",
      title: "UI UX Design",
      desc: "Designing intuitive interfaces and seamless user experiences to maximize usability and satisfaction.",
      imgSrc: image3,
    },
    {
      id: "04",
      title: "Programming",
      desc: "Writing clean, efficient code to develop robust software solutions across various platforms and technologies.",
      imgSrc: image4,
    },
  ];

  const tools = [
    { src: jsLogo, alt: "JavaScript" },
    { src: reactLogo, alt: "React" },
    { src: flutterLogo, alt: "flutter" },
    { src: tsLogo, alt: "TypeScript" },
    { src: figmaLogo, alt: "Figma" },
    { src: nodeLogo, alt: "Node.js" },
    { src: muiLogo, alt: "MUI" },
    { src: tailwindLogo, alt: "Tailwind" },
    { src: firebaseLogo, alt: "Firebase" },
    { src: framerMotionLogo, alt: "Framer Motion" },
    { src: i18nextLogo, alt: "i18next" },
    { src: vercelLogo, alt: "Vercel" },
    { src: gitLogo, alt: "Git" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* الخلفية فقط */}
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px) brightness(0.6)", // تمويه + تخفيف إضاءة
          opacity: 0.8, // خفف الشفافية شوي
        }}
        className="absolute inset-0"
      />

      {/* المحتوى فوق الخلفية */}
      <section
        className="relative z-10 w-[90%] mx-auto px-4 py-16 text-white"
        id="services"
      >
        <motion.div className="flex flex-col sm:flex-row justify-between mb-12">
          <motion.h2
            className="text-4xl font-bold text-white mr-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            viewport={{ once: false }}
          >
            Services
          </motion.h2>

          <motion.div
            className="max-w-lg flex-grow text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={containerVariants}
          >
            {`We offer a wide range of digital services tailored to help your business thrive.`
              .split(". ")
              .map((line, i) => (
                <motion.p
                  key={i}
                  className="leading-relaxed text-2xl sm:text-3xl mb-2 "
                  variants={textVariants}
                >
                  {line}.
                </motion.p>
              ))}
          </motion.div>
        </motion.div>

        <div className="flex flex-col">
          {services.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </div>

        {/* شريط الأدوات أسفل الخدمات */}
        <div className="overflow-hidden mt-16 py-6">
          <motion.div
            className="flex gap-16"
            animate={{
              x: ["0%", "-150%"],
            }}
            transition={{
              duration: 100,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ width: "max-content" }}
          >
            {[...tools, ...tools].map((tool, idx) => (
              <img
                key={idx}
                src={tool.src}
                alt={tool.alt}
                className="h-16 w-auto object-contain filter brightness-0 invert"
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
