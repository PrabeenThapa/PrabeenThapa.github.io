import React, { useState, useEffect, useRef } from 'react';
import './projects.css';

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const projects = [
    {
      title: "Personalised Risk Reduction and Toxicity Control in Treatment of Non-Small Cell Lung Cancer (PRICISE)",
      description: "AI-based prediction of radiation-induced esophagitis and pneumonitis using CT images, radiomic, dosiomics, and clinical features.",
      technologies: ["PyTorch", "MONAI", "3D Slicer", "Radiomics", "Optuna"],
      link: "https://github.com/PrabeenThapa",
      moreInfo: [
        "AI-based prediction of radiation-induced esophagitis and pneumonitis using CT images, radiomic, dosiomic, and clinical features.",
        "Data preprocessing and feature engineering on a multicentre dataset of 451 NSCLC patients.",
        "Implemented ML (MLP, SVM, Random Forest, LightGBM, LASSO) and 3D CNN models (ResNet, DenseNet, EfficientNet) with nested cross-validation and Optuna optimisation.",
        "Logistic Regression with Optuna achieved the best ROC-AUC of 0.662, slightly outperforming the best deep learning model (ResNet101, ROC-AUC 0.6561)."
      ]
    },
    {
      title: "Non-Invasive Detection and Stage Classification of Anemia in Pregnant Women in Nepal",
      description: "Automated stage classification of anemia using conjunctival eye images collected across 4 hospitals with 81.30% accuracy.",
      technologies: ["PyTorch", "OpenCV", "U-Net", "Mobile App"],
      link: "https://github.com/PrabeenThapa",
      moreInfo: [
        "Data collection with coordination with 4 different hospitals of Nepal from 437 different patients.",
        "Data labelling and Image processing.",
        "RoI extraction i.e Conjunctiva of the eye using U-Net architecture.",
        "Stage classification of Anemia using extracted conjunctiva of the eye with an accuracy of 81.30%.",
        "Model validation with real patients using mobile application."
      ]
    },
    {
      title: "MRI Reconstruction",
      description: "Reconstructing undersampled radial and k-space MRI data using conventional STCR/GRAPPA and self-supervised DIP architectures.",
      technologies: ["PyTorch", "k-Space", "STCR", "GRAPPA", "DIP"],
      link: "https://github.com/PrabeenThapa",
      moreInfo: [
        "Implemented conventional reconstruction algorithms like STCR, GRAPPA on the reconstruction of Myocardial images from undersampled radial data.",
        "Trained self-supervised model for brain image reconstruction with val loss: 0.0000696, val psnr: 32.01446 dB, val ssim: 0.91213.",
        "Self guided DIP models for image reconstruction."
      ]
    },
    {
      title: "Auto-segmentation of bone anatomy in CT images",
      description: "High-precision volumetric segmentation of skeletal anatomy in multi-slice CT scans achieving 0.983 Dice score.",
      technologies: ["MONAI", "ITK-SNAP", "3D U-Net", "PyTorch"],
      link: "https://github.com/PrabeenThapa",
      moreInfo: [
        "Studied different medical image segmentation algorithms.",
        "Trained model for efficient segmentation of anatomy.",
        "Optimised model for better Dice scores (achieved 0.983).",
        "Hausdorff95 Distance among real and segmented groundtruth in range of 1mm-2mm."
      ]
    },
    {
      title: "Synthetic Medical Imaging using GAN",
      description: "Generative adversarial synthesis and latent diffusion inpainting for producing high-fidelity medical imaging datasets.",
      technologies: ["GANs", "Diffusion Models", "Inpainting", "PyTorch"],
      link: "https://github.com/PrabeenThapa",
      moreInfo: [
        "Deployed GAN model for medical image synthesis.",
        "Fine tuned the model for realistic and sensitive image generation.",
        "Diffusion model for label inpainting to generate segmentation labels."
      ]
    },
    {
      title: "Variants Generation for image patterns",
      description: "Vision Transformer networks and fine-tuned Stable Diffusion pipelines for structured pattern and variant generation.",
      technologies: ["Transformers", "Stable Diffusion", "LoRA", "PyTorch"],
      link: "https://github.com/PrabeenThapa",
      moreInfo: [
        "Transformer network for image generation.",
        "Fine tuned stable diffusion model for variant generation."
      ]
    }
  ];

  const [visible, setVisible] = useState(new Array(projects.length).fill(false)); 
  const projectRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setVisible((prev) => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1 }); 

    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [projects.length]);

  const toggleExpand = (index) => {
    if (expandedProject === index) {
      setExpandedProject(null);
    } else {
      setExpandedProject(index);
    }
  };

  const closeOverlay = () => {
    setExpandedProject(null);
  };

  return (
    <div className="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`project-card ${visible[index] ? 'fade-in' : ''}`}
            data-index={index}
            ref={el => projectRefs.current[index] = el}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="technologies">
              {project.technologies.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>

            <button onClick={() => toggleExpand(index)} className="learn-more-btn">
              Learn More
            </button>

            {expandedProject === index && (
              <div className="extra-info-overlay" onClick={closeOverlay}>
                <div className="extra-info-content" onClick={(e) => e.stopPropagation()}>
                  <button className="overlay-close-btn" onClick={closeOverlay}>✕</button>
                  <ul>
                    {project.moreInfo.map((info, i) => (
                      <li key={i}>{info}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
