import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { logout } from "../http/api";

export const useLogout = () => {
  const { mutate: logoutMutation } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      useAuthStore.getState().logout();
      return;
    },
  });
  return { logoutMutation };
};
