import { useRef, useCallback } from 'react';

export const useAudio = () => {
    const audioRefs = useRef({});

    const playSound = useCallback((id, volume = 0.8) => {
        const audio = audioRefs.current[id];
        if (audio) {
            audio.currentTime = 0;
            audio.volume = volume;
            audio.play().catch(e => console.log("Audio play failed", e));
        }
    }, []);

    const stopSound = useCallback((id) => {
        const audio = audioRefs.current[id];
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }, []);

    const fadeOut = useCallback((id, callback) => {
        const audio = audioRefs.current[id];
        if (!audio || audio.paused) {
            if (callback) callback();
            return;
        }

        // Faster fade: 1 second total (10 steps of 100ms)
        const step = audio.volume / 10;
        const fadeInterval = setInterval(() => {
            if (audio.volume > step) {
                audio.volume -= step;
            } else {
                audio.pause();
                audio.volume = 0;
                clearInterval(fadeInterval);
                if (callback) callback();
            }
        }, 100);
    }, []);

    const fadeIn = useCallback((id, targetVolume = 0.5) => {
        const audio = audioRefs.current[id];
        if (!audio) return;

        audio.volume = 0;
        audio.play().catch(e => console.log("Audio play failed", e));

        const fadeInterval = setInterval(() => {
            if (audio.volume < targetVolume) {
                audio.volume = Math.min(audio.volume + 0.05, targetVolume);
            } else {
                clearInterval(fadeInterval);
            }
        }, 200);
    }, []);

    const registerAudio = useCallback((id, audioElement) => {
        if (audioElement) {
            audioRefs.current[id] = audioElement;
        }
    }, []);

    return { playSound, stopSound, fadeOut, fadeIn, registerAudio };
};
