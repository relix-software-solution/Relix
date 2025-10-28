import { FiArrowUpRight } from "react-icons/fi";
import Contact from "../Homepage/Contact";
import image from "../../assets/avatar.jpg";
import image2 from "../../assets/avatar2.png";
import imageAbout from "../../assets/about.jpg";
import { motion, easeOut, type Variants } from "framer-motion";
import Navbar from "../Homepage/Navbar";

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, ease: easeOut },
  }),
};

const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // مدة الانتقال بين عناصر الكارد
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const AboutUsPage: React.FC<{ onNavigate?: (page: string) => void }> = ({
  onNavigate,
}) => {
  const team = [
    {
      name: "Mohammad Shero",
      role: "Frontend Developer",
      description:
        "Frontend developer specialized in building modern interactive UIs using React and Tailwind.",
      image: image,
      resume: "https://mohammadsh.carrd.co/",
    },
    {
      name: "Bayan Al-Dowir",
      role: "UI/UX Designer",
      description:
        "UI/UX designer passionate about creating simple and elegant user experiences.",
      image: image2,
      resume: "https://bayanaldowir.carrd.co/",
    },
  ];

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <div className="w-[100%]   relative">
        {/* Hero Section */}
        <div className="relative w-full h-[100vh]">
          <img
            src={imageAbout}
            alt="About Us"
            className="absolute inset-0 w-full h-full object-cover rounded-[16px] lg:rounded-[30px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent rounded-[16px] lg:rounded-[30px]" />

          {/* Animated Title */}
          <h1 className="absolute bottom-5 left-5 sm:bottom-10 sm:left-10 text-3xl xs:text-4xl sm:text-6xl font-extrabold text-white">
            {"About Us".split(" ").map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={lineVariants}
                className="mr-2 inline-block" // مسافة بين الكلمات
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>
      </div>
      {/* Team Section */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          {"Our Team".split(" ").map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={lineVariants}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300"
              variants={cardContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
            >
              <motion.img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white/20 object-cover"
                variants={cardItemVariants}
              />
              <motion.h3
                className="text-2xl font-semibold"
                variants={cardItemVariants}
              >
                {member.name}
              </motion.h3>
              <motion.p
                className="text-sm text-gray-300"
                variants={cardItemVariants}
              >
                {member.role}
              </motion.p>
              <motion.p
                className="mt-3 text-sm leading-relaxed"
                variants={cardItemVariants}
              >
                {member.description}
              </motion.p>
              <motion.div className="mt-5" variants={cardItemVariants}>
                <a
                  href={member.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white text-sm font-normal"
                >
                  Resume <FiArrowUpRight className="text-sm" />
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <Contact />
    </>
  );
};
