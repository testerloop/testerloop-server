export class UnauthorisedError extends Error {
    status: number;
    constructor(message: string = 'Unauthorised') {
        super(message);
        this.name = 'UnauthorizedError';
        this.status = 401;
    }
}
