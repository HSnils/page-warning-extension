import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useToggleWarningActiveMutation, useWarningQuery } from "../hooks";

export const ToggleWarning = () => {
  const {
    data: { isActive },
  } = useWarningQuery();
  const { mutate: toggleWarning } = useToggleWarningActiveMutation();

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="page-warning" mb="0">
        Toggle warning
      </FormLabel>
      <Switch
        id="page-warning"
        colorScheme="teal"
        isChecked={isActive}
        onChange={() => toggleWarning()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleWarning();
          }
        }}
      />
    </FormControl>
  );
};
