import {
  badRequest,
  created,
  noContent,
  notFound,
  ok,
} from "../helpers/httpResponses";
import { HttpRequest, HttpResponse } from "../types/http";
import { Controller, Repository } from "../protocols";
import { MissingParamError } from "./errors/validation";
import { PostNotFoundError, ServerError } from "./errors/server";
import { Request } from "express";

export class PostController implements Controller {
  constructor(private readonly postRepository: Repository) {}

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

  async getAll(req: HttpRequest): Promise<HttpResponse> {
    try {
      let payload;
      const page = parseInt(req.query.page as string) || 1;
      const size = parseInt(req.query.size as string) || 10;
      const initial_date = req.query.initial_date as string;
      const final_date = req.query.final_date as string;
      
      if (initial_date && final_date) {
        payload = await this.postRepository.getAll(
          size,
          page,
          initial_date,
          final_date
        );
      } else {
        payload = await this.postRepository.getAll(size, page);
      }

      return ok(payload);
    } catch (error: any) {
      throw new ServerError(error);
    }
  }

  async get(req: HttpRequest): Promise<HttpResponse> {
    const postId = req.params.post_id;
    const payload = await this.postRepository.getOneById(postId);
    if (!payload) return notFound(new PostNotFoundError());
    return ok(payload);
  }

  async update(req: HttpRequest): Promise<HttpResponse> {
    try {
      const postId = req.params.post_id;
      const post = req.body;

      const payload = await this.postRepository.updateOneById(postId, post);
      if (!payload) return notFound(new PostNotFoundError());
      return ok(payload);
    } catch (error: any) {
      throw new ServerError(error);
    }
  }

  async delete(req: HttpRequest): Promise<HttpResponse> {
    try {
      const postId = req.params.post_id;
      await this.postRepository.deleteOneById(postId);
      return noContent();
    } catch (error: any) {
      throw new ServerError(error);
    }
  }
}
