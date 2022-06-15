import {
  Fab,
  FormControl,
  HStack,
  Input,
  Modal,
  TextArea,
  VStack,
} from "native-base";
import React from "react";
import { v4 } from "uuid";

import { Button, Icon } from "../../components";
import { translate } from "../../languages";
import { useStores } from "../../stores";
import { SelectIcon } from "./select-icon";

export const CreateTask: React.FC = () => {
  const { task } = useStores();
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = React.useState<CreateTaskData>({
    title: "",
    description: "",
    icon: "activity",
  });
  const [isInvalid, setIsInvalid] = React.useState({
    title: false,
  });

  const clearAndClose = () => {
    setData({
      title: "",
      description: "",
      icon: "activity",
    });
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const createTask = () => {
    if (data.title && data.title !== "") {
      setIsInvalid({ title: false });
      task.addTask({
        title: data.title,
        description: data.description,
        icon: data.icon,
        id: v4(),
        createdAt: new Date(),
        completed: false,
      });
      clearAndClose();
    } else {
      setIsInvalid({ title: true });
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Fab
        colorScheme="gray"
        icon={<Icon name="plus" />}
        onPress={openModal}
        shadow="2"
        size="lg"
      />

      <Modal isOpen={showModal} onClose={closeModal}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header maxWidth="95%">
            {translate("tasks.create.header")}
          </Modal.Header>
          <Modal.Body>
            <VStack space="2">
              <FormControl isInvalid={isInvalid.title} isRequired>
                <FormControl.Label>
                  {translate("tasks.create.fields.title")}
                </FormControl.Label>
                <Input
                  onChangeText={(text) =>
                    setData((oldData) => ({ ...oldData, title: text }))
                  }
                  type="text"
                  value={data?.title}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  {translate("tasks.create.fields.description")}
                </FormControl.Label>
                <TextArea
                  autoCompleteType="off"
                  onChangeText={(text) =>
                    setData((oldData) => ({
                      ...oldData,
                      description: text,
                    }))
                  }
                  value={data?.description}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  {translate("tasks.create.fields.icon")}
                </FormControl.Label>
                <SelectIcon icon={data?.icon} setData={setData} />
              </FormControl>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <HStack space="1.5" width="full">
              <Button
                colorScheme="gray"
                flex={1}
                onPress={createTask}
                tx="common.confirm"
              />
              <Button
                colorScheme="danger"
                flex={1}
                onPress={clearAndClose}
                tx="common.cancel"
              />
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
