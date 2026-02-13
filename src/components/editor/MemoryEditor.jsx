import { useState } from 'react';
import { FormField } from '../ui/FormField';
import { ColorPicker } from '../ui/ColorPicker';
import { ImageUploader } from './ImageUploader';
import { Save, Eye } from 'lucide-react';

export const MemoryEditor = ({ memories, onChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showPreview, setShowPreview] = useState(false);

    const currentMemory = memories[selectedIndex];

    const updateMemory = (field, value) => {
        const updated = memories.map((mem, idx) =>
            idx === selectedIndex ? { ...mem, [field]: value } : mem
        );
        onChange(updated);
    };

    return (
        <div className="memory-editor">
            <div className="memory-selector">
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-4 ml-2">Select Slot</div>
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
                    {memories.map((memory, index) => (
                        <button
                            key={memory.id}
                            className={`memory-selector-btn flex-shrink-0 flex items-center gap-3 p-3 rounded-2xl transition-all border-2 text-left group ${selectedIndex === index ? 'bg-[#334155] shadow-2xl border-white/20 -translate-y-1' : 'bg-[#1e293b]/40 border-transparent hover:bg-[#1e293b]/60'}`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs shadow-inner"
                                style={{ backgroundColor: memory.color }}
                            >
                                {index + 1}
                            </div>
                            <span className={`text-sm font-bold truncate transition-colors ${selectedIndex === index ? 'text-white' : 'text-slate-500'}`}>
                                {memory.title || `Slot ${index + 1}`}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="memory-editor-content">
                <div className="bg-[#1e293b]/30 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl border border-white/5 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <FormField
                                label="Memory Title"
                                value={currentMemory.title}
                                onChange={(value) => updateMemory('title', value)}
                                placeholder="E.g., Our First Date"
                                required
                            />

                            <FormField
                                label="Photo Caption"
                                value={currentMemory.caption}
                                onChange={(value) => updateMemory('caption', value)}
                                placeholder="E.g., Under the cherry blossoms"
                                required
                            />

                            <FormField
                                label="The Story"
                                type="textarea"
                                value={currentMemory.desc}
                                onChange={(value) => updateMemory('desc', value)}
                                placeholder="Describe this precious moment..."
                                rows={4}
                                required
                            />
                        </div>

                        <div className="space-y-8">
                            <ColorPicker
                                label="Capsule Signature Color"
                                color={currentMemory.color}
                                onChange={(value) => updateMemory('color', value)}
                            />

                            <ImageUploader
                                label="Memory Visual"
                                value={currentMemory.img}
                                onChange={(value) => updateMemory('img', value)}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm transition-all ${showPreview ? 'bg-[#334155] text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        <Eye size={20} />
                        {showPreview ? 'Close Live Preview' : 'Preview this Memory'}
                    </button>
                </div>

                {showPreview && (
                    <div className="memory-preview mt-10 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="preview-card bg-[#1e293b]/40 p-12 rounded-[50px] shadow-2xl border border-white/5 relative overflow-hidden backdrop-blur-3xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e63946]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div
                                    className="w-20 h-20 rounded-full mb-10 shadow-[inner_0_4px_10px_rgba(0,0,0,0.2)] flex items-center justify-center"
                                    style={{ backgroundColor: currentMemory.color }}
                                >
                                    <div className="w-16 h-8 bg-white/20 rounded-full blur-sm -mt-4"></div>
                                </div>

                                <div className="max-w-md w-full">
                                    <h2 className="text-4xl font-black text-white mb-8 text-center">{currentMemory.title || "Untitle Memory"}</h2>

                                    <div className="bg-white p-6 pb-20 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                                        <div className="aspect-[4/3] w-full bg-gray-50 rounded-lg overflow-hidden mb-6">
                                            {currentMemory.img ? (
                                                <img src={currentMemory.img} alt={currentMemory.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-200 uppercase font-black tracking-widest text-xs">No Image Selected</div>
                                            )}
                                        </div>
                                        <div className="text-center font-mali font-bold text-gray-600 italic text-xl">
                                            {currentMemory.caption || "Something sweet..."}
                                        </div>
                                    </div>

                                    <p className="mt-12 text-slate-400 text-lg leading-relaxed text-center font-light">
                                        {currentMemory.desc || "Tell your story here..."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
