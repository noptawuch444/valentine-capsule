import { Heart, ArrowRight } from 'lucide-react';

export const SplashScene = ({ onStart, playSound, config }) => {
    const handleStart = () => {
        playSound('sfxPop');

        // Start main BGM
        const mainBGM = document.getElementById('mainBGM');
        if (mainBGM) {
            mainBGM.volume = 0.15;
            mainBGM.play().catch(e => console.log("Main BGM play failed", e));
        }

        onStart();
    };

    const renderTitle = () => {
        const title = config?.text?.splashTitle || "Happy\nValentine's\nDay";
        return title.split('\n').map((line, i) => (
            <span key={i}>
                {line}
                {i < title.split('\n').length - 1 && <br />}
            </span>
        ));
    };

    return (
        <div id="splashScene" className="scene active z-50 bg-white/10 backdrop-blur-sm">
            <div className="flex flex-col items-center">
                <Heart className="w-24 h-24 text-red-500 fill-red-500 heart-beat mb-4 drop-shadow-xl" />
                <h1 className="text-5xl md:text-7xl font-playfair text-white font-bold mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] text-center leading-tight">
                    {renderTitle()}
                </h1>
                <p className="text-white/90 font-mali text-xl mb-10 drop-shadow-md">
                    {config?.text?.splashSubtitle || "ตู้กาชาแห่งความทรงจำของเรา"}
                </p>

                <div className="animate-bounce mt-4 cursor-pointer" onClick={handleStart}>
                    <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-xl shadow-[0_10px_20px_rgba(230,57,70,0.4)] hover:scale-110 transition border-4 border-white/50 relative overflow-hidden group">
                        <span className="relative z-10 flex items-center gap-2">
                            {config?.text?.splashButton || "Start Journey"} <ArrowRight className="w-6 h-6" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};
