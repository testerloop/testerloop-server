import PrismaDB from '../db.js';

class PrismaRepository {
    protected db: PrismaDB = new PrismaDB();

    constructor() {
        console.log('Starting PrismaRepository');
    }
}

export default PrismaRepository;
