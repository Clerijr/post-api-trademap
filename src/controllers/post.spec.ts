import { PostController } from "./post";
import { PostUsecase } from "../protocols/usecases";
import { Post } from "../types/post";
import { makePostRequest } from "../helpers/factories";

type SutTypes = {
  sut: PostController;
  postUsecaseStub: PostUsecase;
};

const makeSut = (): SutTypes => {
  class PostUsecaseStub implements PostUsecase {
    create(post: Post): Promise<Post> {
      return new Promise((resolve) =>
        resolve({
          id: "any_id",
          title: "any_title",
          description: "any_description",
          body: "any_body",
        })
      );
    }
  }
  const postUsecaseStub = new PostUsecaseStub();
  const sut = new PostController(postUsecaseStub);
  return {
    sut,
    postUsecaseStub,
  };
};

describe("Posts Controller", () => {
  test("Should return 400 if no title is provided", async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        description: "any_description",
        body: "any_body",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body.message).toEqual("Missing param: title");
  });

  test("Should return 400 if no description is provided", async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: "any_title",
        body: "any_body",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body.message).toEqual("Missing param: description");
  });

  test("Should return 400 if no body is provided", async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body.message).toEqual("Missing param: body");
  });

  test("Should return 201 if post is created", async () => {
    const { sut } = makeSut()
    const httpRequest = makePostRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(201);
  });
});
