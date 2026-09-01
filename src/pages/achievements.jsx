import React, { useEffect, useRef, useState } from 'react';
import './achievements.css';

const Achievements = () => {
  const achievements = [
    {
      title: "Teaching Assistant & Ideathon Pitch — 6th Annual Nepal AI School (ANAIS 2025)",
      organization: "NAAMII (Nepal Applied Mathematics and Informatics Institute for Research)",
      year: "2025–2026",
      link: "https://www.linkedin.com/posts/prabinthapa_anais2025-naamii-activity-7415778907225837570-llmB",
      linkText: "View Post",
      points: [
        "Teaching Assistant for lab sessions on Medical LLMs (LoRA fine-tuning, quantization, medical QA) and computer vision in agriculture (segmentation pipelines).",
        "Pitched Ideathon project AHEAD (Anticipating Hemorrhage Evolution for Acute Decision-making) for intracranial hemorrhage detection from CT scans."
      ]
    },
    {
      title: "University Grants Commission (UGC) — Mini-Research Grant",
      organization: "University Grants Commission, Nepal",
      year: "2025",
      points: [
        "Awarded research grant for the project 'Anemia Detection in Pregnant Women in Nepal Using Deep Learning'.",
        "Coordinated with 4 hospitals in Nepal for clinical data collection and patient surveys (437 patients)."
      ]
    },
    {
      title: "OpenStreetMap (OSM) Hackfest — Runner Up",
      organization: "OpenStreetMap Nepal",
      year: "2023",
      link: "https://www.facebook.com/share/p/1CLAuTDtsd/",
      linkText: "View Post",
      points: [
        "Secured Runner-Up position at OSM Hackfest for developing a Tours and Travels Management web application with an AI-based recommendation system."
      ]
    },
    {
      title: "Executive Committee Member — Club of Technical Students (CoTS)",
      organization: "IOE Paschimanchal Campus, Tribhuvan University",
      year: "2023–2025",
      link: "https://www.facebook.com/cots2013/posts/1489397752434551",
      linkText: "View Post",
      points: [
        "Served in the 9th and 11th Executive Committees of CoTS, organizing technical workshops, hackathons, and student tech events."
      ]
    },
    {
      title: "Instructor — 2-Day LaTeX Workshop",
      organization: "Club of Technical Students (CoTS), IOE Paschimanchal Campus",
      year: "2024",
      link: "https://www.facebook.com/cots2013/posts/1569236234450702",
      linkText: "View Post",
      points: [
        "Conducted hands-on training sessions on LaTeX document preparation and scientific report writing for engineering students."
      ]
    },
    {
      title: "Academic Felicitation — Golden Jubilee",
      organization: "Kalika Secondary School, Palpa",
      year: "2023",
      link: "https://www.facebook.com/share/p/1C3H76a4k3/",
      linkText: "View Post",
      points: [
        "Honored during the Golden Jubilee celebration of Kalika Secondary School for academic excellence."
      ]
    }
  ];

  const [visible, setVisible] = useState(new Array(achievements.length).fill(false));
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setVisible(prev => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    refs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [achievements.length]);

  return (
    <div className="achievements">
      <h2>Achievements & Activities</h2>
      <div className="achievements-list">
        {achievements.map((item, index) => (
          <div 
            key={index}
            data-index={index}
            className={`achievement-item ${visible[index] ? 'fade-in' : ''}`}
            ref={el => refs.current[index] = el}
          >
            <h3>{item.title}</h3>
            <p className="achievement-org">{item.organization}, {item.year}</p>

            <ul className="achievement-points">
              {item.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>

            {item.link && (
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="achievement-link"
              >
                {item.linkText}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
