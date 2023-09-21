export type State = {
  urls: string[];
  warning: {
    isActive: boolean;
    warningType: WarningType;
  };
};

type WarningType = "banner";
