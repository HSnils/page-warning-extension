import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import {
  useIsWarningActiveQuery,
  useToggleWarningActiveMutation,
} from "./hooks";

export const ToggleWarning = () => {
  const isWarningActiveQuery = useIsWarningActiveQuery();
  const { mutate: toggleWarning } = useToggleWarningActiveMutation();

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="page-warning" mb="0">
        Toggle page warning
      </FormLabel>
      <Switch
        id="page-warning"
        isChecked={isWarningActiveQuery.data}
        onChange={() => toggleWarning()}
      />
    </FormControl>
  );
};
