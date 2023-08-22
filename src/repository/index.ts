import OrganisationRepository from './Organisation.js';
import ApiKeyRepository from './ApiKey.js';
import TestExecutionRepository from './TestExecution.js';
import TestRunRepository from './TestRun.js';
import UserRepository from './User.js';
import WorkerRepository from './Worker.js';

class Repository {
    organisation: OrganisationRepository = new OrganisationRepository();
    apiKey: ApiKeyRepository = new ApiKeyRepository();
    testExecution: TestExecutionRepository = new TestExecutionRepository();
    testRun: TestRunRepository = new TestRunRepository();
    user: UserRepository = new UserRepository();
    worker: WorkerRepository = new WorkerRepository();
}

export default new Repository();
