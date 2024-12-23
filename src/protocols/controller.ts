import { HttpRequest, HttpResponse } from "../types/http";

export interface Controller {
    create(req: HttpRequest): Promise<HttpResponse>
    getAll(): Promise<HttpResponse>
    get(req: HttpRequest): Promise<HttpResponse>
    update(req: HttpRequest): Promise<HttpResponse>
    delete(req: HttpRequest): Promise<HttpResponse>
}