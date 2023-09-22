import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type State } from "./extensionState";
import { getCurrentTabId, isExecutedFromPopup } from "./utils";

const URLS_KEY = "urls";
const WARNING_KEY = "warning";

export const useUrlsQuery = () => {
  return useQuery(
    [URLS_KEY],
    async () => {
      const storageResult = (await chrome.storage.sync.get([URLS_KEY])) as Pick<
        State,
        typeof URLS_KEY
      >;
      return storageResult.urls.sort((a, b) => a.localeCompare(b)) ?? [];
    },
    {
      initialData: [],
      refetchOnWindowFocus: false,
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

      const newUrls = [...urls, newUrl].sort((a, b) => a.localeCompare(b));
      chrome.storage.sync.set({ [URLS_KEY]: newUrls });
      return newUrls;
    },
    onSuccess: async (newUrls) => {
      queryClient.setQueryData([URLS_KEY], newUrls);

      if (isExecutedFromPopup()) {
        const tabId = await getCurrentTabId();
        if (tabId) {
          chrome.tabs.sendMessage(tabId, {
            [URLS_KEY]: newUrls,
          });
        }
      }
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

        chrome.storage.sync.set({ [URLS_KEY]: urls });
        return urls;
      }
    },
    onSuccess: async (mutationResponse) => {
      if (mutationResponse) {
        queryClient.setQueryData([URLS_KEY], mutationResponse);
      }

      if (isExecutedFromPopup()) {
        const tabId = await getCurrentTabId();
        if (tabId) {
          chrome.tabs.sendMessage(tabId, {
            [URLS_KEY]: mutationResponse,
          });
        }
      }
    },
  });
};

export const useWarningQuery = () => {
  return useQuery<State[typeof WARNING_KEY]>(
    [WARNING_KEY],
    async () => {
      const storageResult = (await chrome.storage.sync.get([
        WARNING_KEY,
      ])) as Pick<State, typeof WARNING_KEY>;
      return storageResult.warning;
    },
    {
      initialData: {
        isActive: false,
        warningType: "banner",
        color: "#9e2424",
      },
      refetchOnWindowFocus: false,
    },
  );
};

export const useMutateWarning = () => {
  const queryClient = useQueryClient();
  const warningQuery = useWarningQuery();

  return useMutation<
    State[typeof WARNING_KEY],
    unknown,
    Partial<State[typeof WARNING_KEY]>
  >({
    mutationFn: async (partialWarningObject) => {
      const warning: State[typeof WARNING_KEY] = {
        ...warningQuery.data,
        ...partialWarningObject,
      };
      chrome.storage.sync.set({ [WARNING_KEY]: warning });

      return warning;
    },
    onSuccess: async (newWarningData) => {
      queryClient.setQueryData([WARNING_KEY], newWarningData);

      if (isExecutedFromPopup()) {
        const tabId = await getCurrentTabId();
        if (tabId) {
          chrome.tabs.sendMessage(tabId, {
            [WARNING_KEY]: newWarningData,
          });
        }
      }
    },
  });
};

export const useToggleWarningActiveMutation = () => {
  const queryClient = useQueryClient();
  const warningQuery = useWarningQuery();

  return useMutation<State[typeof WARNING_KEY]>({
    mutationFn: async () => {
      const newValue = !warningQuery.data.isActive;
      const warning: State[typeof WARNING_KEY] = {
        ...warningQuery.data,
        isActive: newValue,
      };
      chrome.storage.sync.set({ [WARNING_KEY]: warning });

      return warning;
    },
    onSuccess: async (newWarningData) => {
      queryClient.setQueryData([WARNING_KEY], newWarningData);

      if (isExecutedFromPopup()) {
        const tabId = await getCurrentTabId();
        if (tabId) {
          chrome.tabs.sendMessage(tabId, {
            [WARNING_KEY]: newWarningData,
          });
        }
      }
    },
  });
};
