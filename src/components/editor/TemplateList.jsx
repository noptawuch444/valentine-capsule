import { useState } from 'react';
import { Plus, Copy, Trash2, Upload, ExternalLink, Edit, Heart, Link, Type } from 'lucide-react';
import { useTemplate } from '../../context/TemplateContext';
import { EditorModal } from '../ui/EditorModal';
import { createDefaultTemplate } from '../../types/template';

export const TemplateList = ({ onEdit }) => {
    const {
        templates,
        createTemplate,
        duplicateTemplate,
        deleteTemplate,
        updateTemplate,
        importTemplate
    } = useTemplate();

    const [showNewModal, setShowNewModal] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState('');

    const [showRenameModal, setShowRenameModal] = useState(false);
    const [renameTarget, setRenameTarget] = useState(null);
    const [renameValue, setRenameValue] = useState('');

    const handleCreateNew = async () => {
        if (!newTemplateName.trim()) return alert('Please enter a template name');
        const newTemplate = createDefaultTemplate();
        newTemplate.name = newTemplateName;
        try {
            await createTemplate(newTemplate);
            setShowNewModal(false);
            setNewTemplateName('');
        } catch (error) {
            alert('Failed: ' + error.message);
        }
    };

    const handleDuplicate = async (id) => {
        try {
            await duplicateTemplate(id);
        } catch (error) {
            alert('Failed to duplicate: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this template permanently?')) return;
        try {
            await deleteTemplate(id);
            alert('Template deleted successfully! 🗑️');
        } catch (error) {
            alert('Failed to delete: ' + error.message);
        }
    };

    const handleRename = async () => {
        if (!renameValue.trim()) return;
        try {
            await updateTemplate(renameTarget.id, { ...renameTarget, name: renameValue });
            setShowRenameModal(false);
            alert('Renamed successfully! ✏️');
        } catch (error) {
            alert('Rename failed: ' + error.message);
        }
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            await importTemplate(file);
            e.target.value = '';
            alert('Imported successfully! 📥');
        } catch (error) {
            alert('Import failed: ' + error.message);
        }
    };

    return (
        <div className="template-list max-w-5xl mx-auto px-6 py-12">
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h2 className="text-4xl font-black text-white mb-2">My Workspaces</h2>
                    <p className="text-slate-500 text-sm">Create, share, and manage your capsules.</p>
                </div>
                <div className="flex items-center gap-3">
                    <label className="bg-white/5 hover:bg-white/10 p-3 px-6 rounded-2xl border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <Upload size={16} /> Import JSON
                        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                    <button
                        className="bg-pink-600 hover:bg-pink-500 p-3 px-8 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-pink-500/20 transition-all flex items-center gap-2"
                        onClick={() => setShowNewModal(true)}
                    >
                        <Plus size={18} /> Create New
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="bg-[#1e293b] rounded-[24px] border border-white/5 p-6 hover:border-pink-500/20 transition-all group lg:flex items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-6 mb-4 lg:mb-0">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-pink-500 shadow-inner group-hover:bg-pink-500 group-hover:text-white transition-all">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <div>
                                <h3
                                    className="text-lg font-black text-white hover:text-pink-400 cursor-pointer transition-colors flex items-center gap-2 group/title"
                                    onClick={() => {
                                        setRenameTarget(template);
                                        setRenameValue(template.name);
                                        setShowRenameModal(true);
                                    }}
                                >
                                    {template.name}
                                    <Type size={14} className="opacity-0 group-hover/title:opacity-100 transition-opacity text-pink-500" />
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <code className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Public Code: {template.publicCode}</code>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <a
                                href={`/v/${template.publicCode}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 px-6 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                            >
                                <ExternalLink size={14} /> Open
                            </a>
                            <button
                                onClick={() => {
                                    const url = `${window.location.origin}/v/${template.publicCode}`;
                                    navigator.clipboard.writeText(url);
                                    alert('Link copied! 💝');
                                }}
                                className="p-3 px-6 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                            >
                                <Link size={14} /> Copy Link
                            </button>
                            <button
                                onClick={() => handleDuplicate(template.id)}
                                className="p-3 px-6 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                            >
                                <Copy size={14} /> Duplicate
                            </button>
                            <button
                                onClick={() => onEdit(template)}
                                className="p-3 px-6 bg-pink-500/10 hover:bg-pink-500 text-pink-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-pink-500/10"
                            >
                                <Edit size={14} /> Edit Studio
                            </button>
                            <button
                                onClick={() => handleDelete(template.id)}
                                className="p-3 text-slate-600 hover:text-red-500 transition-colors ml-2"
                                title="Delete Permanently"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {templates.length === 0 && (
                    <div className="py-32 text-center bg-white/5 rounded-[40px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-6">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-600">
                            <Trash2 size={32} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Your workspace is empty</p>
                            <p className="text-slate-600 text-xs">Deleted templates cannot be recovered.</p>
                        </div>
                        <button
                            onClick={() => setShowNewModal(true)}
                            className="bg-pink-600 hover:bg-pink-500 p-4 px-10 rounded-2xl text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-pink-500/20"
                        >
                            Create My First Capsule
                        </button>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <EditorModal isOpen={showNewModal} onClose={() => setShowNewModal(false)} title="New Capsule" size="small">
                <div className="space-y-4 py-4">
                    <input
                        className="w-full bg-[#0f172a] border border-white/10 p-4 rounded-xl text-white font-bold"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                        placeholder="Project Name..."
                        autoFocus
                    />
                    <button className="w-full bg-pink-600 p-4 rounded-xl text-white font-black text-xs uppercase tracking-widest" onClick={handleCreateNew}>Create Now</button>
                </div>
            </EditorModal>

            {/* Rename Modal */}
            <EditorModal isOpen={showRenameModal} onClose={() => setShowRenameModal(false)} title="Rename Capsule" size="small">
                <div className="space-y-4 py-4">
                    <input
                        className="w-full bg-[#0f172a] border border-white/10 p-4 rounded-xl text-white font-bold"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        placeholder="New Name..."
                        autoFocus
                    />
                    <button className="w-full bg-pink-600 p-4 rounded-xl text-white font-black text-xs uppercase tracking-widest" onClick={handleRename}>Update Name</button>
                </div>
            </EditorModal>
        </div>
    );
};
