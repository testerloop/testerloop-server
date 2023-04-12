import DataLoader from 'dataloader';
import { Context } from '../context.js';
import config from '../config.js';
import S3Service from '../S3Service.js';
import mapCommands from '../maps/mapCommands.js';

export class CommandEvent {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    commandByTestExecutionIdDataLoader = new DataLoader<string, ReturnType<typeof mapCommands>>(
        (ids) => Promise.all(ids.map(async (testExecutionId) => {
            const bucketName = config.AWS_BUCKET_NAME;
            const steps = await S3Service.getObject(bucketName, `${testExecutionId}/cypress/out.json`) as string[];
            const mappedCommands = mapCommands(steps);
            return mappedCommands;
        }))
    )
    async getCommandsByTestExecutionId(testExecutionId: string) {
        return this.commandByTestExecutionIdDataLoader.load(testExecutionId);
    }

    async getById(id: string) {
        const [runId, requestId, _] = id.split('/');
        const commands = await this.getCommandsByTestExecutionId(`${runId}/${requestId}`);
        return commands[id] ?? null;
    }
}
