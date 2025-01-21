import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // loads tsparticles-slim
import './welcome.css';

const Welcome = () => {

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        console.log(container);
    }, []);

    const options = {
        fullScreen: false,
        background: {
            color: {
                value: "#111",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: false,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "attract",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                attract: {
                    distance: 200, 
                    duration: 0.4, 
                    easing: "ease-out-quad",
                    factor: 1,
                    maxSpeed: 50,
                    speed: 5
                },
            },
        },
        particles: {
            color: {
                value: "#fff",
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 0.5,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 150,
            },
            opacity: {
                value: { min: 0.1, max: 0.5 },
                animation: {
                    enable: true,
                    minimumValue: 0.1,
                    speed: 1,
                    sync: false,
                },
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    };

    return (
        <div className="welcome-container">
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={options}
                style={{width: '100%', height: '100%', position: 'relative'}}
            />
            <div className="welcome-content">
                <h1>Welcome</h1>
                <p>Explore diverse perspectives, captivating stories, and connect with a vibrant community of readers and writers.</p>
            </div>
        </div>
    );
};

export default Welcome;