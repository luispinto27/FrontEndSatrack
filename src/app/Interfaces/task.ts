import { Category } from "./category";

export interface Task {
    taskId: number,
    description?: string,
    dateCreated?: Date,
    dateLimited?: Date,
    isCompleted?: boolean,
    categoryId: number,
    category: Category
}
