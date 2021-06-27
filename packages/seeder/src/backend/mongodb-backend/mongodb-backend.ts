import { MongoClient } from "mongodb";

export class MongodbBackend {
    constructor(private connection: string, private database: string) {}

    async seed(collectionName: string, documents: any) : Promise<void> {
        try {
            const client = new MongoClient(this.connection);
            await client.connect()
            console.log('Connected successfully to server');

            const db = client.db(this.database);

            const collection = db.collection(collectionName);
            await collection.insertMany(documents)
            await client.close();
            console.log(`Seeded ${collectionName} successfully`);
        } catch (error) {
            console.error(`Failed to seed collection ${collectionName}. Error: ${error}`);
        }
    }
}