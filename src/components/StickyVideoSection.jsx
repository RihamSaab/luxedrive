import React from "react";
import styled from "styled-components";
import video from "../assets/images/carsVd.mp4";

export default function StickyVideoSection() {
  return (
    <Section>
      <VideoBackground autoPlay muted loop playsInline>
        <source src={video} type="video/mp4" />
      </VideoBackground>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh; /* video height */
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* content will go over the video */
`;
