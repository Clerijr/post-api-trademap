import { PostController } from "./post";

describe("Posts Controller", () => {
  test("Should return 400 if no title is provided", () => {
    const sut = new PostController();
    const httpRequest = {
      body: {
        description: "any_description",
        body: "any_body",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body.message).toEqual("Missing param: title");
  });

  test("Should return 400 if no description is provided", () => {
    const sut = new PostController();
    const httpRequest = {
      body: {
        title: "any_title",
        body: "any_body",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body.message).toEqual("Missing param: description");
  });

  test("Should return 400 if no body is provided", () => {
    const sut = new PostController();
    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body.message).toEqual("Missing param: body");
  });
});
