import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { useTemplate } from '../../context/TemplateContext';

export const ImageUploader = ({ value, onChange, label }) => {
    const [mode, setMode] = useState('upload'); // Default to upload
    const [uploading, setUploading] = useState(false);
    const [urlInput, setUrlInput] = useState(value || '');
    const { uploadImage } = useTemplate();

    // Sync internal URL state with prop value
    useEffect(() => {
        setUrlInput(value || '');
    }, [value]);

    const onDrop = async (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        console.log('Starting upload for:', file.name);
        setUploading(true);

        try {
            if (!uploadImage) {
                throw new Error('Upload service not available. Check Firebase configuration.');
            }
            const url = await uploadImage(file);
            console.log('Upload successful! URL:', url);
            onChange(url);
        } catch (error) {
            console.error('Upload failed error details:', error);
            alert(`Failed to upload image: ${error.message || 'Unknown error'}. Make sure Firebase Storage is enabled.`);
        } finally {
            setUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
        },
        multiple: false,
        disabled: uploading
    });

    const handleUrlChange = (url) => {
        setUrlInput(url);
        onChange(url);
    };

    return (
        <div className="image-uploader">
            {label && <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-slate-500 ml-1">{label}</label>}

            <div className="image-uploader-tabs flex gap-2 mb-4">
                <button
                    type="button"
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all border ${mode === 'upload' ? 'bg-[#334155] text-white border-white/20' : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10'}`}
                    onClick={() => setMode('upload')}
                >
                    <Upload size={14} />
                    Upload
                </button>
                <button
                    type="button"
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all border ${mode === 'url' ? 'bg-[#334155] text-white border-white/20' : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10'}`}
                    onClick={() => setMode('url')}
                >
                    <LinkIcon size={14} />
                    URL
                </button>
            </div>

            {mode === 'url' ? (
                <div className="url-input-wrapper">
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => handleUrlChange(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="form-input"
                    />
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`dropzone border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${isDragActive ? 'border-pink-500 bg-pink-500/5' : 'border-white/10 hover:border-white/20 bg-black/20'} ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <input {...getInputProps()} />
                    {uploading ? (
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="animate-spin text-pink-500" size={32} />
                            <p className="text-sm font-bold text-slate-400">Uploading to Cloud...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-1">
                                <Upload size={24} className="text-slate-400" />
                            </div>
                            <p className="text-sm font-bold text-slate-300">{isDragActive ? 'Drop it here!' : 'Drop image or Click to Upload'}</p>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">PNG, JPG, WEBP (Max 5MB)</span>
                        </div>
                    )}
                </div>
            )}

            {value && (
                <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 aspect-video relative group">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/800x450?text=Invalid+Image+URL'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-[10px] text-white font-black uppercase tracking-widest">Current Image</span>
                    </div>
                </div>
            )}
        </div>
    );
};
