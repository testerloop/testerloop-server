import cryptoRandomString from 'crypto-random-string';
import { generateApiKey } from 'generate-api-key';
import bcrypt from 'bcrypt';


class ApiKeyService {
    private prefixLength: number;
    private saltRounds = 10;

    constructor(prefixLength: number = 8) {
        this.prefixLength = prefixLength;
    }

    private getPrefix(): string {
        return cryptoRandomString({ length: this.prefixLength });
    }

    private async hashKey(key: string): Promise<string> {
        let hashedKey = '';
        try {
            hashedKey = await bcrypt.hash(key, this.saltRounds);
        } catch (err) {
            console.error('Error hashing key', err);
        }
        return hashedKey;
    }

    public async generateKey() {
        const prefix = this.getPrefix();
        const key = generateApiKey({ method: 'uuidv4', prefix });
        const hashedKey = await this.hashKey(key as string);
        return {
            prefix,
            key,
            hashedKey
        }
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
}

export default new ApiKeyService();
