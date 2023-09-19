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
      <ToggleWarning />
    </>
  );
}

export default Popup;
