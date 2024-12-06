import { HttpRequest, HttpResponse } from "../types/http";

export class PostController {
  handle(req: HttpRequest): HttpResponse {
    if(!req.body.title) {
      return {
        statusCode: 400,
        body: {
          message: "Missing param: title",
        },
      };
    }   
    if(!req.body.description) {
      return {
        statusCode: 400,
        body: {
          message: "Missing param: description",
        },
      };
    }   
    if(!req.body.body) {
      return {
        statusCode: 400,
        body: {
          message: "Missing param: body",
        },
      };
    }  
    return {
      statusCode: 200,
    }  
  }
}
