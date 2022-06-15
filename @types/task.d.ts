import icons from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Feather.json";

declare global {
  type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
    description?: string;
    icon?: keyof typeof icons;
  };

  type CreateTaskData = {
    title: string;
    description: string;
    icon: keyof typeof icons;
  };

  type ListData = {
    item: Task;
  };
}
