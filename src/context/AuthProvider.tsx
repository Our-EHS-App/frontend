import { AuthContextData } from '@interfaces/IAuth';
import { createContext, FC, useState } from 'react';
import { FCProps } from '@interfaces/ICommon';
import { useApi } from '@hooks';
import * as localforage from 'localforage';

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: FC<FCProps> = ({ children }) => {
  const [appPermissions, setAppPermissions] = useState<string[]>([]);
  const { apiPrivate } = useApi();

  const getUserPermissions = () => {
    apiPrivate.get<string[]>('/private/user/profile').then((res) => {
      setAppPermissions(res.data);
      localforage.setItem<string[]>('appPermissions', res.data).then();
    });
  };

  const resetAppPermissions = () => {
    localforage.removeItem('appPermissions').then(() => setAppPermissions([]));
  };
  return (
    <AuthContext.Provider
      value={{
        appPermissions: appPermissions,
        getUserPermissions,
        resetAppPermissions,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
