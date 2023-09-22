import { Box, Divider } from "@chakra-ui/react";
import { CustomizeBannerDrawer } from "./CustomizeBannerDrawer";
import "./Popup.css";
import { ToggleColorMode } from "./ToggleColorMode";
import { ToggleWarning } from "./ToggleWarning";
import { UrlInput } from "./UrlInput";
import { UrlList } from "./UrlList";

function Popup() {
  return (
    <>
      <ToggleColorMode />
      <UrlInput />
      <UrlList />
      <Divider marginTop="auto" />
      <Box display="flex" justifyContent="space-between" paddingTop="0.5rem">
        <ToggleWarning />
        <CustomizeBannerDrawer />
      </Box>
    </>
  );
}

export default Popup;
