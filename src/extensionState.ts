export type State = {
  urls: string[];
  warning: {
    isActive: boolean;
    warningType: WarningType;
    color: string;
  };
};

export const WARNING_TYPES = ["banner"] as const;

type WarningType = (typeof WARNING_TYPES)[number];
