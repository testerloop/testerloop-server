import db from '../db.js';

async function handleApiKey(apiKey: string) {
    const apiKeyRecord = await db.organisation.getByApiKey(apiKey);

    if (!apiKeyRecord) {
        throw new Error('Invalid API key');
    }

    if (!apiKeyRecord.isEnabled) {
        throw new Error(
            'Your API key is not enabled. Please renew your subscription or contact Testerloop support.'
        );
    }

    return apiKeyRecord.organisation;
}

export default handleApiKey;
