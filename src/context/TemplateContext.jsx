import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { templateApi } from '../services/api';

const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
    const [templates, setTemplates] = useState([]);
    const [currentTemplate, setCurrentTemplate] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchTemplates = useCallback(async () => {
        try {
            const data = await templateApi.getAll();
            if (Array.isArray(data)) {
                setTemplates(data.map(t => ({
                    ...t,
                    publicCode: t.public_code,
                    config: typeof t.config === 'string' ? JSON.parse(t.config) : t.config
                })));
            }
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    const createTemplate = async (templateData) => {
        try {
            const result = await templateApi.create(templateData);
            await fetchTemplates();
            return result;
        } catch (err) {
            throw err;
        }
    };

    const updateTemplate = async (id, data) => {
        try {
            await templateApi.update(id, data);
            await fetchTemplates();
        } catch (err) {
            throw err;
        }
    };

    const deleteTemplate = async (id) => {
        try {
            await templateApi.delete(id);
            await fetchTemplates();
        } catch (err) {
            throw err;
        }
    };

    const uploadFile = async (file) => {
        if (!file) return null;
        return await templateApi.uploadImage(file);
    };

    const generatePublicCode = useCallback(() => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        const p1 = Array.from({ length: 3 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
        const p2 = Array.from({ length: 3 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
        return `${p1}-${p2}`;
    }, []);

    const duplicateTemplate = async (id) => {
        const target = templates.find(t => t.id === id);
        if (!target) return;
        const { id: _, public_code: __, publicCode: ___, ...rest } = target;
        return createTemplate({
            ...rest,
            name: `${target.name} (Copy)`,
            publicCode: generatePublicCode()
        });
    };

    const value = useMemo(() => ({
        templates,
        currentTemplate,
        loading,
        createTemplate,
        updateTemplate,
        deleteTemplate,
        duplicateTemplate,
        setCurrentTemplate,
        uploadImage: uploadFile,
        uploadFile
    }), [templates, currentTemplate, loading, generatePublicCode]);

    return (
        <TemplateContext.Provider value={value}>
            {children}
        </TemplateContext.Provider>
    );
};

export const useTemplate = () => useContext(TemplateContext);
