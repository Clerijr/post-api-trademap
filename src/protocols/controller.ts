import { HttpRequest, HttpResponse } from "../types/http";
import { Request } from "express";

export interface Controller {
    create(req: HttpRequest): Promise<HttpResponse>
    getAll(req: Request): Promise<HttpResponse>
    get(req: HttpRequest): Promise<HttpResponse>
    update(req: HttpRequest): Promise<HttpResponse>
    delete(req: HttpRequest): Promise<HttpResponse>
}