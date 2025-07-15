import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function ParticlesBg() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,  // Ensure it's behind everything
      }}
      options={{
        fullScreen: { enable: false },  // Important to avoid it taking over root
        background: {
          color: {
            value: "#fbf7f4",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#e8998d", "#880d1e", "#2d3047"],
          },
          links: {
            enable: true,
            color: "#e8998d",
            distance: 120,
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            outModes: {
              default: "out",
            },
          },
          number: {
            value: 40,
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 2, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default ParticlesBg;