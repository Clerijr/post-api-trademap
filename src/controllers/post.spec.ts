import { PostController } from "./post";
import { makePostRequest, makePostRepositoryStub } from "../helpers";
import { Controller, PostRepository } from "../protocols";
import { MissingParamError } from "./errors/validation";
import { badRequest } from "../helpers/httpResponses";

type SutTypes = {
  sut: Controller;
  postRepositoryStub: PostRepository;
};

const makeSut = (): SutTypes => {
  const postRepositoryStub = makePostRepositoryStub();
  const sut = new PostController(postRepositoryStub);
  return {
    sut,
    postRepositoryStub,
  };
};

describe("Posts Create Controller", () => {
  test("Should return 400 if no title is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        description: "any_description",
        body: "any_body",
      },
    };
    const httpResponse = await sut.create(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("title")));
  });

  test("Should return 400 if no description is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        title: "any_title",
        body: "any_body",
      },
    };
    const httpResponse = await sut.create(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("description"))
    );
  });

  test("Should return 400 if no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
      },
    };
    const httpResponse = await sut.create(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("body")));
  });
  test("Should return 201 if post is created", async () => {
    const { sut } = makeSut();
    const httpRequest = makePostRequest();
    const httpResponse = await sut.create(httpRequest);
    expect(httpResponse.statusCode).toEqual(201);
  });
});
