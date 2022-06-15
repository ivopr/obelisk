import dayjs from "dayjs";
import { observer } from "mobx-react";
import {
  Box,
  Divider,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { DefaultSectionT, SectionListData } from "react-native";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";

import { Icon } from "../../components";
import { translate } from "../../languages";
import { useStores } from "../../stores";

type ListData = {
  item: Task;
};

export const TaskList: React.FC = observer(() => {
  const { task } = useStores();

  const closeRow = (rowMap: RowMap<Task>, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteItem = (rowMap: RowMap<Task>, itemId: string) => {
    closeRow(rowMap, itemId);
    task.deleteTask(itemId);
  };

  const toggleCompletion = (rowMap: RowMap<Task>, itemId: string) => {
    task.changeTaskCompletedAt(itemId, new Date());
    task.toggleTaskCompletion(itemId);
    closeRow(rowMap, itemId);
  };

  const renderItem = ({ item }: ListData) => {
    return (
      <Pressable
        height="20"
        backgroundColor={item.completed ? "green.200" : "coolGray.100"}
      >
        <Box paddingLeft="4" paddingRight="5" paddingY="2">
          <HStack alignItems="center" height="full" space={3}>
            <Icon
              name={item.completed ? "check-circle" : item.icon ?? "activity"}
              size="lg"
            />
            <VStack width="92.5%">
              <Text
                bold
                color="coolGray.800"
                textTransform="capitalize"
                maxWidth="90%"
              >
                {item.title}
              </Text>
              <HStack space="2.5" width="full">
                {item.description ? (
                  <Text
                    color="coolGray.600"
                    isTruncated
                    flex={1}
                    lineHeight="sm"
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                ) : null}
                <HStack marginLeft="auto" space="3">
                  <VStack space="-1.5">
                    <Heading fontSize="xs">
                      {translate("tasks.item.created-at")}
                    </Heading>
                    <Text>
                      {dayjs(item.createdAt).format(
                        dayjs(item.createdAt).isSame(
                          new Date().toString(),
                          "day"
                        )
                          ? `[${translate("tasks.item.today")},] HH:mm`
                          : "MM/DD/YYYY"
                      )}
                    </Text>
                  </VStack>
                  {item.completed && item.completedAt ? (
                    <VStack space="-1.5">
                      <Heading fontSize="xs">
                        {translate("tasks.item.completed-at")}
                      </Heading>
                      <Text>
                        {dayjs(item.completedAt).format(
                          dayjs(item.completedAt).isSame(
                            new Date().toString(),
                            "day"
                          )
                            ? `[${translate("tasks.item.today")},] HH:mm`
                            : "MM/DD/YYYY"
                        )}
                      </Text>
                    </VStack>
                  ) : null}
                </HStack>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  const renderHiddenItem = ({ item }: ListData, rowMap: RowMap<Task>) => (
    <HStack
      backgroundColor={item.completed ? "green.300" : "coolGray.200"}
      flex={1}
    >
      <Pressable
        _pressed={{
          opacity: 0.5,
        }}
        backgroundColor="red.400"
        justifyContent="center"
        onPress={() => deleteItem(rowMap, item.id)}
        width="70"
      >
        <VStack alignItems="center" space={2}>
          <Icon color="white" name="trash" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            {translate("tasks.actions.delete")}
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        _pressed={{
          opacity: 0.5,
        }}
        backgroundColor={item.completed ? "green.300" : "coolGray.200"}
        justifyContent="center"
        onPress={() => toggleCompletion(rowMap, item.id)}
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
    </HStack>
  );

  const listEmpty = () => (
    <VStack alignItems="center" height="96" justifyContent="center" space="md">
      <Icon color="black" name="layers" size="5xl" />
      <Heading size="lg">{translate("tasks.headline.zero")}</Heading>
    </VStack>
  );

  const keyExtractor = (item: Task, index: number) => {
    return item.id + item.createdAt;
  };

  const sectionHeader = ({
    section: { title },
  }: {
    section: SectionListData<Task, DefaultSectionT>;
  }) => (
    <Heading marginY="1" textAlign="center">
      {translate(`tasks.status.${title as "complete" | "incomplete"}`)}
    </Heading>
  );

  return (
    <SwipeListView
      disableLeftSwipe
      sections={task.sectionListData}
      ItemSeparatorComponent={Divider}
      keyExtractor={keyExtractor}
      SectionSeparatorComponent={Divider}
      previewDuration={500}
      previewRowIndex={0}
      previewRepeat
      previewRepeatDelay={30000}
      previewOpenValue={25}
      renderHiddenItem={renderHiddenItem}
      renderItem={renderItem}
      renderSectionHeader={sectionHeader}
      ListEmptyComponent={listEmpty}
      leftOpenValue={140}
      useSectionList
    />
  );
});
