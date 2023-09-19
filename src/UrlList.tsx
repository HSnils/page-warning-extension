import { DeleteIcon, LinkIcon } from "@chakra-ui/icons";
import {
  IconButton,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRemoveUrlMutation, useUrlsQuery } from "./hooks";

export const UrlList = () => {
  const urlsQuery = useUrlsQuery();
  const { mutate: removeUrl } = useRemoveUrlMutation();
  const [animatonRef] = useAutoAnimate();

  if (urlsQuery.isLoading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return (
    <List ref={animatonRef}>
      {urlsQuery.data?.map((url: string) => (
        <ListItem>
          <ListIcon as={LinkIcon} color="green.500" />
          {url}
          <IconButton
            aria-label="Remove url"
            onClick={() => {
              if (confirm(`Are you sure you want to delete: ${url}`)) {
                removeUrl(url);
              }
            }}
            size="xs"
            icon={<DeleteIcon />}
          />
        </ListItem>
      ))}
    </List>
  );
};
