import { User } from "../store";

export const usePersmission = () => {
  const allowedRoles = ["admin", "manager"];
  const _hasPermission = (user: User | null) => {
    if (user) {
      return allowedRoles.includes(user.role);
    }
    return false;
  };
  return {
    isAllowed: _hasPermission,
  };
};
