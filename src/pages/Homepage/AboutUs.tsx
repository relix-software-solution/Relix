import { easeOut, motion, type Variants } from "framer-motion";
import videoSrc from "../../assets/videoSrc.mp4";
import poster from "../../assets/poster2.png";

const textLines = [
  "We are a passionate team dedicated to delivering top-notch digital solutions that drive success",
  "  and innovation.Our expertise spans web development, UI/UX design, app development,",
  " and more.",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as any },
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as any },
  },
};

const videoBoxVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: easeOut },
  },
};

const AboutUs = () => {
  return (
    <section className="w-[90%] mx-auto px-4 py-16" id="about-us">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        {/* Left side */}
        <div className="md:w-1/2">
          <motion.h2
            className="text-4xl font-bold mb-6 text-left text-[#53ADE3]"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            About Us
          </motion.h2>

          <motion.div
            className="text-white text-sm leading-relaxed text-left sm:text-3xl space-y-3 font-sans font-normal"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {textLines.map((line, i) => (
              <motion.p
                key={i}
                variants={lineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Right side */}
        <motion.div
          className="md:w-1/2 flex justify-end border-2 border-black rounded-lg p-[5px] shadow-lg shadow-black/20"
          variants={videoBoxVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }} // يظهر فقط عند الوصول له
        >
          <video
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            className="h-[400px] w-full rounded-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
