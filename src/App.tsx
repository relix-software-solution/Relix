import { useState } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import { MainPage } from "./pages/Homepage/MainPage";
import { Preloader } from "./components/Preloader";
import { AboutUsPage } from "./pages/AboutUS/AboutUsPage";

const App = () => {
  const [stage, setStage] = useState<
    | "loading"
    | "preloaderShrink"
    | "preloaderRise"
    | "mainMoveUp"
    | "mainScaleUp"
    | "mainShrink"
    | "mainRise"
    | "aboutMoveUp"
    | "aboutShrink"
    | "aboutRise"
    | "aboutScaleUp"
    | "projectShrink"
    | "projectPause"
    | "projectRise"
    | "projectEmbedRise"
    | "projectEmbedScaleUp"
  >("loading");

  const [selectedUrl, setSelectedUrl] = useState<string | undefined>();

  return (
    <div
      style={{
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
        background: "radial-gradient(circle, #000101 50%, #0e3555 100%)",
      }}
    >
      <AnimatePresence mode="wait">
        {/* -------- Preloader -------- */}
        {stage === "loading" && (
          <Preloader
            key="preloader"
            onFinish={() => setStage("preloaderShrink")}
          />
        )}
        {stage === "preloaderShrink" && (
          <motion.div
            key="preloader-shrink"
            initial={{ scale: 1, y: 0 }}
            animate={{ scale: 0.7 }}
            transition={{ duration: 0.7, ease: [0.75, 0.02, 0.26, 1] }}
            onAnimationComplete={() => setStage("preloaderRise")}
            style={preloaderStyle}
          >
            <style>
              {`
          @font-face {
            font-family: "TESLA";
            src: url("/fonts/TESLA.ttf") format("truetype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
        `}
            </style>
            <span
              className="shimmer-effect text-[#fff] text-6xl sm:text-7xl md:text-8xl font-extrabold "
              style={{ letterSpacing: "0.2em", fontFamily: "TESLA" }}
            >
              RELIX
            </span>
          </motion.div>
        )}
        {stage === "preloaderRise" && (
          <motion.div
            key="preloader-rise"
            initial={{ scale: 0.7, y: 0 }}
            animate={{ scale: 0.7, y: "-100vh" }}
            transition={{ duration: 0.5, ease: [0.75, 0.02, 0.26, 1] }}
            onAnimationComplete={() => setStage("mainMoveUp")}
            style={preloaderStyle}
          >
            <style>
              {`
          @font-face {
            font-family: "TESLA";
            src: url("/fonts/TESLA.ttf") format("truetype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
        `}
            </style>
            <span
              className="shimmer-effect text-[#fff] text-6xl sm:text-7xl md:text-8xl font-extrabold"
              style={{ letterSpacing: "0.2em", fontFamily: "TESLA" }}
            >
              RELIX
            </span>
          </motion.div>
        )}
        {/* -------- Main Page -------- */}
        {(stage === "mainMoveUp" ||
          stage === "mainScaleUp" ||
          stage === "mainShrink" ||
          stage === "mainRise") && (
          <motion.div
            key={`main-${stage}`}
            initial={{
              y: stage === "mainMoveUp" ? "100vh" : 0,
              scale:
                stage === "mainMoveUp" ? 0.7 : stage === "mainShrink" ? 1 : 0.7,
            }}
            animate={{
              y: stage === "mainRise" ? "-100vh" : 0,
              scale:
                stage === "mainMoveUp"
                  ? 0.7
                  : stage === "mainScaleUp"
                  ? 1
                  : stage === "mainShrink"
                  ? 0.7
                  : 0.7,
            }}
            transition={{ duration: 0.7, ease: [0.75, 0.02, 0.26, 1] }}
            style={{ ...(getMainContainerStyle(stage) as any) }}
            onAnimationComplete={() => {
              if (stage === "mainMoveUp") setStage("mainScaleUp"); // من تحت → تكبير
              if (stage === "mainShrink") setStage("mainRise"); // تصغير → ارفع لفوق
              if (stage === "mainRise") setStage("aboutMoveUp"); // لما يطلع لفوق → جيب about من تحت
            }}
          >
            <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
              <MainPage
                onOpenProject={(url) => {
                  setSelectedUrl(url);
                  setStage("projectShrink");
                }}
                onNavigate={(page) => {
                  if (page === "about") setStage("mainShrink");
                }}
              />
            </div>
          </motion.div>
        )}
        {/* -------- AboutUs Page -------- */}
        {(stage === "aboutMoveUp" ||
          stage === "aboutScaleUp" ||
          stage === "aboutShrink" ||
          stage === "aboutRise") && (
          <motion.div
            key={`about-${stage}`}
            initial={{
              y: stage === "aboutMoveUp" ? "100vh" : 0,
              scale:
                stage === "aboutMoveUp"
                  ? 0.7
                  : stage === "aboutShrink"
                  ? 1
                  : 0.7,
            }}
            animate={{
              y: stage === "aboutRise" ? "-100vh" : 0,
              scale:
                stage === "aboutMoveUp"
                  ? 0.7
                  : stage === "aboutScaleUp"
                  ? 1
                  : stage === "aboutShrink"
                  ? 0.7
                  : 0.7,
            }}
            transition={{ duration: 0.7, ease: [0.75, 0.02, 0.26, 1] }}
            style={{ ...(mainContainerStyle as any), borderRadius: "0" }}
            onAnimationComplete={() => {
              if (stage === "aboutMoveUp") setStage("aboutScaleUp"); // من تحت → تكبير
              if (stage === "aboutShrink") setStage("aboutRise"); // تصغير → ارفع لفوق
              if (stage === "aboutRise") setStage("mainMoveUp"); // لما يطلع لفوق → جيب main من تحت
            }}
          >
            <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
              <AboutUsPage
                onNavigate={(page) => {
                  if (page === "home") setStage("aboutShrink");
                  if (page === "projects") setStage("aboutShrink");
                }}
              />
            </div>
          </motion.div>
        )}
        {/* -------- Project iframe -------- */}
        {stage === "projectShrink" && (
          <motion.div
            key="algota-shrink"
            initial={{ scale: 1, y: 0, opacity: 1 }}
            animate={{ scale: 0.7, y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.75, 0.02, 0.26, 1] }}
            onAnimationComplete={() => setStage("projectPause")}
            style={mainContainerStyle}
          >
            <MainPage
              onNavigate={(page) => {
                if (page === "about") setStage("mainShrink");
                if (page === "home") setStage("aboutShrink");
              }}
              onOpenProject={(url) => {
                setSelectedUrl(url);
                setStage("projectPause");
              }}
            />
          </motion.div>
        )}
        توقف ثانية بدون تغيير
        {stage === "projectPause" && (
          <motion.div
            key="algota-pause"
            initial={{ scale: 0.7, y: 0, opacity: 1 }}
            animate={{ scale: 0.7, y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            onAnimationComplete={() => setStage("projectRise")}
            style={mainContainerStyle}
          >
            <MainPage
              onNavigate={(page) => {
                if (page === "about") setStage("mainShrink");
                if (page === "home") setStage("aboutShrink");
              }}
              onOpenProject={(url) => {
                setSelectedUrl(url);
                setStage("projectRise");
              }}
            />
          </motion.div>
        )}
        {/* رفع الصفحة الرئيسية لفوق مع اختفاء */}
        {stage === "projectRise" && (
          <motion.div
            key="algota-rise"
            initial={{ scale: 0.7, y: 0, opacity: 1 }}
            animate={{ scale: 0.7, y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.75, 0.02, 0.26, 1] }}
            onAnimationComplete={() => setStage("projectEmbedRise")}
            style={mainContainerStyle}
          >
            <MainPage
              onNavigate={(page) => {
                if (page === "about") setStage("mainShrink");
                if (page === "home") setStage("aboutShrink");
              }}
              onOpenProject={(url) => {
                setSelectedUrl(url);
                setStage("projectEmbedRise");
              }}
            />
          </motion.div>
        )}
        {/* دخول موقع الغوطة من تحت بحجم صغير */}
        {stage === "projectEmbedRise" && (
          <motion.div
            key="project-embed-rise"
            initial={{ y: "100vh", scale: 0.7, opacity: 0 }}
            animate={{ y: "80vh", scale: 0.7, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.75, 0.02, 0.26, 1] }}
            onAnimationComplete={() => setStage("projectEmbedScaleUp")}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              backgroundColor: "#000",
              borderRadius: "24px",
            }}
          >
            <iframe
              src={selectedUrl}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "24px",
              }}
            />
          </motion.div>
        )}
        {/* تكبير موقع الغوطة */}
        {stage === "projectEmbedScaleUp" && (
          <div>
            {/* زر الرجوع */}
            <button
              onClick={() => {
                setSelectedUrl(undefined);
                setStage("mainMoveUp"); // أو preloaderRise لو بدك ترجع مع حركة
              }}
              style={{
                position: "absolute",
                top: "24px",
                left: "20px",
                zIndex: 0,
                color: "white",
                backdropFilter: "blur(24px)",
                border: "2px solid #fff",
                borderRadius: "8px",
                padding: "8px 16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Back
            </button>
            <motion.div
              key="project-embed-scale-up"
              initial={{ scale: 0.7 }}
              animate={{ scale: 0.8 }}
              transition={{ duration: 0.7, ease: [0.75, 0.02, 0.26, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                backgroundColor: "#000",
                borderRadius: "24px",
              }}
            >
              <iframe
                src={selectedUrl}
                style={{
                  background: "none",
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "24px",
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// -------- Styles --------
const preloaderStyle = {
  position: "fixed" as const,
  inset: 0,
  backgroundColor: "#000101",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "5rem",
  color: "#ffffff",
  fontWeight: "bold",
  borderRadius: "24px",
  zIndex: 9999,
};

const mainContainerStyle = {
  position: "absolute" as const,
  inset: 0,
  background: "#000101",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "3rem",
  fontWeight: "bold",
  borderRadius: "24px",
  zIndex: 1,
  overflow: "hidden",
};

const getMainContainerStyle = (stage: string) => ({
  ...mainContainerStyle,
  borderRadius:
    stage === "mainScaleUp" || stage.startsWith("project") ? "0px" : "24px",
});

export default App;
