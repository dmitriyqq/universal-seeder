import {CollectionSchema, Schema} from "./schema/schema";
import {FakerGenerator} from "./generators/FakerGenerator";
import {TypeGenerator} from "./generators/TypeGenerator";

export class DocumentGenerator {
    public async generateDocument(collectionSchema: CollectionSchema, schema: Schema){
        const generators = this.getGenerators();
        const doc: Record<string, any> = {}

        for (const fieldName in collectionSchema.fields) {
            const field = collectionSchema.fields[fieldName];

            if (!field) {
                throw new Error("unknown field");
            }

            const fieldType = field?.type;

            if (!fieldType) {
                throw new Error("unknown field type");
            }

            const generator = generators[fieldType];

            doc[fieldName] = await generator?.generateField(field, schema);
        }

        return doc;
    }

    private getGenerators() {
        return {
            'type': new TypeGenerator(),
            'faker': new FakerGenerator(),
        }
    }
}