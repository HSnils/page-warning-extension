import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const URLS_KEY = "urls";
const IS_WARNING_ACTIVE_KEY = "isWarningActive";

export const useUrlsQuery = () => {
  return useQuery(
    [URLS_KEY],
    async () => {
      const storageResult = (await chrome.storage.sync.get([
        URLS_KEY,
      ])) as Record<typeof URLS_KEY, string[]>;
      return storageResult.urls ?? [];
    },
    {
      initialData: [],
    },
  );
};

export const useAddUrlMutation = () => {
  const queryClient = useQueryClient();
  const { data: urls } = useUrlsQuery();
  return useMutation({
    mutationFn: async (url: string) => {
      const newUrl = url.trim().toLocaleLowerCase();
      if (newUrl === "" || urls.includes(newUrl)) {
        throw new Error("Invalid URL");
      }

      chrome.storage.sync.set({ urls: [...urls, newUrl] });
      return newUrl;
    },
    onSuccess: (newUrl) => {
      queryClient.setQueryData([URLS_KEY], [...urls, newUrl]);
    },
  });
};

export const useRemoveUrlMutation = () => {
  const queryClient = useQueryClient();
  const { data: urls } = useUrlsQuery();

  return useMutation({
    mutationFn: async (url: string) => {
      const index = urls.indexOf(url);
      if (index !== -1) {
        urls.splice(index, 1);

        chrome.storage.sync.set({ urls });
        return urls;
      }
    },
    onSuccess: (mutationResponse) => {
      if (mutationResponse) {
        queryClient.setQueryData([URLS_KEY], mutationResponse);
      }
    },
  });
};

export const useIsWarningActiveQuery = () => {
  return useQuery(
    [IS_WARNING_ACTIVE_KEY],
    async () => {
      const storageResult = (await chrome.storage.sync.get([
        IS_WARNING_ACTIVE_KEY,
      ])) as Record<typeof IS_WARNING_ACTIVE_KEY, boolean>;

      return storageResult.isWarningActive ?? false;
    },
    {
      initialData: false,
    },
  );
};

export const useToggleWarningActiveMutation = () => {
  const queryClient = useQueryClient();
  const queryActiveQuery = useIsWarningActiveQuery();
  return useMutation<boolean>({
    mutationFn: async () => {
      const newValue = !queryActiveQuery.data;
      chrome.storage.sync.set({
        isWarningActive: newValue,
      });
      return newValue;
    },
    onSuccess: (newValue) => {
      queryClient.setQueryData([IS_WARNING_ACTIVE_KEY], newValue);
    },
  });
};
