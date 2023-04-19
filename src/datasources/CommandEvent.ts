import { Context } from '../context.js';

export class CommandEvent {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async getCommandsByTestExecutionId(id: string) {
        const steps = await this.context.dataSources.stepEvent.getStepsByTestExecutionId(id);

        const commands = Object.values(steps).flatMap(
            ({ commandChains }) => commandChains.flatMap(({ commands }) => commands))

        return Object.fromEntries(
            commands.map((obj) => [
                obj.id,
                {
                    ...obj,
                    id: `${id}/commandEvent/${obj.id}`,
                }
            ])
            );
    }
}
