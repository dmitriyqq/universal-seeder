export interface FakerFieldSchema {
    type: 'faker',
    fakerType: string;
    fakerField: string;
}

export interface TypeFieldSchema {
    type: 'type',
    typeName: string;
}

export type FieldSchema = FakerFieldSchema | TypeFieldSchema;

export interface CollectionSchema {
    name: string
    fields: {
        [fieldName: string]: FieldSchema;
    }
}

export interface Schema {
    types: CollectionSchema[]
    collections: CollectionSchema[]
}