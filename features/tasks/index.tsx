import { Fab } from "native-base";
import React from "react";
import { v4 } from "uuid";

import { Icon, Screen } from "../../components";
import { useStores } from "../../stores";
import { Headline } from "./headline";
import { TaskList } from "./task-list";

export const Tasks: React.FC = () => {
  const { task } = useStores();

  return (
    <Screen paddingX="0" space="xs">
      <Headline />
      <TaskList />
      <Fab
        backgroundColor="black"
        icon={<Icon name="plus" />}
        onPress={() =>
          task.addTask({
            completed: false,
            id: v4(),
            title: "test",
            description:
              "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: new Date(),
          })
        }
        shadow="2"
        size="lg"
      />
    </Screen>
  );
};
