import { useEffect } from 'react';

export const BackgroundEffects = () => {
    useEffect(() => {
        // Detect mobile for optimization
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

        createBackgroundRoses(isMobile);
        createEffects(isMobile);
    }, []);

    const createBackgroundRoses = (isMobile) => {
        const container = document.getElementById('bgRoses');
        if (!container) return;
        container.innerHTML = ''; // Clearance

        // Significantly reduce count on mobile (25 -> 8)
        const count = isMobile ? 8 : 25;

        for (let i = 0; i < count; i++) {
            const rose = document.createElement('div');
            rose.className = 'rose-petal';
            rose.style.left = Math.random() * 100 + 'vw';
            rose.style.width = Math.random() * 12 + 8 + 'px';
            rose.style.height = Math.random() * 12 + 8 + 'px';
            rose.style.animationDuration = (Math.random() * 5 + (isMobile ? 8 : 5)) + 's';
            rose.style.backgroundColor = `hsl(${Math.random() * 20 + 340}, 80%, 65%)`;
            container.appendChild(rose);
        }
    };

    const createEffects = (isMobile) => {
        const sparkles = document.getElementById('sparkles');
        const hearts = document.getElementById('floatingHeartsContainer');

        if (sparkles) {
            sparkles.innerHTML = '';
            // 30 -> 10 on mobile
            const sCount = isMobile ? 10 : 30;
            for (let i = 0; i < sCount; i++) {
                const s = document.createElement('div');
                s.className = 'sparkle-bg';
                s.style.left = Math.random() * 100 + 'vw';
                s.style.top = Math.random() * 100 + 'vh';
                s.style.animationDelay = Math.random() * 3 + 's';
                sparkles.appendChild(s);
            }
        }

        if (hearts) {
            hearts.innerHTML = '';
            // 15 -> 6 on mobile
            const hCount = isMobile ? 6 : 15;
            for (let i = 0; i < hCount; i++) {
                const h = document.createElement('div');
                h.className = 'floating-heart-bg';
                h.innerHTML = '❤';
                h.style.left = Math.random() * 100 + 'vw';
                h.style.fontSize = (Math.random() * (isMobile ? 15 : 30) + 10) + 'px';
                h.style.animationDuration = (Math.random() * 10 + 12) + 's';
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
