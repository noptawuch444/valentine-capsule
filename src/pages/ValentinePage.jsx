import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BackgroundEffects } from '../components/BackgroundEffects';
import { SplashScene } from '../components/SplashScene';
import { IntroScene } from '../components/IntroScene';
import { GameScene } from '../components/GameScene';
import { OutroScene } from '../components/OutroScene';
import { Modal } from '../components/Modal';
import { useAudio } from '../hooks/useAudio';
import { fireConfetti } from '../utils/animations';
import { config as defaultConfig } from '../config';
import { templateApi } from '../services/api';

function ValentinePage() {
    const { code } = useParams();
    const [config, setConfig] = useState(defaultConfig);
    const [loading, setLoading] = useState(!!code);
    const [error, setError] = useState(null);

    const [currentScene, setCurrentScene] = useState('splash');
    const [modalActive, setModalActive] = useState(false);
    const [currentPrize, setCurrentPrize] = useState(null);
    const { playSound, fadeOut, fadeIn, registerAudio } = useAudio();

    // Load external config if code is provided
    useEffect(() => {
        if (code) {
            setLoading(true);
            templateApi.getByCode(code).then(template => {
                if (template) {
                    setConfig(template.config);
                    setLoading(false);
                } else {
                    setError("Template not found");
                    setLoading(false);
                }
            }).catch(err => {
                setError("Failed to load template");
                setLoading(false);
            });
        }
    }, [code]);

    // Apply visual theme from config
    useEffect(() => {
        if (config?.theme) {
            const { colors, background } = config.theme;
            if (colors) {
                Object.entries(colors).forEach(([key, value]) => {
                    const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
                    document.documentElement.style.setProperty(cssVarName, value);
                });
            }
            if (background) {
                document.body.style.background = background;
            }
        }
    }, [config]);

    const enterEnvelopeScene = () => setCurrentScene('intro');
    const enterGameScene = () => {
        fireConfetti();
        playSound('sfxPop');
        setTimeout(() => setCurrentScene('game'), 1000);
    };
    const startOutro = () => {
        // Immediate cleanup of main BGM to prevent overlap
        const mainBgm = document.getElementById('mainBGM');
        if (mainBgm) {
            fadeOut('mainBGM', () => {
                // Ensure it's fully stopped
                mainBgm.pause();
                mainBgm.currentTime = 0;
            });
        }

        setTimeout(() => {
            setCurrentScene('outro');
            playSound('sfxTada');
            fadeIn('bgmOutro', 0.6);
        }, 800);
    };
    const showPrizeModal = (prize) => {
        setCurrentPrize(prize);
        setModalActive(true);
    };
    const closeModal = () => {
        setModalActive(false);
        const allCollected = document.querySelectorAll('.inv-slot.filled').length === 5;
        if (allCollected) startOutro();
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading Memory Capsule...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-white">{error}</div>;

    return (
        <div className="valentine-game min-h-screen relative overflow-hidden">
            <audio id="sfxWriting" src={config.audio.soundEffects.writing} preload="auto" ref={(el) => registerAudio('sfxWriting', el)}></audio>
            <audio id="bgmOutro" src={config.audio.outroBGM} preload="auto" loop ref={(el) => registerAudio('bgmOutro', el)}></audio>
            <audio id="sfxCrank" src={config.audio.soundEffects.crank} preload="auto" ref={(el) => registerAudio('sfxCrank', el)}></audio>
            <audio id="sfxPop" src={config.audio.soundEffects.pop} preload="auto" ref={(el) => registerAudio('sfxPop', el)}></audio>
            <audio id="sfxPop1" src={config.audio.soundEffects.pop1} preload="auto" ref={(el) => registerAudio('sfxPop1', el)}></audio>
            <audio id="sfxCoin" src={config.audio.soundEffects.coin} preload="auto" ref={(el) => registerAudio('sfxCoin', el)}></audio>
            <audio id="sfxSpin" src={config.audio.soundEffects.spin} preload="auto" ref={(el) => registerAudio('sfxSpin', el)}></audio>
            <audio id="sfxDrop" src={config.audio.soundEffects.drop} preload="auto" ref={(el) => registerAudio('sfxDrop', el)}></audio>
            <audio id="sfxSuccess" src={config.audio.soundEffects.success} preload="auto" ref={(el) => registerAudio('sfxSuccess', el)}></audio>
            <audio id="sfxTada" src={config.audio.soundEffects.tada} preload="auto" ref={(el) => registerAudio('sfxTada', el)}></audio>
            <audio id="mainBGM" src={config.audio.mainBGM} preload="auto" loop ref={(el) => registerAudio('mainBGM', el)}></audio>

            <BackgroundEffects config={config} />

            {currentScene === 'splash' && <SplashScene onStart={enterEnvelopeScene} playSound={playSound} config={config} />}
            <IntroScene isActive={currentScene === 'intro'} onEnterGame={enterGameScene} playSound={playSound} config={config} />
            <GameScene isActive={currentScene === 'game'} onComplete={startOutro} playSound={playSound} showModal={showPrizeModal} config={config} />
            <OutroScene isActive={currentScene === 'outro'} playSound={playSound} config={config} />
            <Modal isActive={modalActive} prize={currentPrize} onClose={closeModal} config={config} />
        </div>
    );
}

export default ValentinePage;
