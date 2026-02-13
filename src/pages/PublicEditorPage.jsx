import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { templateApi } from '../services/api';
import { MemoryEditor } from '../components/editor/MemoryEditor';
import { TextEditor } from '../components/editor/TextEditor';
import { ThemeEditor } from '../components/editor/ThemeEditor';
import { AudioEditor } from '../components/editor/AudioEditor';
import { TabPanel } from '../components/ui/TabPanel';
import { Save, Eye, Heart } from 'lucide-react';
import '../editor.css';

export default function PublicEditorPage() {
    const { code } = useParams();
    const navigate = useNavigate();
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('memories');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        templateApi.getByCode(code).then(data => {
            if (data) {
                setTemplate(JSON.parse(JSON.stringify(data)));
            } else {
                setError("Invalid Public Code. Please check your link.");
            }
            setLoading(false);
        }).catch(err => {
            setError("Failed to load template.");
            setLoading(false);
        });
    }, [code]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await templateApi.update(template.id, template);
            alert('Your Valentine Capsule has been updated!');
        } catch (err) {
            alert('Error saving: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const updateConfig = (key, value) => {
        setTemplate(prev => ({
            ...prev,
            config: {
                ...prev.config,
                [key]: value
            }
        }));
    };

    if (loading) return (
        <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4">
            <Heart className="text-pink-500 animate-pulse mb-4" size={48} />
            <p className="text-xl font-bold">Opening your Memory Capsule...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4">
            <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[32px] text-center max-w-md">
                <h2 className="text-2xl font-black mb-4">Oops!</h2>
                <p className="text-slate-400 mb-6">{error}</p>
                <button
                    onClick={() => navigate('/')}
                    className="btn-primary px-8 py-3"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0f172a] text-white pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#1e293b]/70 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20">
                        <Heart size={20} fill="white" />
                    </div>
                    <div>
                        <h1 className="font-black text-lg leading-tight uppercase tracking-tight">Personalize Your Capsule</h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Public Access: {code}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <a
                        href={`/v/${code}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary px-4 py-2 text-xs flex items-center gap-2"
                    >
                        <Eye size={16} /> Preview Result
                    </a>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn-primary px-6 py-2 text-xs flex items-center gap-2 bg-pink-600 border-pink-500/50"
                    >
                        <Save size={16} /> {isSaving ? 'Saving...' : 'Save & Share'}
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto mt-12 px-6">
                <div className="bg-[#1e293b]/40 backdrop-blur-xl rounded-[40px] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] -mr-48 -mt-48"></div>

                    <div className="relative z-10">
                        <div className="mb-10 text-center md:text-left">
                            <h2 className="text-4xl font-black text-white mb-3">Make it yours.</h2>
                            <p className="text-slate-400">Add your photos, heartfelt messages, and choice of colors.</p>
                        </div>

                        <TabPanel
                            tabs={[
                                { id: 'memories', label: '1. Capsules' },
                                { id: 'text', label: '2. Messages' },
                                { id: 'theme', label: '3. Visuals' },
                                { id: 'audio', label: '4. Music' }
                            ]}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />

                        <div className="mt-12">
                            {activeTab === 'memories' && (
                                <MemoryEditor
                                    memories={template.config.memories}
                                    onChange={(m) => updateConfig('memories', m)}
                                />
                            )}
                            {activeTab === 'text' && (
                                <TextEditor
                                    text={template.config.text}
                                    onChange={(t) => updateConfig('text', t)}
                                />
                            )}
                            {activeTab === 'theme' && (
                                <ThemeEditor
                                    theme={template.config.theme}
                                    onChange={(t) => updateConfig('theme', t)}
                                />
                            )}
                            {activeTab === 'audio' && (
                                <AudioEditor
                                    audio={template.config.audio}
                                    onChange={(a) => updateConfig('audio', a)}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-sm">
                        Finished editing? Click <strong>Save & Share</strong> above, then send the Preview link to your someone special!
                    </p>
                </div>
            </main>
        </div>
    );
}
