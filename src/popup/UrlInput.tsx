import { AddIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAddUrlMutation, useUrlsQuery } from "../hooks";

export const UrlInput = () => {
  const [url, setUrl] = useState("");
  const { mutate: addUrl } = useAddUrlMutation();
  const urlsQuery = useUrlsQuery();

  const urlAlreadyExists = urlsQuery.data?.includes(url);
  const canAddUrl = url !== "" && !urlAlreadyExists;
  return (
    <>
      <form>
        <FormControl isInvalid={urlAlreadyExists}>
          <FormLabel>Add url</FormLabel>
          <InputGroup size="md">
            <Input
              pr="2.5rem"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <InputRightElement width="2.5rem">
              {canAddUrl && (
                <IconButton
                  type="submit"
                  disabled={!canAddUrl}
                  colorScheme="teal"
                  aria-label="Add url"
                  size="xs"
                  icon={<AddIcon />}
                  onClick={(e) => {
                    e.preventDefault();
                    addUrl(url);
                    setUrl("");
                  }}
                />
              )}
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage>Url already added</FormErrorMessage>
        </FormControl>
      </form>
    </>
  );
};
