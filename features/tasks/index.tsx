import { observer } from "mobx-react";
import { Box, Fab, Heading, VStack } from "native-base";
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
      {task.count > 0 ? (
        <>
          <Heading size="sm" textAlign="center">
            {translate("tasks.headline", { count: task.incompleteCount })}
          </Heading>
          <TaskList
            tasks={task.incompleteFirst}
            deleteTask={task.deleteTask}
            toggleTaskCompletion={task.toggleTaskCompletion}
          />
        </>
      ) : (
        <VStack
          alignItems="center"
          height="full"
          justifyContent="center"
          space="md"
        >
          <Icon color="black" name="layers" size="5xl" />
          <Heading size="lg">{translate("tasks.headline.zero")}</Heading>
        </VStack>
      )}
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
