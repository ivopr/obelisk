import React from "react";

import { Screen } from "../../components";
import { CreateTask } from "./create-task";
import { Headline } from "./headline";
import { TaskList } from "./task-list";

export const Tasks: React.FC = () => {
  return (
    <Screen paddingX="0" space="xs">
      <Headline />
      <TaskList />
      <CreateTask />
    </Screen>
  );
};
