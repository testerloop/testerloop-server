import { CommandEventErrorResolvers } from './types/generated.js';

const resolvers: CommandEventErrorResolvers = {
    type: ({type}) => type,
    message: ({ message }) => message,
    stackTrace: ({ stackTrace }) => stackTrace,
    location: ({ location }) => ({
        __typename: 'GitHubRevisionFileLineColumn',
        ...{
            ...location,
            line: {
                ...location.line,
                __typename: 'GitHubRevisionFileLine',
                file: {
                    __typename: 'GitHubRevisionFile',
                    ...location.line.file
                },
                
            },
        }
    }),
}

export default resolvers;
