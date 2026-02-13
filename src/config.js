// Core Configuration - Memory Capsule (Reverting to PHP-like structure)
export const config = {
    // Memory capsules (The 5 pieces to collect)
    memories: [
        {
            id: 1,
            color: "#ffadad",
            title: "First Memory",
            img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1080",
            caption: "Memory Caption",
            desc: "Memory description goes here"
        },
        {
            id: 2,
            color: "#ffd6a5",
            title: "Second Memory",
            img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1080",
            caption: "Memory Caption",
            desc: "Memory description goes here"
        },
        {
            id: 3,
            color: "#fdffb6",
            title: "Third Memory",
            img: "https://images.unsplash.com/photo-1506157786151-b8491531e1ec?w=1080",
            caption: "Memory Caption",
            desc: "Memory description goes here"
        },
        {
            id: 4,
            color: "#caffbf",
            title: "Fourth Memory",
            img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1080",
            caption: "Memory Caption",
            desc: "Memory description goes here"
        },
        {
            id: 5,
            color: "#a0c4ff",
            title: "Fifth Memory",
            img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1080",
            caption: "Memory Caption",
            desc: "Memory description goes here"
        }
    ],

    // UI Text & Localizations
    text: {
        splashTitle: "Happy\nValentine's\nDay",
        splashSubtitle: "ตู้กาชาแห่งความทรงจำของเรา",
        splashButton: "Start Journey",

        envelopeMessage: "ถึงคนที่รัก... 💌\n\nยินดีต้อนรับสู่ตู้เก็บความทรงจำของเรา\nในวันวาเลนไทน์นี้ มาสะสมช่วงเวลาสวยงาม\nที่เราได้สร้างขึ้นด้วยกันนะ",
        envelopeHint: "แตะซองจดหมายเพื่อเปิด",
        envelopeButton: "เปิดความทรงจำ",

        machineTitle: "Memory Capsule Collection",
        machineInsertCoin: "INSERT COIN",
        machineReadyToSpin: "READY TO SPIN!",
        machineTapHint: "แตะเพื่อเปิด! (Tap Me!)",

        modalButton: "เก็บความทรงจำนี้",

        outroTitle: "Always & Forever",
        outroButton: "ย้อนดูอีกครั้ง"
    },

    // Visual Theme & Colors
    theme: {
        colors: {
            primaryRed: "#e63946",
            secondaryPink: "#ffafcc",
            lightPink: "#ffc8dd",
            cream: "#fefae0",
            deepRed: "#a4133c",
            gold: "#d4af37"
        },
        fonts: {
            primary: "Mali",
            secondary: "Playfair Display"
        },
        // Original Pink Theme
        background: "radial-gradient(circle at center, #ffc2d1 0%, #ff8fab 50%, #c9184a 100%)"
    },

    // Audio Assets
    audio: {
        mainBGM: "/melodymain.mp3",
        outroBGM: "/outro.mp3",
        soundEffects: {
            writing: "/short_pencil_writing.wav",
            crank: "/keyboard_typing.wav",
            pop: "/cute_pop.wav",
            pop1: "/light_pop.wav",
            coin: "https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3",
            spin: "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3",
            drop: "https://raw.githubusercontent.com/bogind/qgs_sound_effects/main/sounds/woodenfrog.wav",
            success: "/keyboard_typing.wav",
            tada: "/heartbeat.wav"
        }
    }
};
