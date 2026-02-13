import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

export const IntroScene = ({ isActive, onEnterGame, playSound, config }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [letterVisible, setLetterVisible] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [showButton, setShowButton] = useState(false);
    const typingIntervalRef = useRef(null);

    const fullText = config?.text?.envelopeMessage || "ถึงคนที่รัก... 💌\n\nยินดีต้อนรับสู่ตู้เก็บความทรงจำของเรา\nในวันวาเลนไทน์นี้ มาสะสมช่วงเวลาสวยงาม\nที่เราได้สร้างขึ้นด้วยกันนะ";

    const openEnvelope = () => {
        if (isOpen) return;

        playSound('sfxPop1');
        setIsOpen(true);

        setTimeout(() => {
            setLetterVisible(true);
            typeText();
        }, 1000);
    };

    const typeText = () => {
        let i = 0;
        const speed = 100;

        // Use a single interval for typing
        typingIntervalRef.current = setInterval(() => {
            if (i < fullText.length) {
                // Update text once per interval
                setTypedText(fullText.substring(0, i + 1));

                // Use the shared playSound function with lower volume for writing
                if (fullText.charAt(i) !== " " && fullText.charAt(i) !== "\n") {
                    playSound('sfxWriting', 0.2);
                }

                i++;
            } else {
                clearInterval(typingIntervalRef.current);
                setShowButton(true);
            }
        }, speed);
    };

    useEffect(() => {
        return () => {
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
        };
    }, []);

    const handleEnterGame = (e) => {
        e.stopPropagation();
        onEnterGame();
    };

    return (
        <div className={`scene ${isActive ? 'active' : 'hidden'}`} id="introScene">
            <div className={`envelope-wrapper ${isOpen ? 'open' : ''}`} onClick={openEnvelope}>
                <div className="envelope">
                    <div className="flap"></div>
                </div>
                <div className="letter-card">
                    <div className={`flex flex-col items-center justify-center h-full p-2 transition-opacity duration-500 ${letterVisible ? '' : 'opacity-0'}`}>
                        <div className={`text-gray-700 text-lg font-mali leading-relaxed min-h-[100px] whitespace-pre-line ${!showButton ? 'typing' : ''}`}>
                            {typedText}
                        </div>
                        {showButton && (
                            <button
                                onClick={handleEnterGame}
                                className="mt-8 bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-full font-bold text-base shadow-lg hover:scale-105 transition transform duration-300 border-2 border-white/50 relative z-30"
                            >
                                <Heart className="w-5 h-5 mr-2 inline" />
                                {config?.text?.envelopeButton || "เปิดความทรงจำ"}
                            </button>
                        )}
                    </div>
                </div>
                <div className="wax-seal">
                    <Heart className="text-cream fill-cream w-10 h-10 drop-shadow-lg" style={{ color: 'var(--cream)', fill: 'var(--cream)' }} />
                </div>
            </div>
            <div className={`click-hint ${isOpen ? 'opacity-0' : ''}`}>
                {config?.text?.envelopeHint || "แตะซองจดหมายเพื่อเปิด"}
            </div>
        </div>
    );
};
