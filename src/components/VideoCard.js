import React from "react";

import "../styles/video-card.css";

function VideoCard({ embedID }) {
  return (
    <section className="video-card-wrapper">
      <iframe
        className="video-card"
        src={`https://www.youtube.com/embed/${embedID}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="video card"
      />
    </section>
  );
}

export default VideoCard;
