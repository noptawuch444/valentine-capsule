import confetti from 'canvas-confetti';

export const fireConfetti = (options = {}) => {
    const defaults = {
        particleCount: 180,
        spread: 85,
        origin: { y: 0.6 }
    };

    confetti({ ...defaults, ...options });
};

export const fireHeartConfetti = () => {
    confetti({
        particleCount: 140,
        spread: 75,
        origin: { y: 0.7 },
        shapes: ['heart'],
        colors: ['#e63946', '#ffafcc', '#ff4d6d'],
        scalar: 1.3
    });
};
