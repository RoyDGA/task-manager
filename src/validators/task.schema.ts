import type {JSONSchemaType} from "ajv";

export interface TaskBody {
    title: string;
    description: string;
    dueDate: string;
    status: "pendiente" | "en curso" | "completada";
}

export const taskSchema: JSONSchemaType<TaskBody> = {
    type: "object",
    properties: {
        title: {
            type: "string",
            minLength: 1,
            maxLength: 200
        },
        description: {
            type: "string",
            maxLength: 5000
        },
        dueDate: {
            type: "string",
            format: "date"
        },
        status: {
            type: "string",
            enum: ["pendiente", "en curso", "completada"]
        }
    },
    required: ["title", "description", "dueDate", "status"],
    additionalProperties: false
}