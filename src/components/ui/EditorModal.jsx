import { X } from 'lucide-react';
import { useEffect } from 'react';

export const EditorModal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
        small: 'max-w-md',
        medium: 'max-w-2xl',
        large: 'max-w-4xl',
        full: 'max-w-7xl'
    };

    return (
        <div className="editor-modal-overlay" onClick={onClose}>
            <div
                className={`editor-modal ${sizeClasses[size]}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="editor-modal-header">
                    <h2 className="editor-modal-title">{title}</h2>
                    <button onClick={onClose} className="editor-modal-close">
                        <X size={24} />
                    </button>
                </div>

                <div className="editor-modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};
