import { badRequest, created, notFound, ok } from "../helpers/httpResponses";
import { HttpRequest, HttpResponse } from "../types/http";
import { Controller, PostRepository } from "../protocols";
import { MissingParamError } from "./errors/validation";
import { PostNotFoundError, ServerError } from "./errors/server";

export class PostController implements Controller {
  constructor(private readonly postRepository: PostRepository) {}

  async create(req: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ["title", "body"];
    try {
      for (const field of requiredFields) {
        if (!req.body[field]) return badRequest(new MissingParamError(field));
      }

      const payload = await this.postRepository.insert(req.body);
      return created(payload);
    } catch (error: any) {
      throw new ServerError(error);
    }
  }

  async getAll(): Promise<HttpResponse> {
    return ok(this.postRepository.getAll());
  }

  async update(req: HttpRequest): Promise<HttpResponse> {
    try {
      const postId = req.params.post_id;
      const post = req.body;

      const payload = await this.postRepository.updateOneById(postId, post);
      if(!payload) return notFound(new PostNotFoundError())
      return ok(payload);
    } catch (error: any) {
      throw new ServerError(error);
    }
  }
}
