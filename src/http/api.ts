import { CreateUserData, Credentials, UpdateUserData } from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) => {
  return api.post("/auth/login", credentials);
};

export const self = () => {
  return api.get("/auth/self");
};

export const logout = () => {
  return api.post("/auth/logout");
};

export const getUsers = (queryString: string) => {
  return api.get(`/users?${queryString}`);
};

export const getTenants = () => {
  return api.get("/tenants");
};

export const createUser = (user: CreateUserData) => {
  return api.post("/users", user);
};

export const updateUser = (id: string, user: UpdateUserData) => {
  return api.patch(`/users/${id}`, user);
};
