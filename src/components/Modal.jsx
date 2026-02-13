import { Heart } from 'lucide-react';

export const Modal = ({ isActive, prize, onClose, config }) => {
    if (!prize) return null;

    const handleOverlayClick = () => {
        onClose();
    };

    const handleCardClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={`modal-overlay ${isActive ? 'active' : ''}`} onClick={handleOverlayClick}>
            <div className="prize-card" onClick={handleCardClick}>
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-200 rounded-full blur-3xl opacity-20"></div>

                <h2 className="text-3xl font-bold text-red-700 mb-8 relative z-10 drop-shadow-sm font-playfair">
                    {prize.title}
                </h2>
                <div className="polaroid relative z-10">
                    <img src={prize.img} alt="Memory" />
                    <div className="text-center mt-6 font-mali text-gray-700 font-bold text-xl">{prize.caption}</div>
                </div>
                <p className="text-lg text-gray-800 mb-10 relative z-10 px-4 leading-relaxed font-medium">
                    {prize.desc}
                </p>
                <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-12 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition w-full relative z-10 text-xl border-t border-white/40"
                >
                    <Heart className="w-6 h-6 mr-2 inline" />
                    {config?.text?.modalCloseButton || "เก็บความทรงจำนี้"}
                </button>
            </div>
        </div>
    );
};
