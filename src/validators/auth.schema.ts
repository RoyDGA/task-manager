import type { JSONSchemaType } from "ajv";

export interface RegisterBody {
    name: string;
    email: string;
    password: string;
}

export const registerSchema: JSONSchemaType<RegisterBody> = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 1,
            maxLength: 100,
        },
        email: {
            type: "string",
            format: "email",
            maxLength: 255,
        },
        password: {
            type: "string",
            minLength: 1,
        },
    },
    required: ["name", "email", "password"],
    additionalProperties: false,
};
