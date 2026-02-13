import { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';


export const OutroScene = ({ isActive, playSound, config }) => {
    const [showFinal, setShowFinal] = useState(false);
    const slideIntervalRef = useRef(null);
    const currentSlideRef = useRef(0);

    const memories = config?.memories || [];

    useEffect(() => {
        if (isActive) {
            startCinematicSlideshow();
        }

        return () => {
            if (slideIntervalRef.current) {
                clearInterval(slideIntervalRef.current);
            }
        };
    }, [isActive, memories]);

    const startCinematicSlideshow = () => {
        const container = document.getElementById('cinematicWrapper');
        if (!container) return;

        // Clear container
        container.innerHTML = '';
        currentSlideRef.current = 0;
        const totalSlides = memories.length;

        const createSlide = (index) => {
            const item = memories[index];
            const slide = document.createElement('div');
            slide.className = 'cinematic-slide';
            slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.img}')`;
            slide.innerHTML = `<div class="cinematic-text">${item.caption}</div>`;

            container.appendChild(slide);

            // Force reflow
            void slide.offsetWidth;
            slide.classList.add('active');

            // Remove old slides
            if (container.children.length > 2) {
                const oldSlide = container.firstChild;
                oldSlide.style.opacity = '0';
                setTimeout(() => {
                    if (oldSlide.parentNode === container) {
                        container.removeChild(oldSlide);
                    }
                }, 2000);
            }
        };

        // Show first slide immediately
        if (totalSlides > 0) {
            createSlide(currentSlideRef.current);
        }

        // Set interval for remaining slides
        slideIntervalRef.current = setInterval(() => {
            currentSlideRef.current++;

            if (currentSlideRef.current < totalSlides) {
                createSlide(currentSlideRef.current);
            } else {
                clearInterval(slideIntervalRef.current);

                // Show final overlay
                setTimeout(() => {
                    setShowFinal(true);
                    playSound('sfxTada');
                }, 2000);
            }
        }, 5000);
    };

    const handleReplay = () => {
        window.location.reload();
    };

    return (
        <div className={`outro-container ${isActive ? 'active' : ''}`}>
            <div id="cinematicWrapper" className="cinematic-wrapper"></div>
            <div className="film-overlay"></div>

            <div className={`final-overlay-msg ${showFinal ? 'show' : ''}`}>
                <h1 className="final-title">{config?.text?.outroTitle || "Always & Forever"}</h1>
                <button
                    onClick={handleReplay}
                    className="bg-white/20 border-2 border-white/60 text-white px-10 py-4 rounded-full hover:bg-white/40 transition font-bold backdrop-blur-md text-lg"
                >
                    <RefreshCw className="w-5 h-5 mr-2 inline" />
                    {config?.text?.outroButton || "ย้อนดูอีกครั้ง"}
                </button>
            </div>
        </div>
    );
};
