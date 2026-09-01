import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaHome, FaBook, FaProjectDiagram, FaAward } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaGoogleScholar } from "react-icons/fa6";
import { useWindowSize } from "../utils/useWindowSize";
import "./Dock.css";

function Dock() {
  const size = useWindowSize();
  const isMobile = size.width <= 768;
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const sections = ["home", "publications", "projects", "achievements", "cv"];
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.35,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  if (isMobile) {
    return <MobileDock activeLink={activeLink} setActiveLink={setActiveLink} />;
  }

  return <DesktopDock activeLink={activeLink} setActiveLink={setActiveLink} />;
}

function DesktopDock({ activeLink, setActiveLink }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="dock-container"
    >
      <SocialDockLeft />
      <AppIcon
        icon={<FaHome />}
        link="#home"
        label="Home"
        mouseX={mouseX}
        isActive={activeLink === "#home"}
        setActiveLink={setActiveLink}
      />
      <AppIcon
        icon={<FaBook />}
        link="#publications"
        label="Publications"
        mouseX={mouseX}
        isActive={activeLink === "#publications"}
        setActiveLink={setActiveLink}
      />
      <AppIcon
        icon={<FaProjectDiagram />}
        link="#projects"
        label="Projects"
        mouseX={mouseX}
        isActive={activeLink === "#projects"}
        setActiveLink={setActiveLink}
      />
      <AppIcon
        icon={<FaAward />}
        link="#achievements"
        label="Achievements"
        mouseX={mouseX}
        isActive={activeLink === "#achievements"}
        setActiveLink={setActiveLink}
      />
      <AppIcon
        icon={<div className="cv-icon"><img src="cv.png" alt="CV" /></div>}
        link="#cv"
        label="CV"
        mouseX={mouseX}
        isActive={activeLink === "#cv"}
        setActiveLink={setActiveLink}
      />
      <SocialDockRight />
    </motion.div>
  );
}

function SocialDockLeft() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="social-dock-container-left"
    >
      <SocialIcon
        icon={<MdOutlineMail />}
        link="mailto:thapaprabin.pt@gmail.com" 
        mouseX={mouseX}
      />
      <SocialIcon
        icon={<FaGoogleScholar/>}
        link="#publications"
        mouseX={mouseX}
      />
    </motion.div>
  );
}

function SocialDockRight() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="social-dock-container-right"
    >
      <SocialIcon
        icon={<FaGithub />}
        link="https://github.com/PrabeenThapa"
        mouseX={mouseX}
      />
      <SocialIcon
        icon={<FaLinkedin />}
        link="https://linkedin.com/in/prabinthapa/"
        mouseX={mouseX}
      />
    </motion.div>
  );
}

function MobileDock({ activeLink, setActiveLink }) {
  return (
    <div className="dock-container mobile">
      <MobileAppIcon
        icon={<FaHome />}
        link="#home"
        label="Home"
        isActive={activeLink === "#home"}
        setActiveLink={setActiveLink}
      />
      <MobileAppIcon
        icon={<FaBook />}
        link="#publications"
        label="Publications"
        isActive={activeLink === "#publications"}
        setActiveLink={setActiveLink}
      />
      <MobileAppIcon
        icon={<FaProjectDiagram />}
        link="#projects"
        label="Projects"
        isActive={activeLink === "#projects"}
        setActiveLink={setActiveLink}
      />
      <MobileAppIcon
        icon={<FaAward />}
        link="#achievements"
        label="Awards"
        isActive={activeLink === "#achievements"}
        setActiveLink={setActiveLink}
      />
      <MobileAppIcon
        icon={<div className="cv-icon"><img src="cv.png" alt="CV" /></div>}
        link="#cv"
        label="CV"
        isActive={activeLink === "#cv"}
        setActiveLink={setActiveLink}
      />
    </div>
  );
}

function AppIcon({ icon, link, label, mouseX, isActive, setActiveLink }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const scale = useTransform(distance, [-150, 0, 150], [1, 1.3, 1]);
  const yOffset = useTransform(distance, [-150, 0, 150], [0, -10, 0]);

  const handleClick = (e) => {
    e.preventDefault();
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setActiveLink(link);
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width, scale, y: yOffset }}
      className="dock-item"
      onClick={handleClick}
    >
      <a
        href={link}
        className={`dock-link ${isActive ? "active" : ""}`}
      >
        {icon}
      </a>
      <span className="label">{label}</span>
    </motion.div>
  );
}

function SocialIcon({ icon, link, mouseX }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div ref={ref} style={{ width }} className="social-dock-item">
      <a href={link} target={link.startsWith("#") ? "_self" : "_blank"} rel="noopener noreferrer" className="social-dock-link">
        {icon}
      </a>
    </motion.div>
  );
}

function MobileAppIcon({ icon, link, label, isActive, setActiveLink }) {
  const handleClick = (e) => {
    e.preventDefault();
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    setActiveLink(link);
  };

  return (
    <div className="mobile-dock-item">
      <a
        href={link}
        className={`mobile-dock-link ${isActive ? "active" : ""}`}
        onClick={handleClick}
      >
        {icon}
      </a>
      <span className="label">{label}</span>
    </div>
  );
}

export default Dock;
