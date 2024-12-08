export class MissingParamError extends Error {
    constructor(param: String) {
        super(`Missing Param: ${param}`)
    }
}