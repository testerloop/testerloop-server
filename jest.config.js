export default {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^prisma/(.*)$': '<rootDir>/prisma/$1',
        '^spec/(.*)$': '<rootDir>/spec/$1',
    },
};
