import icons from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Feather.json";
import { Button, FlatList, Input, Modal, Pressable, Text } from "native-base";
import React from "react";

import { Icon } from "../../components";
import { translate } from "../../languages";

type SelectIconProps = {
  icon: keyof typeof icons;
  setData: React.Dispatch<React.SetStateAction<CreateTaskData>>;
};
export const SelectIcon: React.FC<SelectIconProps> = ({ icon, setData }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const renderItem = ({ item }: { item: keyof typeof icons }) => (
    <Pressable
      _pressed={{
        opacity: 0.5,
      }}
      alignItems="center"
      backgroundColor={icon === item ? "green.100" : "transparent"}
      borderColor="gray.200"
      borderWidth="1"
      flex={1}
      flexDirection="row"
      height="20"
      onPress={() => setData((oldData) => ({ ...oldData, icon: item }))}
      paddingX="2.5"
    >
      <Icon name={item} size="xl" />
      <Text marginLeft="2.5">{item}</Text>
    </Pressable>
  );

  const keyExtractor = (item: string) => item;

  return (
    <>
      <Button
        colorScheme="gray"
        leftIcon={<Icon name={icon} />}
        onPress={openModal}
        textTransform="capitalize"
        variant="outline"
      >
        {icon}
      </Button>

      <Modal isOpen={showModal} onClose={closeModal}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{translate("tasks.create.fields.icon")}</Modal.Header>
          <Input
            onChangeText={(text) => setSearchTerm(text)}
            marginX="2.5"
            marginY="1"
            placeholder={translate(
              "tasks.create.fields.icon-search-placeholder"
            )}
            type="text"
            value={searchTerm}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={
              Object.keys(icons).filter((item) =>
                item.includes(searchTerm)
              ) as (keyof typeof icons)[]
            }
            renderItem={renderItem}
            removeClippedSubviews
            keyExtractor={keyExtractor}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};
