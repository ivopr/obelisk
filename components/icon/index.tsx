import { Feather } from "@expo/vector-icons";
import { Icon as NBIcon, IIconProps } from "native-base";
import React from "react";

type IconProps = IIconProps & {
  name: keyof typeof Feather.glyphMap | string;
};
export const Icon: React.FC<IconProps> = ({ ...rest }) => {
  return <NBIcon as={Feather} {...rest} />;
};
