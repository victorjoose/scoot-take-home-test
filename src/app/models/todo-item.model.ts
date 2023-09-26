export interface TodoItem {
  id: string;
  description: string;
  dueDate: Date;
  priority: Priority;
}

export enum Priority {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}
