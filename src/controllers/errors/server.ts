export class ServerError extends Error {
    constructor(error: any) {
        super(`Internal Server Error: ${error}`)
    }
}

export class PostNotFoundError extends Error {
    constructor() {
        super(`Post not found`)
    }
}