import { useEffect } from 'react';

export const BackgroundEffects = () => {
    useEffect(() => {
        // Detect mobile for optimization
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

        // On mobile, we might want to skip some effects entirely if lag persists
        createBackgroundRoses(isMobile);
        createEffects(isMobile);
    }, []);

    const createBackgroundRoses = (isMobile) => {
        const container = document.getElementById('bgRoses');
        if (!container) return;
        container.innerHTML = '';

        // Extreme reduction for mobile (25 -> 5)
        const count = isMobile ? 5 : 25;

        for (let i = 0; i < count; i++) {
            const rose = document.createElement('div');
            rose.className = 'rose-petal';
            rose.style.left = Math.random() * 100 + 'vw';
            rose.style.width = (isMobile ? 10 : 15) + 'px';
            rose.style.height = (isMobile ? 10 : 15) + 'px';
            rose.style.animationDuration = (Math.random() * 5 + (isMobile ? 12 : 7)) + 's';
            rose.style.backgroundColor = `hsl(${Math.random() * 20 + 340}, 80%, 65%)`;
            container.appendChild(rose);
        }
    };

    const createEffects = (isMobile) => {
        const sparkles = document.getElementById('sparkles');
        const hearts = document.getElementById('floatingHeartsContainer');

        // Sparkles are heavy because of box-shadow. Disable on mobile.
        if (sparkles) {
            sparkles.innerHTML = '';
            if (!isMobile) {
                for (let i = 0; i < 30; i++) {
                    const s = document.createElement('div');
                    s.className = 'sparkle-bg';
                    s.style.left = Math.random() * 100 + 'vw';
                    s.style.top = Math.random() * 100 + 'vh';
                    s.style.animationDelay = Math.random() * 3 + 's';
                    sparkles.appendChild(s);
                }
            }
        }

        if (hearts) {
            hearts.innerHTML = '';
            // 15 -> 4 on mobile
            const hCount = isMobile ? 4 : 15;
            for (let i = 0; i < hCount; i++) {
                const h = document.createElement('div');
                h.className = 'floating-heart-bg';
                h.innerHTML = '❤';
                h.style.left = Math.random() * 100 + 'vw';
                h.style.fontSize = (isMobile ? 16 : (Math.random() * 20 + 15)) + 'px';
                h.style.animationDuration = (Math.random() * 10 + (isMobile ? 15 : 10)) + 's';
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
