import { HttpRequest, HttpResponse } from "../../types/http";

export interface Controller {
    handle(req: HttpRequest): Promise<HttpResponse>
}