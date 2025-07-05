import React, { useState, useEffect } from "react";
import "./Cursor.css";

const Cursor = () => {
  const [points, setPoints] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth > 768;

    if (!isDesktop) {
      return;
    }

    const handleMouseMove = (e) => {
      setPoints((points) => [...points.slice(-10), { x: e.clientX, y: e.clientY }]);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest("a, button")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest("a, button")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {points.map((point, index) => (
        <div
          key={index}
          className={`cursor-trail ${isHovering ? "hovering" : ""}`}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            transition: `transform ${index * 0.02}s ease-out`,
          }}
        />
      ))}
      <div
        className={`cursor-flashlight ${isHovering ? "hovering" : ""}`}
        style={{
          left: `${points[points.length - 1]?.x || 0}px`,
          top: `${points[points.length - 1]?.y || 0}px`,
        }}
      />
    </>
  );
};

export default Cursor;
