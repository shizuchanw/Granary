import { makeRequest } from "./AxiosService";

const getUser = () => {
  return makeRequest("/user");
};

const createUser = (payload) => {
  return makeRequest("/user/create", {
    method: "POST",
    data: payload,
  });
};

const updateUser = (payload) => {
  return makeRequest("/user", {
    method: "PUT",
    data: payload,
  });
};

const updatePassword = (payload) => {
  return makeRequest("/user/update-password", {
    method: "PUT",
    data: payload,
  });
};

export { createUser, updateUser, getUser, updatePassword };
