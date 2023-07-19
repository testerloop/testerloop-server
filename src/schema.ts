import { readdir, readFile, stat } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFolderContents = async (folder: string): Promise<string> => {
    const files = await readdir(folder);
    const subFiles = await Promise.all(
        files.map(async (file) => {
            const path = join(folder, file);
            const fileStat = await stat(path);
            if (fileStat.isDirectory()) {
                return readFolderContents(path);
            }
            return readFile(path);
        }),
    );

    return subFiles.join('\n');
};

const schema = await readFolderContents(join(__dirname, 'schema'));

export default schema;
