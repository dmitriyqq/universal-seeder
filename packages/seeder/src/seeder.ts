import {MongodbBackend} from "./backend/mongodb-backend/mongodb-backend";
import {Schema} from "./schema/schema";
import {DocumentGenerator} from "./DocumentGenerator";

export class Seeder {
    constructor(private backend: MongodbBackend, private schema: Schema) {
    }

    public async generateCollectionDocuments(collectionName: string, numberOfDocuments = 100) {
        const collectionSchema = this.schema.collections.find((c) => c.name === collectionName);

        if (!collectionSchema) {
            throw new Error(`schema for collection name: ${collectionName} not found`);
        }

        const docs = []
        for (let i = 0; i < numberOfDocuments; i++) {
            const documentGenerator = new DocumentGenerator();
            docs.push(await documentGenerator.generateDocument(collectionSchema, this.schema))
        }

        await this.backend.seed(collectionSchema.name, docs);
    }


}