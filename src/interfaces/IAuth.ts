interface AuthContextData {
  appPermissions: string[];
  getUserPermissions: () => void;
  resetAppPermissions: () => void;
}

export type { AuthContextData };
