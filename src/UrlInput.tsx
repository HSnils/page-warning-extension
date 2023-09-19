import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAddUrlMutation, useUrlsQuery } from "./hooks";

export const UrlInput = () => {
  const [url, setUrl] = useState("");
  const { mutate: addUrl } = useAddUrlMutation();
  const urlsQuery = useUrlsQuery();

  const urlAlreadyExists = urlsQuery.data?.includes(url);

  return (
    <>
      <form>
        <FormControl isInvalid={urlAlreadyExists}>
          <FormLabel>New url</FormLabel>
          <Input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            size="sm"
          />
          <FormErrorMessage>Url already exists in list</FormErrorMessage>
        </FormControl>
        <Button
          h="1.75rem"
          size="sm"
          colorScheme="green"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addUrl(url);
            setUrl("");
          }}
        >
          Save url
        </Button>
      </form>
    </>
  );
};
