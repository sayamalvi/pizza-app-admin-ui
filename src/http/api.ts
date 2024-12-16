import { CreateUserData, Credentials, UpdateUserData } from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "/api/auth";
export const CATALOG_SERVICE = "/api/catalog";

export const login = (credentials: Credentials) => {
  return api.post(`${AUTH_SERVICE}/auth/login`, credentials);
};

export const self = () => {
  return api.get(`${AUTH_SERVICE}/auth/self`);
};

export const logout = () => {
  return api.post(`${AUTH_SERVICE}/auth/logout`);
};

export const getUsers = (queryString: string) => {
  return api.get(`${AUTH_SERVICE}/users?${queryString}`);
};

export const getTenants = () => {
  return api.get(`${AUTH_SERVICE}/tenants`);
};

export const createUser = (user: CreateUserData) => {
  return api.post(`${AUTH_SERVICE}/users`, user);
};

export const updateUser = (id: string, user: UpdateUserData) => {
  return api.patch(`${AUTH_SERVICE}/users/${id}`, user);
};

export const deleteUser = (id: string) => {
  return api.delete(`${AUTH_SERVICE}/users/${id}`);
};

//
export const getCategories = () => {
  return api.get(`${CATALOG_SERVICE}/categories`);
};

export const getProducts = (queryParams: string) => {
  return api.get(`${CATALOG_SERVICE}/products?${queryParams}`);
};
