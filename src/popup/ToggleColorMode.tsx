import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

export const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      variant="outline"
      aria-label="Change color mode"
      isRound
      size="sm"
      onClick={toggleColorMode}
      className="toggleColorMode"
      icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
    />
  );
};
