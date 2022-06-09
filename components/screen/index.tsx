import { IStackProps, VStack } from "native-base";
import React from "react";

export const Screen: React.FC<IStackProps> = ({ children, ...rest }) => {
  return (
    <VStack
      backgroundColor="coolGray.100"
      height="full"
      paddingX="2.5"
      paddingY="1.5"
      width="full"
      {...rest}
    >
      {children}
    </VStack>
  );
};
