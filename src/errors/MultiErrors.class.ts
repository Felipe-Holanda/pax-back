export class MultiErrors extends Error {
    public readonly errors: string[];
    public readonly status: number = 400;

    constructor(errors: string[], status: number = 400) {
        super();
        this.errors = errors;
        this.status = status;
    }
}