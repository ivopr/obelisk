import { Box } from "native-base";
import React from "react";

export const SeparatorDivider: React.FC = () => {
  return (
    <Box
      borderBottomWidth="1"
      borderTopWidth="1"
      borderColor="coolGray.300"
      zIndex={10}
    />
  );
};
