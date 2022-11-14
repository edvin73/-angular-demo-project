import { TaskPriority } from "./TaskPriority";
import { User } from "./User";

export class Task {
    taskId?: number;
    taskTitle?: string;
    taskDescription?: string;
    taskPriority?: TaskPriority;
    assignedTo?: User;
    startDate?: Date;
    endDate?: Date; 
    accomplished?: string;
    createdOn?: Date;
    modifiedOn?: Date;
    
}