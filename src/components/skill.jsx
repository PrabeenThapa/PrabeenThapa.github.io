import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaGit, FaFileExcel, FaBrain, FaCubes, FaWaveSquare } from 'react-icons/fa';
import { SiCplusplus, SiPytorch, SiTensorflow, SiNumpy, SiScikitlearn, SiOpencv, SiPandas, SiJupyter, SiAnaconda } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import './skills.css';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const languages = [
    { name: 'Python', icon: <FaPython /> },
    { name: 'C++', icon: <SiCplusplus /> },
  ];

  const libraries = [
    { name: 'PyTorch', icon: <SiPytorch /> },
    { name: 'MONAI', icon: <FaBrain /> },
    { name: 'TensorFlow', icon: <SiTensorflow /> },
    { name: 'NumPy', icon: <SiNumpy /> },
    { name: 'Pandas', icon: <SiPandas /> },
    { name: 'Scikit-learn', icon: <SiScikitlearn /> },
    { name: 'OpenCV', icon: <SiOpencv /> },
  ];

  const tools = [
    { name: 'Git', icon: <FaGit /> },
    { name: 'VS Code', icon: <VscCode /> },
    { name: 'Jupyter Notebook', icon: <SiJupyter /> },
    { name: 'Conda', icon: <SiAnaconda /> },
    { name: 'ITK-SNAP', icon: <FaCubes /> },
    { name: '3D Slicer', icon: <FaBrain /> },
    { name: 'MATLAB', icon: <FaWaveSquare /> },
    { name: 'Excel', icon: <FaFileExcel /> },
  ];

  const renderIcons = (skillsArray, delayMultiplier) => {
    return skillsArray.map((skill, index) => (
      <motion.div
        key={index}
        className="skill-icon"
        onMouseEnter={() => setHoveredSkill(skill.name)}
        onMouseLeave={() => setHoveredSkill(null)}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: (index * 0.1) + delayMultiplier }}
        viewport={{ once: true }}
      >
        {skill.icon}
        {hoveredSkill === skill.name && <span className="skill-name">{skill.name}</span>}
      </motion.div>
    ));
  };

  return (
    <div className="skills-section">
      <div className="skills-category">
        <h3>Languages</h3>
        <div className="skills-container">
          {renderIcons(languages, 0)}
        </div>
      </div>

      <div className="skills-category">
        <h3>Libraries & Frameworks</h3>
        <div className="skills-container">
          {renderIcons(libraries, 0.2)}
        </div>
      </div>

      <div className="skills-category">
        <h3>Tools & Software</h3>
        <div className="skills-container">
          {renderIcons(tools, 0.4)}
        </div>
      </div>
    </div>
  );
};

export default Skills;
