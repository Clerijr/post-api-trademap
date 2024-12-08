import { badRequest, created } from "../helpers/httpResponses";
import { HttpRequest, HttpResponse } from "../types/http";
import { Controller } from "../protocols/controller";
import { PostUsecase } from "../protocols/usecases";
import { MissingParamError } from "./errors/validation";

export class PostController implements Controller {
  constructor(private readonly postUsecase: PostUsecase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ["title", "description", "body"];
    try {
      for (const field of requiredFields) {
        if (!req.body[field]) return badRequest(new MissingParamError(field));
      }

      const payload = await this.postUsecase.create(req.body);
      return created(payload);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
