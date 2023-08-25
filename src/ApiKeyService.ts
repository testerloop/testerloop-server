import cryptoRandomString from 'crypto-random-string';
import { generateApiKey } from 'generate-api-key';
import bcrypt from 'bcrypt';
import AWS from 'aws-sdk';
import { SendEmailResponse, SendEmailRequest } from 'aws-sdk/clients/ses.js';

import config from './config.js';

interface GeneratedKey {
    prefix: string;
    key: string;
    hashedKey: string;
}

class ApiKeyService {
    private prefixLength: number;
    private saltRounds = 10;

    constructor(prefixLength: number = 8) {
        this.prefixLength = prefixLength;
    }

    private getPrefix(): string {
        return cryptoRandomString({ length: this.prefixLength });
    }

    public async hashKey(key: string): Promise<string> {
        let hashedKey = '';
        try {
            hashedKey = await bcrypt.hash(key, this.saltRounds);
        } catch (err) {
            console.error('Error hashing key', err);
        }
        return hashedKey;
    }

    public async generateKey(inPrefix?: string): Promise<GeneratedKey> {
        const prefix = inPrefix ?? this.getPrefix();
        const key = generateApiKey({ method: 'uuidv4', prefix }) as string;
        const hashedKey = await this.hashKey(key);
        return {
            prefix,
            key,
            hashedKey,
        };
    }

    public async verifyKey(key: string, hashedKey: string): Promise<boolean> {
        let isValid = false;
        try {
            isValid = await bcrypt.compare(key, hashedKey);
        } catch (err) {
            console.error('Error checking api key', err);
        }
        return isValid;
    }

    sendEmail = async (
        email: string,
        prefix: string,
        key: string,
    ): Promise<SendEmailResponse> => {
        const ses = new AWS.SES({ region: config.AWS_BUCKET_REGION });

        const params: SendEmailRequest = {
            Source: 'admin@overloop.io',
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Subject: {
                    Data: 'Your API Key',
                },
                Body: {
                    Text: {
                        Data: `Here is your API Key: ${prefix}.${key}`,
                    },
                },
            },
        };

        try {
            console.log('Sending email to:', email);
            return await ses.sendEmail(params).promise();
        } catch (error) {
            console.error('Email sending failed:', error);
            throw error;
        }
    };
}

export default new ApiKeyService();
