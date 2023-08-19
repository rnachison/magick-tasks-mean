import * as mongodb from "mongodb";

export interface Task {
   title: string;
   isComplete?: boolean;
   dueDate?: string;
   notes?: string;
   symbol: number;
   _id?: mongodb.ObjectId;
}