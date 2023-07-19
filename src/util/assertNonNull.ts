export const assertNonNull = <T>(input: T | null): T => {
    if (input === null) {
        throw new Error('Expected value to be non-null.');
    }
    return input;
};
