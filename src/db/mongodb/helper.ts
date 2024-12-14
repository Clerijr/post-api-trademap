import { MongoClient, Collection } from "mongodb";

const uri = process.env.MONGO_URL || "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    return client.db('mongo-trademap'); 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await client.close()
}

export const getCollection = (name: string): Collection => {
  return client.db().collection(name)
}

export const getDB = () => client.db('mongo-trademap');
