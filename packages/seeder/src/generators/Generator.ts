import {FieldSchema, Schema} from "../schema/schema";

export interface Generator {
    generateField: (fieldSchema: FieldSchema, schema: Schema) => Promise<any>
}