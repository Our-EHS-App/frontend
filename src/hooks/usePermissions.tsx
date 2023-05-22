import { useContext, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { AuthContext } from '@context';

export type RolesConst = keyof typeof PERMISSIONS;
const PERMISSIONS = {
  ROLE_MAIN_USER: 'ROLE_MAIN_USER',
  ROLE_FORM_SUPER_ADMIN: 'ROLE_FORM_SUPER_ADMIN',
  PERMISSION_CREATE_FORM: 'PERMISSION_CREATE_FORM',
  PERMISSION_EDIT_FORM: 'PERMISSION_EDIT_FORM',
  PERMISSION_VIEW_FORM: 'PERMISSION_VIEW_FORM',
  PERMISSION_ENABLE_DISABLE_FORM: 'PERMISSION_ENABLE_DISABLE_FORM',
  PERMISSION_EXPORT_FORM: 'PERMISSION_EXPORT_FORM',
  PERMISSION_ASSIGN_FORM: 'PERMISSION_ASSIGN_FORM',
  PERMISSION_COPY_FORM: 'PERMISSION_COPY_FORM',
  PERMISSION_VIEW_FORM_RESULT: 'PERMISSION_VIEW_FORM_RESULT',
  PERMISSION_FILL_FORM: 'PERMISSION_FILL_FORM',
  PERMISSION_SUBMIT_FORM: 'PERMISSION_SUBMIT_FORM',
} as const;

type PermissionType = {
  [k in RolesConst]: boolean;
};

const defaultPermissions: () => PermissionType = () => {
  const defaultPermissions: Partial<PermissionType> = {};
  Object.keys(PERMISSIONS).forEach((permission: string) => {
    defaultPermissions[permission as RolesConst] = false;
  });
  return defaultPermissions as PermissionType;
};

export const isPermissionExists = (permissionList: boolean[]) => {
  return permissionList.some((p) => p);
};

export const isAllPermissionsAExist = (permissionList: boolean[]) => {
  return permissionList.every((p) => p);
};

export const usePermissions = () => {
  const { initialized: keyCloakInitialized, keycloak } = useKeycloak();
  const [permissions, setPermissions] = useState<PermissionType>(
    defaultPermissions()
  );
  const [initialized, setInitialized] = useState(false);
  const { appPermissions } = useContext(AuthContext);
  useEffect(() => {
    if (keyCloakInitialized) {
      handlePermissions();
    }
  }, [keycloak, keyCloakInitialized, appPermissions]);

  const isPermissionStringExist: (
    per: RolesConst[],
    force?: boolean
  ) => boolean = (per: RolesConst[], force = false) => {
    if (!initialized || !appPermissions?.length) {
      return force;
    }
    return per.some((per) => permissions[per]);
  };
  const handlePermissions = () => {
    if (appPermissions?.length) {
      const clientId = keycloak?.clientId ?? 'information-form';
      const keycloakRoles: string[] =
        keycloak?.resourceAccess?.[clientId]?.roles ?? [];
      const roles = [...keycloakRoles, ...(appPermissions ?? [])];
      const permissionMap: PermissionType = defaultPermissions();
      Object.keys(PERMISSIONS).forEach((permission: string) => {
        permissionMap[permission as RolesConst] = roles.includes(
          PERMISSIONS[permission as RolesConst]
        );
      });
      setPermissions(permissionMap);
      setInitialized(true);
    }
  };
  return {
    permissions,
    initialized,
    isPermissionExists,
    isPermissionStringExist,
  };
};
