import { useEffect, useRef, useState } from "react";
import config from "./links.config.json";
import LinkCard from "./LinkCard.jsx";

function App() {
  const { siteTitle, links } = config;
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.children);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links.length]);

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.children[index];
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(Math.min(activeIndex + 1, links.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(Math.max(activeIndex - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, links.length]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>{siteTitle}</h1>
      </header>

      <div className="feed" ref={containerRef}>
        {links.map((link, index) => (
          <LinkCard
            key={link.id}
            link={link}
            index={index}
            total={links.length}
          />
        ))}
      </div>

      <div className="dots">
        {links.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to link ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
