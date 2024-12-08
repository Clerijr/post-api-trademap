export class ServerError extends Error {
    constructor(error: any) {
        super(`Internal Server Error: ${error}`)
    }
}