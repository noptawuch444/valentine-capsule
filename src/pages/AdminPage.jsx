import { useState, useMemo } from 'react';
import { useTemplate } from '../context/TemplateContext';
import { TemplateList } from '../components/editor/TemplateList';
import { MemoryEditor } from '../components/editor/MemoryEditor';
import { TextEditor } from '../components/editor/TextEditor';
import { ThemeEditor } from '../components/editor/ThemeEditor';
import { AudioEditor } from '../components/editor/AudioEditor';
import { TabPanel } from '../components/ui/TabPanel';
import { Save, ExternalLink, ArrowLeft, LayoutDashboard, Settings, LogOut } from 'lucide-react';

export default function AdminPage() {
    const { templates, updateTemplate, loading } = useTemplate();
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [activeTab, setActiveTab] = useState('memories');
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = (template) => {
        setEditingTemplate(JSON.parse(JSON.stringify(template)));
        setActiveTab('memories');
    };

    const handleSave = async () => {
        if (!editingTemplate || isSaving) return;
        setIsSaving(true);
        try {
            await updateTemplate(editingTemplate.id, editingTemplate);
            setEditingTemplate(null);
        } catch (error) {
            alert('Failed to save template: ' + error.message);
        } finally {
            setIsSaving(true);
            // Small delay for UX transition
            setTimeout(() => setIsSaving(false), 500);
        }
    };

    const updateConfig = (key, value) => {
        setEditingTemplate(prev => ({
            ...prev,
            config: {
                ...prev.config,
                [key]: value
            }
        }));
    };

    if (loading) return (
        <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center font-mali">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Loading Workspace...</p>
        </div>
    );

    if (editingTemplate) {
        return (
            <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
                {/* Slim Header */}
                <header className="h-16 border-b border-white/5 bg-[#1e293b]/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setEditingTemplate(null)}
                            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all"
                            title="Back to Dashboard"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div className="h-6 w-px bg-white/10 hidden md:block"></div>
                        <div className="hidden md:block">
                            <h2 className="text-sm font-black text-white leading-none mb-1">{editingTemplate.name}</h2>
                            <p className="text-[9px] text-pink-500 font-bold uppercase tracking-widest">{editingTemplate.publicCode}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href={`/v/${editingTemplate.publicCode}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 px-4 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-2 border border-white/5 transition-all"
                        >
                            <ExternalLink size={14} /> <span className="hidden sm:inline">Preview Link</span>
                        </a>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`p-2.5 px-6 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${isSaving ? 'bg-slate-700 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-500 shadow-pink-500/20'}`}
                        >
                            <Save size={14} /> {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-12">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
                            <div>
                                <h3 className="text-2xl font-black text-white">Editor Studio</h3>
                                <p className="text-slate-500 text-sm">Fine-tune your memory capsule details.</p>
                            </div>
                            <TabPanel
                                tabs={[
                                    { id: 'memories', label: 'Memories' },
                                    { id: 'text', label: 'Content' },
                                    { id: 'theme', label: 'Design' },
                                    { id: 'audio', label: 'Audio' }
                                ]}
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                className="!bg-transparent !p-0"
                            />
                        </div>

                        <div className="pt-4">
                            {activeTab === 'memories' && (
                                <MemoryEditor
                                    memories={editingTemplate.config.memories}
                                    onChange={(m) => updateConfig('memories', m)}
                                />
                            )}
                            {activeTab === 'text' && (
                                <TextEditor
                                    name={editingTemplate.name}
                                    onNameChange={(val) => setEditingTemplate(prev => ({ ...prev, name: val }))}
                                    text={editingTemplate.config.text}
                                    onChange={(t) => updateConfig('text', t)}
                                />
                            )}
                            {activeTab === 'theme' && (
                                <ThemeEditor
                                    theme={editingTemplate.config.theme}
                                    onChange={(t) => updateConfig('theme', t)}
                                />
                            )}
                            {activeTab === 'audio' && (
                                <AudioEditor
                                    audio={editingTemplate.config.audio}
                                    onChange={(a) => updateConfig('audio', a)}
                                />
                            )}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-mali">
            <nav className="h-20 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-[#0f172a]/80 backdrop-blur-md z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20">
                        <LayoutDashboard size={20} fill="white" />
                    </div>
                    <h1 className="text-xl font-black uppercase tracking-tighter">Admin Portal</h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                        <span className="bg-white/5 px-3 py-1.5 rounded-full border border-white/5">v1.2 Stable</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-xs font-black transition-all duration-300 border border-red-500/20"
                    >
                        <LogOut size={16} />
                        <span>Log Out</span>
                    </button>
                </div>
            </nav>
            <main className="p-8">
                <TemplateList onEdit={handleEdit} />
            </main>
        </div>
    );
}
