import { useEffect } from 'react';

export const BackgroundEffects = () => {
    useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

        createBackgroundRoses(isMobile);
        createEffects(isMobile);
    }, []);

    const createBackgroundRoses = (isMobile) => {
        const container = document.getElementById('bgRoses');
        if (!container) return;
        container.innerHTML = '';

        // Optimized count: 25 for PC, 12 for mobile (still looks dense but faster)
        const count = isMobile ? 12 : 25;

        for (let i = 0; i < count; i++) {
            const rose = document.createElement('div');
            rose.className = 'rose-petal';
            rose.style.left = Math.random() * 100 + 'vw';
            rose.style.width = '15px';
            rose.style.height = '15px';
            rose.style.animationDuration = (Math.random() * 5 + (isMobile ? 10 : 7)) + 's';
            rose.style.backgroundColor = `hsl(${Math.random() * 20 + 340}, 80%, 65%)`;
            // Force hardware acceleration
            rose.style.transform = 'translateZ(0)';
            container.appendChild(rose);
        }
    };

    const createEffects = (isMobile) => {
        const sparkles = document.getElementById('sparkles');
        const hearts = document.getElementById('floatingHeartsContainer');

        if (sparkles) {
            sparkles.innerHTML = '';
            // Reduced sparkle complexity on mobile without removing them
            const sCount = isMobile ? 15 : 30;
            for (let i = 0; i < sCount; i++) {
                const s = document.createElement('div');
                s.className = 'sparkle-bg';
                s.style.left = Math.random() * 100 + 'vw';
                s.style.top = Math.random() * 100 + 'vh';
                s.style.animationDelay = Math.random() * 3 + 's';
                s.style.transform = 'translateZ(0)';
                sparkles.appendChild(s);
            }
        }

        if (hearts) {
            hearts.innerHTML = '';
            // Optimized heart count: 15 for PC, 8 for mobile
            const hCount = isMobile ? 8 : 15;
            for (let i = 0; i < hCount; i++) {
                const h = document.createElement('div');
                h.className = 'floating-heart-bg';
                h.innerHTML = '❤';
                h.style.left = Math.random() * 100 + 'vw';
                h.style.fontSize = (isMobile ? 18 : (Math.random() * 20 + 15)) + 'px';
                h.style.animationDuration = (Math.random() * 10 + (isMobile ? 12 : 10)) + 's';
                h.style.animationDelay = Math.random() * 5 + 's';
                h.style.transform = 'translateZ(0)';
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
