import { HttpRequest } from "../types/http";

export const makePostRequest = (): HttpRequest => ({
  body: {
    title: "any_title",
    description: "any_description",
    body: "any_body",
  },
});
