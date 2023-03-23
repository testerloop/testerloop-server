import { CookieResolvers } from './types/generated.js';

const resolvers: CookieResolvers = {
    name: ({ name }) => (name),
    value: ({ value }) => (value),
    path: ({ path }) => (path),
    domain: ({ domain }) => (domain),
    expires: ({ expires }) => (expires),
    httpOnly: ({ httpOnly }) => (httpOnly),
    secure: ({ secure }) => (secure),
};

export default resolvers;
