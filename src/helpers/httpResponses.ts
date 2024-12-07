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

export function ok(payload: any): HttpResponse {
    return {
        statusCode: 200,
        body: payload
    }
}

export function created(payload: any): HttpResponse {
    return {
        statusCode: 201,
        body: payload
    }
}