import { HttpRequest, HttpResponse } from "../types/http";

export interface Controller {
    create(req: HttpRequest): Promise<HttpResponse>
}