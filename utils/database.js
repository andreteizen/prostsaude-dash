import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedDb;
let cachedClient;

if (!uri) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local',
    )
}

if (!dbName) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local',
    )
}

export default async function connect() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cacheDb};
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;


    return { db, client };
}




