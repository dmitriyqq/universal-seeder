import { Generator } from "./Generator";
import {FieldSchema, Schema} from "../schema/schema";
import {DocumentGenerator} from "../DocumentGenerator";

export class TypeGenerator implements Generator {
    generateField(fieldSchema: FieldSchema, schema: Schema) {
        if (fieldSchema.type !== 'type') {
            throw new Error('Invalid schema');
        }

        const typeName = fieldSchema.typeName;
        const type = schema.types.find(t => t.name === typeName);

        if (!type) {
            throw new Error(`Couldn't generate document by ${typeName}`);
        }

        const documentGenerator = new DocumentGenerator();
        return documentGenerator.generateDocument(type, schema);
    }
}