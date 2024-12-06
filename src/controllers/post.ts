import { HttpRequest, HttpResponse } from "../types/http";

export class PostController {
  handle(req: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: {
        message: "Missing param: title",
      },
    };
  }
}
