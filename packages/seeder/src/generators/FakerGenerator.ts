import {Generator} from "./Generator";
import {FieldSchema } from "../schema/schema";
import faker from "faker";

export class FakerGenerator implements Generator {
    async generateField(fieldSchema: FieldSchema) {
        if (fieldSchema.type !== 'faker') {
            throw new Error("Invalid faker schema");
        }

        // @ts-ignore
        return faker[fieldSchema.fakerType as any][fieldSchema.fakerField as any]();
    }
}