import { Credentials } from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) => {
  return api.post("/auth/login", credentials);
};

export const self = () => {
  return api.get("/auth/self");
};
