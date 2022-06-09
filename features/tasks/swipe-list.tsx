import { Box, Divider, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";

import { Icon } from "../../components";
import { translate } from "../../languages";
import { keyExtractor } from "../../utils/flatlist-utils";

type TaskListProps = {
  tasks: Task[];
  deleteTask: (v: string) => void;
  toggleTaskCompletion: (v: string) => void;
};

type ListData = {
  item: Task;
};

export const TaskList: React.FC<TaskListProps> = ({
  deleteTask,
  tasks,
  toggleTaskCompletion,
}) => {
  const renderItem = ({ item }: ListData) => (
    <Pressable height="16" backgroundColor="coolGray.100">
      <Box paddingLeft="4" paddingRight="5" paddingY="2">
        <HStack alignItems="center" height="full" space={3}>
          <Icon name={item.icon ?? "activity"} size="lg" />
          <VStack maxWidth="90%">
            <Text bold color="coolGray.800" textTransform="capitalize">
              {item.title}
            </Text>
            {item.description && (
              <Text isTruncated color="coolGray.600">
                {item.description}
              </Text>
            )}
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );

  const renderHiddenItem = ({ item }: ListData) => (
    <HStack height="16" marginLeft="auto">
      <Pressable
        _pressed={{
          opacity: 0.5,
        }}
        backgroundColor={item.completed ? "green.300" : "coolGray.200"}
        justifyContent="center"
        onPress={() => toggleTaskCompletion(item.id)}
        width="70"
      >
        <VStack alignItems="center" space={2}>
          <Icon name="check-circle" size="xs" color="coolGray.800" />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            {translate(
              item.completed ? "tasks.actions.uncheck" : "tasks.actions.check"
            )}
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        _pressed={{
          opacity: 0.5,
        }}
        backgroundColor="red.400"
        justifyContent="center"
        onPress={() => deleteTask(item.id)}
        width="70"
      >
        <VStack alignItems="center" space={2}>
          <Icon color="white" name="trash" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            {translate("tasks.actions.delete")}
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <SwipeListView
      data={tasks}
      disableHiddenLayoutCalculation
      ItemSeparatorComponent={Divider}
      keyExtractor={keyExtractor}
      renderHiddenItem={renderHiddenItem}
      renderItem={renderItem}
      rightOpenValue={-140}
    />
  );
};
