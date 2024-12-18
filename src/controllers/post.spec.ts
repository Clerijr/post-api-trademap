import { PostController } from "./post";
import { makePostRequest, makePostRepositoryStub, makeMongoPostDoc } from "../helpers";
import { Controller, PostRepository } from "../protocols";
import { MissingParamError } from "./errors/validation";
import { badRequest, notFound } from "../helpers/httpResponses";
import { ObjectId } from "mongodb";
import { PostNotFoundError } from "./errors/server";

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

describe("Posts Update Controller", () => {
  test("Should return 200 if post is updated", async () => {
    const fakePost = makeMongoPostDoc()
    const updatedPost = {
      _id: fakePost._id,
      title: "updated_title",
      description: fakePost.description,
      body: "updated_body",
      created_at: fakePost.created_at,
      updated_at: fakePost.updated_at,
    }
    const { sut, postRepositoryStub } = makeSut();
    jest.spyOn(postRepositoryStub, "updateOneById").mockResolvedValueOnce(updatedPost);
    const httpRequest = {
      params: {
        post_id: fakePost._id,
      },
      body: {
        title: "updated_title",
        body: "updated_body",
      },
    };
    const httpResponse = await sut.update(httpRequest);
    expect(httpResponse.statusCode).toEqual(200);
    expect(httpResponse.body).toEqual(updatedPost);
  });

  test('Should return 404 if no Post is found', async () => {
    const { sut, postRepositoryStub } = makeSut();
    jest.spyOn(postRepositoryStub, "updateOneById").mockResolvedValueOnce(null);
    const httpRequest = {
      params: {
        post_id: 'unexistent_post_id',
      },
      body: {
        title: "updated_title",
        body: "updated_body",
      },
    };
    const httpResponse = await sut.update(httpRequest);
    expect(httpResponse.statusCode).toEqual(404);
    expect(httpResponse).toEqual(notFound(new PostNotFoundError()));
  })
});

describe("Posts Delete Controller", () => {
  test("Should return 204 if post is deleted", async () => {
    const fakePost = makeMongoPostDoc()
    const { sut, postRepositoryStub } = makeSut();
    jest.spyOn(postRepositoryStub, "deleteOneById").mockResolvedValueOnce();
    const httpRequest = {
      params: {
        post_id: fakePost._id,
      }
    };
    const httpResponse = await sut.delete(httpRequest);
    expect(httpResponse.statusCode).toEqual(204);
  });
});

