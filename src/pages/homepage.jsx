import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdOutlineMail } from "react-icons/md";
import { FaGoogleScholar } from "react-icons/fa6";
import { useWindowSize } from '../utils/useWindowSize';
import './homepage.css';

const HomePage = () => {
  const size = useWindowSize();
  const isMobile = size.width <= 768;

  return (
    <div className="homepage">
      <motion.div 
        className="cover-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src="cover.png" alt="Cover" className="cover-img" onError={(e) => { e.target.src = 'cover.jpg'; }} />
      </motion.div>

      <motion.div 
        className="content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img 
          src="prabin.jpg" 
          alt="Prabin Thapa" 
          className="profile-photo"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.h1 
          className="name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Prabin Thapa
        </motion.h1>
        <motion.p 
          className="title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Electronics, Communication & Information Engineering
        </motion.p>
        <motion.p 
          className="expertise"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Applied AI for Medical Image Analysis | Radiomics & Dosiomics | Image Reconstruction
        </motion.p>
        {isMobile && (
          <motion.div 
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <a href="mailto:thapaprabin.pt@gmail.com" title="Email"><MdOutlineMail /></a>
            <a href="#publications" title="Scholar"><FaGoogleScholar /></a>
            <a href="https://linkedin.com/in/prabinthapa/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin /></a>
            <a href="https://github.com/PrabeenThapa" target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub /></a>
          </motion.div>
        )}
        <motion.p 
          className="bio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isMobile ? 1.1 : 0.9, duration: 0.5 }}
        >
          Motivated and research-driven engineer with a focus on applied AI for medical image analysis and intervention planning. Passionate about developing and applying AI-driven methods for medical image interpretation, diagnosis, and image reconstruction.
          <br/><br/>
          Experienced in medical image processing, radiomics, predictive modeling, and deep learning with a strong interest in integrating GenAI and computational analysis in biomedical data to advance healthcare outcomes. Eager to collaborate on impactful biomedical research.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HomePage;
