import { makeAutoObservable } from "mobx";
import { hydrateStore, makePersistable } from "mobx-persist-store";

export class TaskStore implements IStore {
  tasks: Task[] = [];

  get count(): number {
    return this.tasks.length;
  }

  get incompleteCount(): number {
    return this.tasks.reduce((value, task) => {
      if (!task.completed) {
        value += 1;
      }

      return value;
    }, 0);
  }

  get incompleteFirst(): Task[] {
    return this.tasks.slice().sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  addTask = (v: Task) => {
    this.tasks.push(v);
  };

  addTasks = (v: Task[]) => {
    this.tasks = v;
  };

  deleteTask = (v: string) => {
    this.tasks.splice(
      this.tasks.findIndex((task) => task.id === v),
      1
    );
  };

  toggleTaskCompletion = (v: string) => {
    const task = this.tasks.find((task) => task.id === v);
    if (task) {
      task.completed = !task.completed;
    }
  };

  resetTasks = (): void => {
    this.tasks = [];
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: TaskStore.name,
      properties: ["tasks"],
    });
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
