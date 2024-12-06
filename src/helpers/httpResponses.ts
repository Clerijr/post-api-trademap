import { HttpResponse } from "../types/http";

export function badRequest(error: Error): HttpResponse {
    return {
        statusCode: 400,
        body: {
            error: error.name,
            message: error.message
        }
    }
}