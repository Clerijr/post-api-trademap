import { connectDB, disconnectDB, getCollection } from "../helper";
import { PostMongoRepository } from "./post";
import { makePost } from "../../../helpers/factories";
import { ObjectId } from "mongodb";

describe("Post Repository", () => {
  beforeAll(async () => {
    await connectDB()
  })

  afterAll(async () => {
    await disconnectDB()
  })

  beforeEach(async () => {
    const postCollection = getCollection('posts')
    await postCollection.deleteMany({})
  })
  
  test("Should return a post on success", async () => {
    const sut = new PostMongoRepository();
    const payload = await sut.insert(makePost());
    expect(typeof payload).toBe('object')
    expect(payload._id).toBeTruthy()
    expect(payload.title).toBeTruthy()
    expect(payload.description).toBeTruthy()
    expect(payload.body).toBeTruthy()
    expect(payload.created_at).toBeTruthy()
    expect(payload.updated_at).toBeTruthy()
  });

  test("Should return an array with two Post objects", async () => {
    const sut = new PostMongoRepository();
    await sut.insert(makePost());
    await sut.insert(makePost());
    const payload = await sut.getAll()
    expect(Array.isArray(payload)).toBe(true)
    expect(payload.length).toEqual(2)
    expect(payload[0]._id).toBeTruthy()
    expect(payload[0].title).toBeTruthy()
  });

  test("Should return an Post with same provided Id", async () => {
    const sut = new PostMongoRepository();
    const postDocument = await sut.insert(makePost());
    const postId: string = postDocument._id!.toString()
    const post = await sut.getOne(postId)
    expect(post).toBeTruthy()
    expect(typeof post).toBe('object')
    expect(post!._id).toBeTruthy()
  });

  test("Should return null if no Post is located", async () => {
    const sut = new PostMongoRepository();
    await sut.insert(makePost());
    const postId: string = new ObjectId().toString()
    const post = await sut.getOne(postId)
    expect(post).toBeFalsy()
  });

  test("Should return null if Post is deleted successfully", async () => {
    const sut = new PostMongoRepository();
    const postDocument = await sut.insert(makePost());
    const postId: string = postDocument._id!.toString()
    const result = await sut.deleteOneById(postId)
    expect(result).toBeFalsy()
  });

  test("Should return updated Post when correct data is provided", async () => {
    const sut = new PostMongoRepository();
    const postDocument = await sut.insert(makePost());
    const postId: string = postDocument._id!.toString()
    const result = await sut.updateOneById(postId, {
      title: 'updated_title',
      description: 'updated_description',
      body: 'updated_body'
    })
    expect(typeof result).toBe('object')
    expect(result!.title).toBe('updated_title')
    expect(result!.description).toBe('updated_description')
    expect(result!.body).toBe('updated_body')
  });
});
