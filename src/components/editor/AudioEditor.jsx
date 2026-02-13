import { useState } from 'react';
import { useTemplate } from '../../context/TemplateContext';
import { FormField } from '../ui/FormField';
import { Music, Volume2, Info, Upload, Loader2, CheckCircle2 } from 'lucide-react';

const DEFAULT_TRACKS = [
    { name: 'Main Theme', url: '/melodymain.mp3', mood: 'Romantic' },
    { name: 'Default Outro', url: '/outro.mp3', mood: 'Classic' },
    { name: 'Outro Theme 1', url: '/outrol1.mp3', mood: 'Romantic' },
    { name: 'Outro Theme 2', url: '/outrol2.mp3', mood: 'Sweet' },
    { name: 'Outro Theme 3', url: '/outrol3.mp3', mood: 'Happy' },
    { name: 'Outro Theme 4', url: '/outrol4.mp3', mood: 'Emotional' },
    { name: 'Outro Theme 5', url: '/outrol5.mp3', mood: 'Sad/Deep' },
    { name: 'Outro Theme 6', url: '/outrol6.mp3', mood: 'Pop' }
];

export const AudioEditor = ({ audio, onChange }) => {
    const { uploadFile } = useTemplate(); // This function handles general uploads
    const [uploading, setUploading] = useState({ main: false, outro: false });

    const updateAudio = (key, value) => {
        onChange({
            ...audio,
            [key]: value
        });
    };

    const handleFileUpload = async (event, type) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check if file is audio
        if (!file.type.startsWith('audio/')) {
            alert('Please upload an audio file (mp3, wav, etc.)');
            return;
        }

        setUploading(prev => ({ ...prev, [type]: true }));
        try {
            const url = await uploadFile(file);
            updateAudio(type === 'main' ? 'mainBGM' : 'outroBGM', url);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload audio. Please try again.');
        } finally {
            setUploading(prev => ({ ...prev, [type]: false }));
        }
    };

    return (
        <div className="audio-editor max-w-4xl mx-auto flex flex-col gap-12">
            <div className="space-y-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 bg-[#334155] px-4 py-2 rounded-full border border-white/5">Soundscape</span>
                <h2 className="text-4xl font-black text-white">Music & Sound</h2>
                <p className="text-slate-500 font-light">Set the mood with the perfect background music for your story.</p>
            </div>

            <div className="bg-[#1e293b]/30 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl border border-white/5 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Background Music Section */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-pink-500 rounded-full"></div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-white">Audio Files</h3>
                        </div>

                        {/* Main BGM Upload */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Main Background Music</label>
                                {audio.mainBGM && <CheckCircle2 size={16} className="text-green-500" />}
                            </div>
                            <div className="relative group">
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) => handleFileUpload(e, 'main')}
                                    className="hidden"
                                    id="main-audio-upload"
                                />
                                <label
                                    htmlFor="main-audio-upload"
                                    className={`flex flex-col items-center justify-center gap-3 p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer
                                        ${uploading.main ? 'border-pink-500/50 bg-pink-500/5' : 'border-white/10 hover:border-pink-500/30 hover:bg-white/5'}`}
                                >
                                    {uploading.main ? (
                                        <>
                                            <Loader2 size={32} className="text-pink-500 animate-spin" />
                                            <span className="text-xs font-bold text-pink-500 uppercase">Uploading Track...</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Music size={24} className="text-slate-400 group-hover:text-pink-400" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-bold text-white mb-1">Click to Upload MP3</p>
                                                <p className="text-[10px] text-slate-500 font-medium">Plays during story & game</p>
                                            </div>
                                        </>
                                    )}
                                </label>
                            </div>
                            <FormField
                                value={audio.mainBGM}
                                onChange={(val) => updateAudio('mainBGM', val)}
                                placeholder="Or enter URL here..."
                                className="mt-2"
                            />
                        </div>

                        {/* Outro Music Upload */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Outro Music</label>
                                {audio.outroBGM && <CheckCircle2 size={16} className="text-purple-500" />}
                            </div>
                            <div className="relative group">
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) => handleFileUpload(e, 'outro')}
                                    className="hidden"
                                    id="outro-audio-upload"
                                />
                                <label
                                    htmlFor="outro-audio-upload"
                                    className={`flex flex-col items-center justify-center gap-3 p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer
                                        ${uploading.outro ? 'border-purple-500/50 bg-purple-500/5' : 'border-white/10 hover:border-purple-500/30 hover:bg-white/5'}`}
                                >
                                    {uploading.outro ? (
                                        <>
                                            <Loader2 size={32} className="text-purple-500 animate-spin" />
                                            <span className="text-xs font-bold text-purple-500 uppercase">Uploading Final BGM...</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Music size={24} className="text-slate-400 group-hover:text-purple-400" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-bold text-white mb-1">Upload End Theme</p>
                                                <p className="text-[10px] text-slate-500 font-medium">Plays during final reveal</p>
                                            </div>
                                        </>
                                    )}
                                </label>
                            </div>
                            <FormField
                                value={audio.outroBGM}
                                onChange={(val) => updateAudio('outroBGM', val)}
                                placeholder="Or enter URL here..."
                                className="mt-2"
                            />
                        </div>
                    </div>

                    {/* How to use section & Library */}
                    <div className="space-y-12">
                        {/* Predefined Library */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-white">Music Library</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {DEFAULT_TRACKS.map((track, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/10 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                                                <Music size={14} className="text-pink-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white">{track.name}</p>
                                                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{track.mood}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateAudio('mainBGM', track.url)}
                                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${audio.mainBGM === track.url ? 'bg-pink-500 text-white' : 'bg-[#334155] text-slate-300 hover:bg-pink-500/20'}`}
                                            >
                                                Use Main
                                            </button>
                                            <button
                                                onClick={() => updateAudio('outroBGM', track.url)}
                                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${audio.outroBGM === track.url ? 'bg-purple-500 text-white' : 'bg-[#334155] text-slate-300 hover:bg-purple-500/20'}`}
                                            >
                                                Use End
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-blue-400 rounded-full"></div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-white">Audio Guide</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-[#334155]/20 p-8 rounded-[32px] border border-white/5 space-y-6">
                                    <div className="flex items-center gap-2 text-blue-400">
                                        <Info size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">About MP3 Uploads</span>
                                    </div>
                                    <ul className="space-y-4">
                                        <li className="text-xs text-slate-400 flex gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                            <span>Quick pick from our library or upload your own <strong>.mp3</strong> file.</span>
                                        </li>
                                        <li className="text-xs text-slate-400 flex gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                            <span>Max file size: <strong>10MB</strong> for best performance.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-8 bg-pink-500/5 rounded-[32px] border border-pink-500/10 flex items-center gap-4">
                                    <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center shrink-0">
                                        <Volume2 className="text-pink-500" size={32} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-pink-500 uppercase tracking-[0.2em] mb-1">Instant Playback</p>
                                        <p className="text-xs text-slate-300 font-medium leading-relaxed">Changes will be saved once you click 'Save & Share' at the top.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
