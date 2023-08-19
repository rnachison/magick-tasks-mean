import * as mongodb from "mongodb";
import { Task } from "./task";

export const collections: {
    tasks?: mongodb.Collection<Task>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("magickTasks");
    await applySchemaValidation(db);

    const tasksCollection = db.collection<Task>("tasks");
    collections.tasks = tasksCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "isComplete", "symbol"],
            additionalProperties: ["dueDate", "notes"],
            properties: {
                _id: {},
                title: {
                    bsonType: "string",
                    description: "'title' is required and is a string",
                },
                isComplete: {
                    bsonType: "boolean",
                    description: "'isComplete' is required and is a boolean that defaults to false",
                },
                symbol: {
                    bsonType: "number",
                    description: "'symbol' is required and is a number that defaults to 0"
                },
                notes: {
                    bsonType: "string",
                    description: "'notes' is a string",
                },
                dueDate: {
                    bsonType: "string",
                    description: "'dueDate' is a datetime string",
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "tasks",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("tasks", { validator: jsonSchema });
        }
    });
}