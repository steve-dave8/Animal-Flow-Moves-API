import { promises as fs } from 'fs';

const write = async (file, data) => {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
};

const getAll = async (file) => {
    try {
        let content = await fs.readFile(file);
        return JSON.parse(content);
    } catch (err) {
        console.error("module error", err);
        throw err;
    };
};

const addData = async (file, data) => {
    try {
        let content = await getAll(file);
        content.push(data);
        await write(file, content);
    } catch (err) {
        console.error(err);
        throw err;
    };
};

const deleteData = async (file, id) => {
    try {
        let content = await getAll(file);
        const index = content.findIndex(x => x.id === id);
        content.splice(index, 1);
        await write(file, content);
    } catch (err) {
        console.error(err);
        throw err;
    };
};

export { write, getAll, addData, deleteData };
