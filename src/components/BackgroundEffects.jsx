import { useEffect } from 'react';

export const BackgroundEffects = () => {
    useEffect(() => {
        createBackgroundRoses();
        createEffects();
    }, []);

    const createBackgroundRoses = () => {
        const container = document.getElementById('bgRoses');
        if (!container) return;

        for (let i = 0; i < 25; i++) {
            const rose = document.createElement('div');
            rose.className = 'rose-petal';
            rose.style.left = Math.random() * 100 + 'vw';
            rose.style.width = Math.random() * 15 + 10 + 'px';
            rose.style.height = Math.random() * 15 + 10 + 'px';
            rose.style.animationDuration = (Math.random() * 5 + 5) + 's';
            rose.style.backgroundColor = `hsl(${Math.random() * 20 + 340}, 80%, 60%)`;
            container.appendChild(rose);
        }
    };

    const createEffects = () => {
        const sparkles = document.getElementById('sparkles');
        const hearts = document.getElementById('floatingHeartsContainer');

        if (sparkles) {
            for (let i = 0; i < 30; i++) {
                const s = document.createElement('div');
                s.className = 'sparkle-bg';
                s.style.left = Math.random() * 100 + 'vw';
                s.style.top = Math.random() * 100 + 'vh';
                s.style.animationDelay = Math.random() * 3 + 's';
                sparkles.appendChild(s);
            }
        }

        if (hearts) {
            for (let i = 0; i < 15; i++) {
                const h = document.createElement('div');
                h.className = 'floating-heart-bg';
                h.innerHTML = '❤';
                h.style.left = Math.random() * 100 + 'vw';
                h.style.fontSize = (Math.random() * 30 + 10) + 'px';
                h.style.animationDuration = (Math.random() * 10 + 10) + 's';
                h.style.animationDelay = Math.random() * 5 + 's';
                hearts.appendChild(h);
            }
        }
    };

    return (
        <>
            <div className="rose-bg" id="bgRoses"></div>
            <div id="sparkles"></div>
            <div id="floatingHeartsContainer" className="absolute inset-0 overflow-hidden pointer-events-none"></div>
        </>
    );
};
