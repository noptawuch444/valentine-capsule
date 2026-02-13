import { FormField } from '../ui/FormField';

export const TextEditor = ({ name, onNameChange, text, onChange }) => {
    const updateText = (field, value) => {
        onChange({ ...text, [field]: value });
    };

    return (
        <div className="text-editor max-w-4xl mx-auto flex flex-col gap-12">
            <div className="bg-[#1e293b]/50 border border-white/5 p-8 rounded-[40px] space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-6 bg-pink-500 rounded-full"></div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white">Project Identity</h3>
                </div>
                <FormField
                    label="Capsule Name (Internal)"
                    value={name}
                    onChange={onNameChange}
                    placeholder="Enter template name..."
                />
            </div>

            <div className="space-y-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 bg-[#334155] px-4 py-2 rounded-full border border-white/5">Copywriting</span>
                <h2 className="text-4xl font-black text-white">Messaging Hub</h2>
                <p className="text-slate-500 font-light">Craft the perfect words for every step of the journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#1e293b]/30 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-white/5 space-y-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-[#334155] rounded-full"></div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Splash Experience</h3>
                    </div>
                    <FormField
                        label="Main Headline"
                        type="textarea"
                        value={text.splashTitle}
                        onChange={(value) => updateText('splashTitle', value)}
                        placeholder="Happy\nValentine's\nDay"
                        rows={3}
                    />
                    <FormField
                        label="Supportive Subtitle"
                        value={text.splashSubtitle}
                        onChange={(value) => updateText('splashSubtitle', value)}
                        placeholder="ตู้กาชาแห่งความทรงจำของเรา"
                    />
                    <FormField
                        label="Call to Action"
                        value={text.splashButton}
                        onChange={(value) => updateText('splashButton', value)}
                        placeholder="Start Journey"
                    />
                </div>

                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-[#ffafcc] rounded-full"></div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-800">The Secret Letter</h3>
                    </div>
                    <FormField
                        label="Letter Content"
                        type="textarea"
                        value={text.envelopeMessage}
                        onChange={(value) => updateText('envelopeMessage', value)}
                        placeholder="Enter your letter message..."
                        rows={5}
                    />
                    <FormField
                        label="Instructional Hint"
                        value={text.envelopeHint}
                        onChange={(value) => updateText('envelopeHint', value)}
                        placeholder="แตะซองจดหมายเพื่อเปิด"
                    />
                    <FormField
                        label="Opening Command"
                        value={text.envelopeButton}
                        onChange={(value) => updateText('envelopeButton', value)}
                        placeholder="เปิดความทรงจำ"
                    />
                </div>

                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-yellow-400 rounded-full"></div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-800">Machine Interface</h3>
                    </div>
                    <FormField
                        label="Machine Header"
                        value={text.machineTitle}
                        onChange={(value) => updateText('machineTitle', value)}
                        placeholder="Memory Capsule Collection"
                    />
                    <FormField
                        label="Payment Prompt"
                        value={text.machineInsertCoin}
                        onChange={(value) => updateText('machineInsertCoin', value)}
                        placeholder="INSERT COIN"
                    />
                    <FormField
                        label="Execution Message"
                        value={text.machineReadyToSpin}
                        onChange={(value) => updateText('machineReadyToSpin', value)}
                        placeholder="READY TO SPIN!"
                    />
                    <FormField
                        label="Interactive Tooltip"
                        value={text.machineTapHint}
                        onChange={(value) => updateText('machineTapHint', value)}
                        placeholder="แตะเพื่อเปิด! (Tap Me!)"
                    />
                </div>

                <div className="space-y-8">
                    <div className="bg-[#1e293b]/30 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-white/5 space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-[#334155] rounded-full"></div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-white">Prize Reveal</h3>
                        </div>
                        <FormField
                            label="Collection Action"
                            value={text.modalButton}
                            onChange={(value) => updateText('modalButton', value)}
                            placeholder="เก็บความทรงจำนี้"
                        />
                    </div>

                    <div className="bg-[#1e293b]/30 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-white/5 space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-[#334155] rounded-full"></div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-white">Cinematic Closing</h3>
                        </div>
                        <FormField
                            label="Final Statement"
                            value={text.outroTitle}
                            onChange={(value) => updateText('outroTitle', value)}
                            placeholder="Always & Forever"
                        />
                        <FormField
                            label="Repeat Action"
                            value={text.outroButton}
                            onChange={(value) => updateText('outroButton', value)}
                            placeholder="ย้อนดูอีกครั้ง"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
