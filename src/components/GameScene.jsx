import { useState, useEffect, useRef } from 'react';
import { Heart, CreditCard } from 'lucide-react';

import { fireHeartConfetti } from '../utils/animations';

export const GameScene = ({ isActive, onComplete, playSound, showModal, config }) => {
    const [collected, setCollected] = useState([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [hasCredit, setHasCredit] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [coinTransform, setCoinTransform] = useState('translate(0, 0) scale(1)');
    const [coinOpacity, setCoinOpacity] = useState(1);
    const [slotActive, setSlotActive] = useState(false);
    const [droppedCapsule, setDroppedCapsule] = useState(null);
    const [showTapHint, setShowTapHint] = useState(false);

    const dragStartPosRef = useRef({ x: 0, y: 0 });
    const coinStartCenterRef = useRef({ x: 0, y: 0 });
    const ballsInDomeRef = useRef([]);

    const memories = config?.memories || [];

    useEffect(() => {
        if (isActive) {
            initializeCapsules();
        }
    }, [isActive, memories]);

    const initializeCapsules = () => {
        const dome = document.getElementById('domeArea');
        if (!dome) return;

        // Clear existing capsules
        dome.innerHTML = '';
        ballsInDomeRef.current = [];

        memories.forEach((item) => {
            const ball = document.createElement('div');
            ball.className = 'capsule tumble';
            ball.style.backgroundColor = item.color;
            ball.style.left = (Math.random() * 280 + 30) + 'px';
            ball.style.top = (Math.random() * 120 + 180) + 'px';
            ball.style.transform = `rotate(${Math.random() * 360}deg)`;

            const top = document.createElement('div');
            top.className = 'capsule-top';
            ball.appendChild(top);

            ball.dataset.id = item.id;
            dome.appendChild(ball);
            ballsInDomeRef.current.push(ball);
        });
    };

    // Drag and Drop Logic
    const startDrag = (e) => {
        if (hasCredit || isSpinning) return;
        setIsDragging(true);

        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;

        dragStartPosRef.current = { x: clientX, y: clientY };

        const coinElement = document.getElementById('userCoin');
        if (coinElement) {
            const rect = coinElement.getBoundingClientRect();
            coinStartCenterRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        }

        setCoinTransform('translate(0, 0) scale(1)');
        document.body.style.cursor = 'grabbing';
    };

    const onDragMove = (e) => {
        if (!isDragging) return;

        // Prevent scrolling on mobile during drag
        if (e.cancelable) e.preventDefault();

        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;

        const dx = clientX - dragStartPosRef.current.x;
        const dy = clientY - dragStartPosRef.current.y;

        setCoinTransform(`translate(${dx}px, ${dy}px) scale(1.1) rotateX(20deg)`);
        checkDistance(clientX, clientY);
    };

    const checkDistance = (x, y) => {
        const slotElement = document.getElementById('coinSlot');
        if (!slotElement || x === undefined || y === undefined) return false;

        const slotRect = slotElement.getBoundingClientRect();
        const slotCenter = { x: slotRect.left + slotRect.width / 2, y: slotRect.top + slotRect.height / 2 };
        const dist = Math.hypot(x - slotCenter.x, y - slotCenter.y);

        if (dist < 85) {
            setSlotActive(true);
            return true;
        } else {
            setSlotActive(false);
            return false;
        }
    };

    const onDragEnd = (e) => {
        if (!isDragging) return;

        setIsDragging(false);
        document.body.style.cursor = '';

        const clientX = e.clientX ?? e.changedTouches?.[0]?.clientX;
        const clientY = e.clientY ?? e.changedTouches?.[0]?.clientY;

        if (clientX !== undefined && checkDistance(clientX, clientY)) {
            const slotElement = document.getElementById('coinSlot');
            if (slotElement) {
                const slotRect = slotElement.getBoundingClientRect();
                const slotCenter = { x: slotRect.left + slotRect.width / 2, y: slotRect.top + slotRect.height / 2 };
                const finalX = slotCenter.x - coinStartCenterRef.current.x;
                const finalY = slotCenter.y - coinStartCenterRef.current.y;

                setCoinTransform(`translate(${finalX}px, ${finalY}px) scale(0.4)`);

                setTimeout(() => {
                    setCoinOpacity(0);
                    playSound('sfxCoin');
                    setHasCredit(true);
                    setSlotActive(false);
                }, 350);
            }
        } else {
            setCoinTransform('translate(0, 0) scale(1)');
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onDragMove);
            window.addEventListener('mouseup', onDragEnd);
            window.addEventListener('touchmove', onDragMove, { passive: false });
            window.addEventListener('touchend', onDragEnd, { passive: false });

            return () => {
                window.removeEventListener('mousemove', onDragMove);
                window.removeEventListener('mouseup', onDragEnd);
                window.removeEventListener('touchmove', onDragMove);
                window.removeEventListener('touchend', onDragEnd);
            };
        }
    }, [isDragging]);

    // Gacha Play Logic
    const playGacha = () => {
        if (isSpinning) return;
        if (collected.length >= memories.length) {
            onComplete();
            return;
        }

        if (!hasCredit) {
            const knob = document.getElementById('knob');
            if (knob) {
                knob.classList.add('shake-lock');
                setTimeout(() => knob.classList.remove('shake-lock'), 300);
            }

            setCoinTransform('scale(1.2)');
            setTimeout(() => setCoinTransform('scale(1)'), 200);
            return;
        }

        setIsSpinning(true);
        setHasCredit(false);

        const knob = document.getElementById('knob');
        const machine = document.getElementById('machine');

        if (knob) knob.classList.add('spinning');
        if (machine) machine.classList.add('machine-shake');

        playSound('sfxCrank');
        setTimeout(() => playSound('sfxSpin'), 200);

        // Tumble capsules
        const rumbleInterval = setInterval(() => {
            ballsInDomeRef.current.forEach(ball => {
                const randomX = (Math.random() * 200 + 30);
                const randomY = (Math.random() * 150 + 130);
                const randomRot = Math.random() * 360;
                ball.style.left = randomX + 'px';
                ball.style.top = randomY + 'px';
                ball.style.transform = `rotate(${randomRot}deg)`;
            });
        }, 150);

        setTimeout(() => {
            clearInterval(rumbleInterval);
            const remainingItems = memories.filter(i => !collected.includes(i.id));
            const prize = remainingItems[0];
            const ballEl = ballsInDomeRef.current.find(b => parseInt(b.dataset.id) === prize.id);

            dropBall(ballEl, prize);

            if (knob) knob.classList.remove('spinning');
            if (machine) machine.classList.remove('machine-shake');
            ballsInDomeRef.current.forEach(b => b.style.transition = "all 0.5s");
        }, 1500);
    };

    const dropBall = (ballEl, prize) => {
        if (ballEl) {
            ballEl.style.transition = "top 0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.2s";
            ballEl.style.top = "520px";
            ballEl.style.opacity = "0";
        }

        setTimeout(() => playSound('sfxDrop'), 200);

        setTimeout(() => {
            setDroppedCapsule(prize);
            setShowTapHint(true);
            playSound('sfxPop');

            const exitDoor = document.getElementById('exitDoor');
            if (exitDoor) {
                exitDoor.style.transform = "rotateX(50deg)";
                setTimeout(() => { exitDoor.style.transform = "rotateX(0deg)"; }, 400);
            }
        }, 600);
    };

    const openCapsule = () => {
        if (!droppedCapsule) return;

        setShowTapHint(false);

        const capsuleEl = document.querySelector('.dropped-capsule');
        if (capsuleEl) {
            capsuleEl.classList.add('shake-capsule');
        }

        playSound('sfxCrank');

        setTimeout(() => {
            playSound('sfxPop');

            if (capsuleEl) {
                capsuleEl.style.transform = "translateX(-50%) scale(1.9)";
                capsuleEl.style.opacity = "0";
            }

            showModal(droppedCapsule);

            if (!collected.includes(droppedCapsule.id)) {
                setCollected([...collected, droppedCapsule.id]);
                playSound('sfxSuccess');
                fireHeartConfetti();
            }

            setTimeout(() => {
                setDroppedCapsule(null);
                setIsSpinning(false);

                if (collected.length + 1 < memories.length) {
                    setTimeout(() => {
                        setCoinOpacity(1);
                        setCoinTransform('translate(0, 0) scale(1)');
                    }, 500);
                }
            }, 400);
        }, 500);
    };

    // Reset coin when credit is used
    useEffect(() => {
        if (!hasCredit && !isSpinning && collected.length < memories.length) {
            setCoinOpacity(1);
            setCoinTransform('translate(0, 0) scale(1)');
        }
    }, [hasCredit, isSpinning, collected, memories.length]);

    return (
        <div className={`scene ${isActive ? 'active' : 'hidden'}`} id="gameScene">
            <div className="machine-container" id="machine">
                <div className="machine-topper">{config?.text?.gameTitle || "Memory Capsule Collection"}</div>
                <div className="dome" id="domeArea"></div>
                <div className="connector-ring"></div>
                <div className="body-base">
                    <div className="control-panel">
                        <div
                            className={`spin-label absolute -top-5 left-1/2 -translate-x-1/2 ${hasCredit ? 'ready' : 'bg-red-600'} text-white text-sm px-5 py-2 rounded-full shadow-lg whitespace-nowrap border-2 border-white font-bold tracking-wider`}
                        >
                            {hasCredit ? (config?.text?.knobTextReady || 'READY TO SPIN!') : (config?.text?.knobTextInsert || 'INSERT COIN')}
                        </div>
                        <div className={`status-light ${hasCredit ? 'ready' : ''}`}></div>
                        <div className="coin-slot-housing">
                            <div className={`coin-slot ${slotActive ? 'active' : ''}`} id="coinSlot"></div>
                        </div>
                        <div className="knob-container">
                            <div
                                className={`knob ${!hasCredit ? 'locked' : ''}`}
                                id="knob"
                                onClick={playGacha}
                            ></div>
                        </div>
                        <div className="absolute bottom-3 right-5 text-red-700 font-bold flex items-center gap-2 text-sm">
                            <CreditCard className="w-4 h-4" />
                            <span>{hasCredit ? '1/1' : '0/1'}</span>
                        </div>
                    </div>
                    <div className="exit-gate">
                        <div className="exit-door" id="exitDoor"></div>
                        <div className="relative flex justify-center items-center h-full w-full z-20">
                            {droppedCapsule && (
                                <>
                                    <div
                                        className="capsule dropped-capsule"
                                        style={{ backgroundColor: droppedCapsule.color }}
                                        onClick={openCapsule}
                                    >
                                        <div className="capsule-top"></div>
                                    </div>
                                    {showTapHint && (
                                        <div className="tap-hint-text">{config?.text?.tapMe || "แตะเพื่อเปิด! (Tap Me!)"}</div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="love-coin"
                id="userCoin"
                style={{
                    opacity: coinOpacity,
                    transform: coinTransform,
                    pointerEvents: coinOpacity > 0 ? 'auto' : 'none',
                    transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s'
                }}
                onMouseDown={startDrag}
                onTouchStart={startDrag}
            >
                <div className="coin-content">
                    <Heart size={32} fill="#d4af37" stroke="#8a6e2f" strokeWidth={2} />
                    <span className="coin-label">หยอดตู้</span>
                </div>
            </div>

            <div className="inventory-bar">
                {memories.map((item) => (
                    <div
                        key={item.id}
                        className={`inv-slot ${collected.includes(item.id) ? 'filled' : ''}`}
                        onClick={() => collected.includes(item.id) && showModal(item)}
                    >
                        {collected.includes(item.id) ? (
                            <Heart size={28} fill={item.color} stroke="#e63946" />
                        ) : (
                            <Heart size={24} className="text-gray-400" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
