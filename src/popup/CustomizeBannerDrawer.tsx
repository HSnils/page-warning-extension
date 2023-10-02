import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { State, WARNING_TYPES } from "../extensionState";
import { useMutateWarning, useWarningQuery } from "../hooks";

export const CustomizeBannerDrawer = () => {
  const { isOpen, onOpen, onClose: onCloseDisclosure } = useDisclosure();
  const {
    data: { warningType: existingWarningType, color: existingColor },
  } = useWarningQuery();
  const { mutate: updateWarning } = useMutateWarning();
  const btnRef = useRef(null);

  const [updatedWarningProperties, setUpdatedWarningProperties] = useState<
    Partial<State["warning"]>
  >({});

  const onClose = () => {
    setUpdatedWarningProperties({});
    onCloseDisclosure();
  };

  const onSave = () => {
    updateWarning(updatedWarningProperties);
    onClose();
  };

  return (
    <>
      <Button
        ref={btnRef}
        size="sm"
        colorScheme="teal"
        variant="ghost"
        onClick={onOpen}
      >
        Customize
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Customize the warning</DrawerHeader>

          <DrawerBody>
            {WARNING_TYPES.length > 1 && (
              <RadioGroup
                onChange={async (
                  value: ReturnType<
                    typeof useWarningQuery
                  >["data"]["warningType"],
                ) => {
                  setUpdatedWarningProperties((warning) => ({
                    ...warning,
                    warningType: value,
                  }));
                }}
                value={
                  updatedWarningProperties.warningType ?? existingWarningType
                }
                marginBottom="8px"
              >
                <Stack direction="column">
                  {WARNING_TYPES.map((type) => (
                    <Radio key={type} value={type}>
                      {type}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            )}
            <FormControl>
              <FormLabel htmlFor="alert-color-picker">
                Change alert color
              </FormLabel>
              <Input
                id="alert-color-picker"
                type="color"
                value={updatedWarningProperties.color ?? existingColor}
                onChange={(e) => {
                  setUpdatedWarningProperties((warning) => ({
                    ...warning,
                    color: e.target.value,
                  }));
                }}
              />

              <FormErrorMessage>Invalid color</FormErrorMessage>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={onSave}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
