import { Prisma } from '@prisma/client';

import PrismaRepository from './repository.js';

class UserRepository extends PrismaRepository {
    async createUser(data: Prisma.UserCreateInput) {
        const newUser = this.db.prisma.user.create({ data });
        return newUser;
    }
}

export default UserRepository;
