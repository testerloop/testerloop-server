import cryptoRandomString from 'crypto-random-string';
import { generateApiKey } from 'generate-api-key';
import bcrypt from 'bcrypt';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { SendEmailRequest } from 'aws-sdk/clients/ses.js';

import config from './config.js';

interface GeneratedKey {
    prefix: string;
    key: string;
    hashedKey: string;
}

class ApiKeyService {
    private readonly prefixLength: number;
    private readonly saltRounds = 10;

    constructor(prefixLength: number = 8) {
        this.prefixLength = prefixLength;
    }

    private getPrefix(): string {
        return cryptoRandomString({ length: this.prefixLength });
    }

    public async hashKey(key: string): Promise<string> {
        try {
            return await bcrypt.hash(key, this.saltRounds);
        } catch (err) {
            console.error('Error hashing key:', err);
            throw err;
        }
    }

    public async generateKey(inPrefix?: string): Promise<GeneratedKey> {
        const prefix = inPrefix ?? this.getPrefix();
        const key = generateApiKey({ method: 'uuidv4', prefix }) as string;
        const hashedKey = await this.hashKey(key);
        return { prefix, key, hashedKey };
    }

    public async verifyKey(key: string, hashedKey: string): Promise<boolean> {
        try {
            return await bcrypt.compare(key, hashedKey);
        } catch (err) {
            console.error('Error verifying API key:', err);
            throw err;
        }
    }

    public async sendEmail(email: string, key: string): Promise<void> {
        const ses = new SESClient({ region: config.AWS_BUCKET_REGION });
        const params: SendEmailRequest = {
            Source: config.AWS_SES_EMAIL_SOURCE,
            Destination: { ToAddresses: [email] },
            Message: {
                Subject: { Data: 'Your API Key' },
                Body: { Text: { Data: `Here is your API Key: ${key}` } },
            },
        };

        const command = new SendEmailCommand(params);

        try {
            console.log(`Sending email to: ${email}`);
            const result = await ses.send(command);
            console.log('Email sent:', result);
        } catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    }
}

export default new ApiKeyService();
