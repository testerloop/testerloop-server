import PrismaDB from 'src/db';

class PrismaRepository {
    protected db: PrismaDB = new PrismaDB();

    constructor() {
        console.log('Starting PrismaRepository');
    }
}

export default PrismaRepository;
