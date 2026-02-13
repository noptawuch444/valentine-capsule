import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';

export const ColorPicker = ({ color, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="color-picker-wrapper">
            {label && <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-500 ml-1">{label}</label>}
            <div className="relative">
                <button
                    type="button"
                    className="color-preview"
                    style={{ backgroundColor: color }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="color-value">{color}</span>
                </button>

                {isOpen && (
                    <>
                        <div
                            className="color-picker-overlay"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="color-picker-popover">
                            <HexColorPicker color={color} onChange={onChange} />
                            <input
                                type="text"
                                value={color}
                                onChange={(e) => onChange(e.target.value)}
                                className="color-input"
                                placeholder="#000000"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
