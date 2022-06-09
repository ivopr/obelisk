import { observer } from "mobx-react";
import { Fab, Heading } from "native-base";
import React from "react";
import { v4 } from "uuid";

import { Icon, Screen } from "../../components";
import { translate } from "../../languages";
import { useStores } from "../../stores";
import { TaskList } from "./swipe-list";

export const Tasks: React.FC = observer(() => {
  const { task } = useStores();

  return (
    <Screen paddingX="0" space="xs">
      <Heading size="sm" textAlign="center">
        {translate("tasks.headline", { count: task.incompleteCount })}
      </Heading>
      <TaskList
        tasks={task.incompleteFirst}
        deleteTask={task.deleteTask}
        toggleTaskCompletion={task.toggleTaskCompletion}
      />
      <Fab
        backgroundColor="black"
        icon={<Icon name="plus" />}
        onPress={() =>
          task.addTask({ completed: false, id: v4(), title: "test" })
        }
        shadow="2"
        size="lg"
      />
    </Screen>
  );
});
