import getPaginatedData from "../util/getPaginatedData.js";
import { encodeId } from "../util/id.js";
import { GherkinStepKeyword, StepEventResolvers } from "./types/generated.js";

const resolvers: StepEventResolvers = {
  id({ _id }) {
    return encodeId("StepEvent", _id);
  },
  async at({ _id }, _args, { dataSources }) {
    const event = await dataSources.stepEvent.getById(_id);
    return event.at;
  },
  async until({ _id }, _args, { dataSources }) {
    const event = await dataSources.stepEvent.getById(_id);
    return event.until;
  },
  async status({ _id }, _args, { dataSources }) {
    const event = await dataSources.stepEvent.getById(_id);
    return event.status;
  },
  async commandChains({ _id }, _args, { dataSources }) {
    const event = await dataSources.stepEvent.getById(_id);
    return getPaginatedData(event.commandChains);
  },
  async previousSnapshot({ _id, at, snapshotID }, _args, { dataSources }) {
    const [runId, requestId, _] = _id.split("/");
    const snapshot = await dataSources.snapshot.getById(
      `${runId}/${requestId}/snapshot/${snapshotID}`
    );
    return {
      __typename: "TestExecutionSnapshot" as const,
      testExecutionId: `${runId}/${requestId}`,
      at,
      dom: snapshot.beforeBody,
    };
  },
  async nextSnapshot({ _id, until, snapshotID }, _args, { dataSources }) {
    const [runId, requestId, _] = _id.split("/");
    const snapshot = await dataSources.snapshot.getById(
      `${runId}/${requestId}/snapshot/${snapshotID}`
    );
    return {
      __typename: "TestExecutionSnapshot" as const,
      testExecutionId: `${runId}/${requestId}`,
      at: until,
      dom: snapshot.afterBody,
    };
  },
  async definition({ _id }, _args, { dataSources }) {
    const event = await dataSources.stepEvent.getById(_id);
    let mappedKeyword;
    const name = event.name.trim();
    switch (name) {
      case "Given":
        mappedKeyword = GherkinStepKeyword.Given;
        break;
      case "When":
        mappedKeyword = GherkinStepKeyword.When;
        break;
      case "Then":
        mappedKeyword = GherkinStepKeyword.Then;
        break;
      case "And":
        mappedKeyword = GherkinStepKeyword.And;
        break;
      case "But":
        mappedKeyword = GherkinStepKeyword.But;
        break;
      case "Before":
        mappedKeyword = GherkinStepKeyword.Before;
        break;
      case "After":
        mappedKeyword = GherkinStepKeyword.After;
        break;
      case "Step":
        mappedKeyword = GherkinStepKeyword.Step;
        break;
      default:
        throw new Error(`${name} is not a valid keyword`);
    }
    return {
      __typename: "StepDefinition",
      description: event.message,
      keyword: mappedKeyword,
    };
  },
  async testExecution({ _id }, _args) {
    const [runId, _] = _id.split("/");
    return {
      __typename: "TestExecution",
      id: _id,
      testRun: {
        __typename: "TestRun",
        id: runId,
      },
    };
  },
};

export default resolvers;
