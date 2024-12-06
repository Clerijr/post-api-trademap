import { badRequest } from "../helpers/httpResponses";
import { HttpRequest, HttpResponse } from "../types/http";

export class PostController {
  handle(req: HttpRequest): HttpResponse {
    if(!req.body.title) {
      return badRequest(new Error("Missing param: title"))
    }   
    if(!req.body.description) {
      return badRequest(new Error("Missing param: description"))

    }   
    if(!req.body.body) {
      return badRequest(new Error("Missing param: body"))

    }  
    return {
      statusCode: 201,
    }  
  }
}
