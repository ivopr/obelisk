type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  description?: string;
  icon?: string;
};

type ListData = {
  item: Task;
};
