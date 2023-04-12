import mapStepData, { CommandType } from "./mapStepData.js";

const mapCommands = (steps: unknown) => {
    const filteredData = mapStepData(steps);

    const commands = filteredData.filter(
        ({ options }) => !options.groupStart
    ).reduce((acc, curr) => {
        return {
            ...acc,
            [curr.options.id]: curr.options
        }
    }, {} as Record<string,CommandType>)

    return commands;
}

export default mapCommands;
