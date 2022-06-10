import { observer } from "mobx-react";
import { Heading } from "native-base";
import React from "react";

import { translate } from "../../languages";
import { useStores } from "../../stores";

export const Headline: React.FC = observer(() => {
  const { task } = useStores();

  if (task.count === 0) {
    return <></>;
  }

  return (
    <Heading size="sm" textAlign="center">
      {translate("tasks.headline", { count: task.incompleteCount })}
    </Heading>
  );
});
