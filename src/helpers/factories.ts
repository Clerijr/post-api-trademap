import { HttpRequest, Post } from "../types";

export const makePostRequest = (): HttpRequest => ({
  body: {
    title: "any_title",
    description: "any_description",
    body: "any_body",
  },
});

export const makePost = (): Post => ({
  title: "any_title",
  description: "any_description",
  body: "any_body",
});
