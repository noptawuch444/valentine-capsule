import { config as defaultConfig } from '../config';

export const createDefaultTemplate = () => ({
    name: 'New Valentine Template',
    config: JSON.parse(JSON.stringify(defaultConfig)), // Deep clone
    publicCode: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});
