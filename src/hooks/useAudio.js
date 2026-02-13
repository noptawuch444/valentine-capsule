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

    const fadeOut = useCallback((id, callback) => {
        const audio = audioRefs.current[id];
        if (!audio) return;

        const fadeInterval = setInterval(() => {
            if (audio.volume > 0.05) {
                audio.volume -= 0.05;
            } else {
                audio.pause();
                clearInterval(fadeInterval);
                if (callback) callback();
            }
        }, 200);
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

    return { playSound, fadeOut, fadeIn, registerAudio };
};
