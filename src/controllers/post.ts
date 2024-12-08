import { badRequest, created } from "../helpers/httpResponses";
import { HttpRequest, HttpResponse } from "../types/http";
import { Controller } from "../protocols/controller";
import { PostUsecase } from "../protocols/usecases";
export class PostController implements Controller {
  constructor(private readonly postUsecase: PostUsecase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      if (!req.body.title) {
        return badRequest(new Error("Missing param: title"))
      }
      if (!req.body.description) {
        return badRequest(new Error("Missing param: description"))
      }
      if (!req.body.body) {
        return badRequest(new Error("Missing param: body"))
      }
      const payload = await this.postUsecase.create(req.body)
      return created(payload)
      
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
