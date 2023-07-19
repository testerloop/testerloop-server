const separator = '/';
const base64Regex =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

export const encodeId = (typename: string, internalId: string): string => {
    return Buffer.from(
        `${typename}${separator}${internalId}`,
        'utf-8',
    ).toString('base64');
};

export const decodeId = (id: string): [string, string] | null => {
    if (!base64Regex.test(id)) {
        return null;
    }
    const unobfuscated = Buffer.from(id, 'base64').toString('utf-8');
    const separatorIndex = unobfuscated.indexOf(separator);
    if (separatorIndex === -1) {
        return null;
    }

    const typename = unobfuscated.substring(0, separatorIndex);
    const internalId = unobfuscated.substring(separatorIndex + 1);
    return [typename, internalId];
};

export const decodeIdForType = (
    typename: string,
    id: string,
): string | null => {
    const decodedId = decodeId(id);
    if (!decodedId) {
        return null;
    }
    const [decodedTypename, internalId] = decodedId;
    if (decodedTypename !== typename) {
        return null;
    }
    return internalId;
};
