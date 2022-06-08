import { Button as NBButton, IButtonProps } from "native-base";
import React from "react";

import { translate, TxKeyPath } from "../../languages";

type ButtonProps = IButtonProps & {
  tx: TxKeyPath;
};
export const Button: React.FC<ButtonProps> = ({ tx, ...rest }) => {
  const text = translate(tx);

  return <NBButton {...rest}>{text}</NBButton>;
};
