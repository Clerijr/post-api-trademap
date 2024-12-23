import { MongoClient, Collection, Db } from "mongodb";

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: '',

  async connect(uri: string = "mongodb://localhost:27017/"): Promise<Db> {
    this.uri = uri

    try {
      this.client = await MongoClient.connect(uri);
      console.log('Connected to MongoDB ', uri);
      
      return this.client.db("post-trademap")
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },
  
  async getCollection(name: string): Promise<Collection> {
    return this.client.db().collection(name)
  }
}

