import mapStepData from "./mapStepData.js";

const mapCommands = (steps: unknown, testExecutionId: string) => {
    const filteredData = mapStepData(steps);

    return Object.fromEntries(
        filteredData.map((obj,i ) => {
            const id = `${testExecutionId}/command/${i + 1}`;
            return [
                id,
                {_id: id, ...obj}
            ]
        })
      );
}

export default mapCommands;
