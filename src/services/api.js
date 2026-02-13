const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const request = async (url, options = {}) => {
    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: 'Fetch failed' }));
            throw new Error(err.error || `Error ${res.status}`);
        }
        return await res.json();
    } catch (e) {
        throw e;
    }
};

export const templateApi = {
    getAll: () => request(`${API_URL}/templates`),
    getByCode: async (code) => {
        const data = await request(`${API_URL}/templates/${code}`);
        return data ? { ...data, publicCode: data.public_code } : null;
    },
    create: async (data) => {
        const res = await request(`${API_URL}/templates`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return { ...res, publicCode: res.public_code };
    },
    update: async (id, data) => {
        const res = await request(`${API_URL}/templates/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        return { ...res, publicCode: res.public_code };
    },
    delete: (id) => request(`${API_URL}/templates/${id}`, { method: 'DELETE' }),
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData
        });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        return data.url;
    }
};
