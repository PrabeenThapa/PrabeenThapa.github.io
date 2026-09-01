import React, { useEffect, useRef, useState } from 'react';
import './publications.css';

const Publications = () => {
  const publications = [
    {
      title: "Personalised Risk Reduction and Toxicity Control in Treatment of Non-small Cell Lung Cancer",
      authors: "Prabin Thapa, K. Acharya, S. Baral, and H. N. Tiwari",
      journal: "Target Biomedical Journal",
      year: 2026,
      link: "#",
      status: "Manuscript in preparation"
    },
    {
      title: "Clinical AI in Multi-Hospital Medical Diagnosis & Non-Invasive Patient Screening",
      authors: "Prabin Thapa, et al.",
      journal: "Gandaki University International Conference",
      year: 2026,
      link: "#",
      status: "Conference Presentation"
    }
  ];

  const [isVisible, setIsVisible] = useState(Array(publications.length).fill(false));
  const refs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setIsVisible((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
          observer.unobserve(entry.target); 
        }
      });
    }, options);

    refs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref); 
      }
    });

    return () => {
      if (refs.current) {
        refs.current.forEach(ref => {
          if (ref) {
            observer.unobserve(ref); 
          }
        });
      }
    };
  }, [publications.length]);

  return (
    <div className="publications">
      <h2>Publications</h2>
      <div className="publications-list">
        {publications.map((pub, index) => (
          <div 
            key={index} 
            data-index={index}
            className={`publication-item ${isVisible[index] ? 'fade-in' : ''}`} 
            ref={el => refs.current[index] = el} 
          >
            <h3>{pub.title}</h3>
            <p className="pub-authors">{pub.authors}</p>
            <p className="pub-venue">{pub.journal}, {pub.year}</p>
            <p className="publication-status">{pub.status}</p>
            <a href={pub.link} className="read-more-btn">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publications;
