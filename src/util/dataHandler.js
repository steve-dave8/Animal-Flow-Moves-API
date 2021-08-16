import { promises as fs } from 'fs';

const getAll = async (file) => {
    try {
        let content = await fs.readFile(file);
        return JSON.parse(content);
    } catch (err) {
        console.error("module error", err);
        throw err;
    };
};

export { getAll };
